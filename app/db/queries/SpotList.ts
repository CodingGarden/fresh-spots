import { slugify } from "@/deps.ts";
import db, { jsonb_agg } from "@/db/db.ts";
import { SpotList } from "@/db/tables/SpotListTable.ts";

export function findOneBySlug(slug: string, userId?: number, withSpots = true) {
  return findOne({ slug }, userId, withSpots);
}

export function findOneById(id: number, userId?: number, withSpots = true) {
  return findOne({ id }, userId, withSpots);
}

export async function findOne(
  { slug, id }: { slug?: string; id?: number },
  userId?: number,
  withSpots = true
) {
  if (!slug && !id) {
    throw Error("Slug or Id must be defined");
  }

  let query = db.selectFrom("spot_list").selectAll();

  if (id) {
    query = query.where("id", "=", id);
  }

  if (slug) {
    query = query.where("slug", "=", slug);
  }

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

async function getSlug(name: string, id?: number) {
  let existingSlug = "";
  if (id) {
    const [existingList] = await db
      .selectFrom("spot_list")
      .where("id", "=", id)
      .select("slug")
      .execute();
    existingSlug = existingList.slug;
  }
  let slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "en",
  });
  if (existingSlug.replace(/--.*/, "") === slug) {
    return existingSlug;
  }
  const existing = await db
    .selectFrom("spot_list")
    .where("slug", "=", slug)
    .orWhere("slug", "like", `${slug}--%`)
    .execute();
  if (existing.length) {
    slug += `--${existing.length}`;
  }
  return slug;
}

export async function createOne(list: SpotList, user_id: number) {
  const slug = await getSlug(list.name);
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

export function deleteOne(id: number, userId: number) {
  return db
    .deleteFrom("spot_list")
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .execute();
}

export async function updateOne(id: number, userId: number, list: SpotList) {
  const slug = await getSlug(list.name, id);
  return db
    .updateTable("spot_list")
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .set({
      ...list,
      slug,
      updated_at: new Date(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
