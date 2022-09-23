import { Handlers } from "$fresh/server.ts";

import { cookie } from "@/deps.ts";
import config from "@/utils/config.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const response = new Response("", {
      status: 302,
      headers: {
        Location: config.base_url,
      },
    });
    cookie.deleteCookie(response.headers, "id");
    return response;
  },
};
