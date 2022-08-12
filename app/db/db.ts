import PostgresDriver from "../db/PostgresDriver.ts";

import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";

import config from "@/utils/config.ts";

import Users from "@/db/tables/UserTable.ts";
import SocialProfiles from "@/db/tables/SocialProfileTable.ts";
import SpotLists from "@/db/tables/SpotListTable.ts";
import Spots from "@/db/tables/SpotTable.ts";

export interface DbSchema {
  user: Users;
  social_profile: SocialProfiles;
  spot_lists: SpotLists;
  spots: Spots;
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
