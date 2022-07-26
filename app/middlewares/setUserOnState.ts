import { MiddlewareHandlerContext } from "$fresh/server.ts";

import State from "@/schemas/State.ts";
import config from "@/utils/config.ts";
import { getUserWithSocialProfiles } from "@/db/queries/User.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  if (ctx.state.userId) {
    const user = await getUserWithSocialProfiles(ctx.state.userId);
    if (user) {
      ctx.state.user = user as unknown as UserWithSocialProfiles;
      return ctx.next();
    } else {
      return Response.redirect(`${config.base_url}/logout`);
    }
  }
  return Response.redirect(`${config.base_url}?message=UnAuthorized`);
}
