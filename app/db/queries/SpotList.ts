import { slugify } from "@/deps.ts";
import db, { jsonb_agg } from "@/db/db.ts";
import { SpotList } from "@/db/tables/SpotListTable.ts";

export async function findOne(
  listId: string,
  userId?: number,
  withSpots = true
) {
  let query = db.selectFrom("spot_list").selectAll().where("id", "=", listId);

  if (userId) {
    query = query.where("user_id", "=", userId);
  } else {
    query = query.where("published", "=", true);
  }

  if (withSpots) {
    query = query.select((qb) =>
      jsonb_agg(
        qb
          .selectFrom("spot")
          .selectAll()
          .whereRef("spot.list_id", "=", "spot_list.id")
          .orderBy("updated_at", "desc")
      ).as("spots")
    );
  }

  const lists = await query.executeTakeFirst();
  return lists;
}

export async function findAll(userId: number) {
  const lists = await db
    .selectFrom("spot_list")
    .selectAll()
    .where("user_id", "=", userId)
    .orderBy("updated_at", "desc")
    .execute();
  return lists;
}

export async function createOne(list: SpotList, user_id: number) {
  let slug = slugify(list.name, {
    lower: true,
    strict: true,
    locale: "en",
  });
  const existing = await db
    .selectFrom("spot_list")
    .where("slug", "=", slug)
    .orWhere("slug", "like", `${slug}--%`)
    .execute();
  if (existing.length) {
    slug += `--${existing.length}`;
  }
  return db
    .insertInto("spot_list")
    .values({
      ...list,
      user_id,
      slug,
      public: false,
      published: false,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
