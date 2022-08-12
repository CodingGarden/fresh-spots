import { z } from "zod";

import EnvironmentVariableNames from "../constants/EnvironmentVariableNames.ts";

function getErrorMessage(environmentVariableName: EnvironmentVariableNames) {
  return {
    message: `Missing ${environmentVariableName} environment variable.`,
  };
}

export const ConfigSchema = z.object({
  base_url: z.string().min(
    1,
    getErrorMessage(EnvironmentVariableNames.BASE_URL),
  ),
  environment: z.string().min(
    1,
    getErrorMessage(EnvironmentVariableNames.DENO_ENV),
  ),
  db_uri: z.string(),
  db: z.object({
    host: z.string().min(1, getErrorMessage(EnvironmentVariableNames.DB_HOST)),
    username: z.string().min(
      1,
      getErrorMessage(EnvironmentVariableNames.DB_USERNAME),
    ),
    password: z.string().min(
      1,
      getErrorMessage(EnvironmentVariableNames.DB_PASSWORD),
    ),
    database: z.string().min(
      1,
      getErrorMessage(EnvironmentVariableNames.DB_NAME),
    ),
    port: z.number().default(5432),
  }),
  oauth: z.object({
    discord: z.object({
      client_id: z.string().min(
        1,
        getErrorMessage(EnvironmentVariableNames.DISCORD_CLIENT_ID),
      ),
      client_secret: z.string().min(
        1,
        getErrorMessage(EnvironmentVariableNames.DISCORD_CLIENT_SECRET),
      ),
    }),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;

// export default interface Config {
//   base_url: string;
//   environment: string;
//   db: PostgresOptions;
//   oauth: {
//     discord: {
//       client_id: string;
//       client_secret: string;
//     }
//   }
// }
