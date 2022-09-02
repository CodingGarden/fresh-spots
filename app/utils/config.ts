import * as mod from "dotenv";

import EnvironmentVariableNames from "../constants/EnvironmentVariableNames.ts";

if (Deno.env.get(EnvironmentVariableNames.DENO_ENV) !== "production") {
  await mod.config({
    export: true,
  });
}

import { Config, ConfigSchema } from "@/schemas/Config.ts";

const envConfig: Config = {
  // TODO: update to use parameterized port
  base_url: Deno.env.get(EnvironmentVariableNames.BASE_URL) ||
    "http://localhost:8000",
  environment: Deno.env.get(EnvironmentVariableNames.DENO_ENV) || "",
  db: {
    database: Deno.env.get(EnvironmentVariableNames.DB_NAME) || "",
    host: Deno.env.get(EnvironmentVariableNames.DB_HOST) || "",
    username: Deno.env.get(EnvironmentVariableNames.DB_USERNAME) || "",
    password: Deno.env.get(EnvironmentVariableNames.DB_PASSWORD) || "",
    port: Number(Deno.env.get(EnvironmentVariableNames.DB_PORT) || 5432),
  },
  db_uri: "",
  oauth: {
    discord: {
      client_id: Deno.env.get(EnvironmentVariableNames.DISCORD_CLIENT_ID) || "",
      client_secret:
        Deno.env.get(EnvironmentVariableNames.DISCORD_CLIENT_SECRET) || "",
    },
  },
};

envConfig.db_uri =
  `postgres://${envConfig.db.username}:${envConfig.db.password}@${envConfig.db.host}:${envConfig.db.port}/${envConfig.db.database}`;

// TODO: maybe... cleanup the error that is logged
const config = ConfigSchema.parse(envConfig);

export default config;
