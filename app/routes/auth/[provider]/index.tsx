import { Handlers } from "$fresh/server.ts";

import config from "@/utils/config.ts";
import denoGrant, { ProvidersMap } from "@/utils/denoGrant.ts";

export const handler: Handlers = {
  GET(_, ctx) {
    const providerString = ctx.params.provider.toLowerCase();
    const provider = ProvidersMap.get(providerString);
    if (provider) {
      const authorizationUrl = denoGrant.getAuthorizationUri(provider);
      if (authorizationUrl) {
        return Response.redirect(authorizationUrl);
      }
    }
    const redirectUrl = `${config.base_url}/not-found?message=Unknown provider "${providerString}"`;
    return Response.redirect(redirectUrl);
  },
};
