import { z } from "@/deps.ts";

import EnvNames from "../constants/EnvVars.ts";

function getErrorMessage(environmentVariableName: EnvNames) {
  return {
    message: `Missing ${environmentVariableName} environment variable.`,
  };
}

export const ConfigSchema = z.object({
  cookie_secret: z.string().min(
    1,
    getErrorMessage(EnvNames.COOKIE_SECRET),
  ),
  map_tile_url: z.string().min(
    1,
    getErrorMessage(EnvNames.MAP_TILE_URL),
  ),
  base_url: z.string().min(
    1,
    getErrorMessage(EnvNames.BASE_URL),
  ),
  environment: z.string().min(
    1,
    getErrorMessage(EnvNames.DENO_ENV),
  ),
  db_uri: z.string(),
  db: z.object({
    host: z.string().min(1, getErrorMessage(EnvNames.DB_HOST)),
    username: z.string().min(
      1,
      getErrorMessage(EnvNames.DB_USERNAME),
    ),
    password: z.string().min(
      1,
      getErrorMessage(EnvNames.DB_PASSWORD),
    ),
    database: z.string().min(
      1,
      getErrorMessage(EnvNames.DB_NAME),
    ),
    port: z.number().default(5432),
  }),
  oauth: z.object({
    discord: z.object({
      client_id: z.string().min(
        1,
        getErrorMessage(EnvNames.DISCORD_CLIENT_ID),
      ),
      client_secret: z.string().min(
        1,
        getErrorMessage(EnvNames.DISCORD_CLIENT_SECRET),
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
