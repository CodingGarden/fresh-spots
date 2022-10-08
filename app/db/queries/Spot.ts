import { Spot } from "@/db/tables/SpotTable.ts";
import db from "@/db/db.ts";

export function findOne(id: number, userId: number) {
  return db
    .selectFrom("spot")
    .selectAll()
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .executeTakeFirstOrThrow();
}

export function createOne(spot: Spot) {
  return db
    .insertInto("spot")
    .values(spot)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export function updateOne(id: number, userId: number, spot: Spot) {
  return db
    .updateTable("spot")
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .set({
      name: spot.name,
      description: spot.description,
      latitude: spot.latitude,
      longitude: spot.longitude,
      updated_at: new Date(),
    })
    .executeTakeFirstOrThrow();
}
