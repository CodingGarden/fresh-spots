import { FreshDb } from "../migrate-utils.ts";

export async function up(db: FreshDb): Promise<void> {
  await db.schema
    .alterTable("spot_list")
    .addColumn("slug", "varchar(100)")
    .execute();
}

export async function down(db: FreshDb): Promise<void> {
  await db.schema.alterTable("spot_list").dropColumn("slug").execute();
}
