import { MiddlewareHandlerContext } from "$fresh/server.ts";

import { squishyCookies } from "@/deps.ts";
import State from "@/schemas/State.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const secret = "keyboard_cat";
  const userId = await squishyCookies.verifySignedCookie(
    req.headers,
    "id",
    secret,
  );
  if (userId) {
    ctx.state.userId = Number(userId.split(".")[0]);
  }
  return ctx.next();
}
