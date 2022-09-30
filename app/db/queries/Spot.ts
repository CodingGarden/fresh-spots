import { Spot } from "@/db/tables/SpotTable.ts";
import db from "@/db/db.ts";

export function createOne(spot: Spot) {
  return db
    .insertInto("spot")
    .values(spot)
    .returningAll()
    .executeTakeFirstOrThrow();
}
