import DenoGrant, { Providers } from "deno_grant";

import config from "./config.ts";

const denoGrant = new DenoGrant({
  base_uri: config.base_url,
  strategies: [{
    provider: Providers.discord,
    client_id: config.oauth.discord.client_id,
    client_secret: config.oauth.discord.client_secret,
    redirect_path: "/auth/discord/callback",
    scope: "identify",
  }],
});

export default denoGrant;

export const ProvidersMap = new Map<string, Providers>(
  Object.entries(Providers),
);
