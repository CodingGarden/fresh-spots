import db from "@/db/db.ts";

export async function findAll(userId: number) {
  const lists = await db
    .selectFrom('spot_list')
    .selectAll()
    .where('user_id', '=', userId)
    .orderBy('updated_at', 'desc')
    .execute();
  return lists;
}