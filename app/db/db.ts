import PostgresDriver from "../db/PostgresDriver.ts";

import { kysely } from "@/deps.ts";

const {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} = kysely;

import config from "@/utils/config.ts";

import UserTable from "@/db/tables/UserTable.ts";
import SocialProfileTable from "@/db/tables/SocialProfileTable.ts";
import SpotListTable from "@/db/tables/SpotListTable.ts";
import SpotTable from "@/db/tables/SpotTable.ts";

// TODO: create separate zod validators for insert / update...
export interface DbSchema {
  user: UserTable;
  social_profile: SocialProfileTable;
  spot_lists: SpotListTable;
  spots: SpotTable;
}

class Db {
  static #instance: Kysely<DbSchema>;
  private constructor() {}

  public static getInstance(): Kysely<DbSchema> {
    if (!Db.#instance) Db.#instance = Db.#initDb();

    return Db.#instance;
  }

  static #initDb() {
    return new Kysely<DbSchema>({
      log: ["query", "error"],
      dialect: {
        createAdapter() {
          return new PostgresAdapter();
        },
        createDriver() {
          return new PostgresDriver(config.db_uri);
        },
        createIntrospector(db) {
          return new PostgresIntrospector(db);
        },
        createQueryCompiler() {
          return new PostgresQueryCompiler();
        },
      },
    });
  }
}

export default Db.getInstance();
