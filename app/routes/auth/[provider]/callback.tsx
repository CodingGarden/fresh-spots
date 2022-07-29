import { Handlers } from "$fresh/server.ts";
import { URL } from "https://deno.land/std@0.106.0/node/url.ts";

import config from "@/utils/config.ts";
import oauth from "@/utils/oauth.ts";

export const handler: Handlers = {
  async GET(request, ctx) {
    const provider = oauth.get(ctx.params.provider.toLowerCase());
    if (provider) {
      const url = new URL(request.url);
      const userProfile = await provider.code.processAuth(url);
      return Response.json(userProfile);
    }
    // TODO: show error message instead of instant redirect
    return Response.redirect(config.base_url);
  },
};