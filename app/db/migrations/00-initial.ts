import { kysely } from '@/deps.ts';

const { sql } = kysely;

import { DbSchema } from "@/db/db.ts";
import ProviderType from "@/constants/ProviderType.ts";

type FreshDb = kysely.Kysely<DbSchema>;

function createTableWithDefaults<T extends string>(
  schema: FreshDb["schema"],
  tableName: T,
  hasId = true,
) {
  const notNullNow = (col: kysely.ColumnDefinitionBuilder) =>
    col.notNull().defaultTo(sql`NOW()`);
  const schemaWithDates = schema
    .createTable(tableName)
    .addColumn("created_at", "timestamptz", notNullNow)
    .addColumn("updated_at", "timestamptz", notNullNow);
  if (hasId) {
    return schemaWithDates.addColumn("id", "serial", (col) => col.primaryKey());
  }
  return schemaWithDates;
}

export async function up(db: FreshDb): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS postgis`.execute(db);
  await sql`CREATE EXTENSION IF NOT EXISTS postgis_topology`.execute(db);

  await createTableWithDefaults(db.schema, "user")
    .addColumn("display_name", "varchar(100)", (col) => col.notNull())
    .execute();

  await db.schema
    .createType("provider_type")
    .asEnum(Object.values(ProviderType))
    .execute();

  await createTableWithDefaults(db.schema, "social_profile")
    .addColumn("provider_type", sql`provider_type`, (col) => col.notNull())
    .addColumn("provider_id", "varchar(50)", (col) => col.notNull())
    .addColumn("username", "varchar(255)", (col) => col.notNull())
    .addColumn("avatar_url", "varchar(2083)")
    .addColumn("user_id", "integer", (col) => col.notNull())
    .addForeignKeyConstraint(
      "social_profile_user_id_fk",
      ["user_id"],
      "user",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();

  await createTableWithDefaults(db.schema, "spot_list", false)
    .addColumn("id", "uuid", (col) =>
      col
        .notNull()
        .primaryKey()
        .unique()
        .defaultTo(sql`gen_random_uuid()`))
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "varchar(1000)")
    .addColumn("public", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("published", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("user_id", "integer", (col) => col.notNull())
    .addForeignKeyConstraint(
      "spot_list_user_id_fk",
      ["user_id"],
      "user",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();

  await createTableWithDefaults(db.schema, "spot")
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "varchar(1000)")
    .addColumn(
      "location",
      sql`public.geography(Point, 4326)`,
      (col) => col.notNull(),
    )
    .addColumn("user_id", "integer", (col) => col.notNull())
    .addColumn("list_id", "uuid", (col) => col.notNull())
    .addForeignKeyConstraint(
      "spot_user_id_fk",
      ["user_id"],
      "user",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .addForeignKeyConstraint(
      "spot_list_spot_id_fk",
      ["list_id"],
      "spot_list",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .execute();
}

export async function down(db: FreshDb): Promise<void> {
  await db.schema.dropTable("spot").ifExists().execute();
  await db.schema.dropTable("spot_list").ifExists().execute();
  await db.schema.dropTable("social_profile").ifExists().execute();
  await db.schema.dropType("provider_type").ifExists().execute();
  await db.schema.dropTable("user").ifExists().execute();
}
