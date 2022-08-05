import { Handlers } from "$fresh/server.ts";

import config from "@/utils/config.ts";
import oauth from "@/utils/oauth.ts";

export const handler: Handlers = {
  GET(_, ctx) {
    const provider = oauth.get(ctx.params.provider.toLowerCase());
    if (provider) {
      const location = provider.code.createLink();
      return Response.redirect(location);
    }
    // TODO: show error message instead of instant redirect
    return Response.redirect(config.base_url);
  },
};
