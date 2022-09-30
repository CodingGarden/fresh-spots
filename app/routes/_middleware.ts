import { MiddlewareHandlerContext } from "$fresh/server.ts";

import { squishyCookies } from "@/deps.ts";
import State from "@/schemas/State.ts";
import config from "@/utils/config.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const userId = await squishyCookies.verifySignedCookie(
    req.headers,
    "id",
    config.cookie_secret
  );
  if (userId) {
    ctx.state.userId = Number(userId.split(".")[0]);
  }
  return ctx.next();
}
