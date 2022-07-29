import * as mod from "https://deno.land/std@0.150.0/dotenv/mod.ts";

await mod.config({
  export: true,
});

import Config from "@/interfaces/Config.ts";

const config: Config = {
  // TODO: update to use parameterized port
  base_url: Deno.env.get('BASE_URL') || 'http://localhost:8000',
  environment: Deno.env.get('DENO_ENV') || '',
  db: {
    database: Deno.env.get('DB_NAME') || '',
    host: Deno.env.get('DB_HOST') || '',
    username: Deno.env.get('DB_USERNAME') || '',
    password: Deno.env.get('DB_PASSWORD') || '',
    port: Number(Deno.env.get('DB_PORT') || 5432),
  },
  // TODO: make sure these variables are set... (is a schema validator)
  oauth: {
    discord: {
      client_id: Deno.env.get('DISCORD_CLIENT_ID') || '',
      client_secret: Deno.env.get('DISCORD_CLIENT_SECRET') || '',
    }
  }
};

Object.entries(config.db).forEach(([name, value]) => {
  if (!value) {
    throw new Error('Missing db config value: ' + name);
  }
});

export default config;