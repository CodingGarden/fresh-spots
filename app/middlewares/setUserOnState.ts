import { MiddlewareHandlerContext } from "$fresh/server.ts";

import State from "@/schemas/State.ts";
import config from "@/utils/config.ts";
import db, { jsonb_agg } from "@/db/db.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  if (ctx.state.userId) {
    const user = await db
      .selectFrom("user")
      .selectAll()
      .select(
        (qb) =>
          jsonb_agg(
            qb.selectFrom("social_profile")
              .selectAll()
              .whereRef("social_profile.user_id", "=", "user.id"),
          )
            .as("social_profiles"),
      )
      .where("id", "=", ctx.state.userId)
      .executeTakeFirst();
    if (user) {
      ctx.state.user = user as unknown as UserWithSocialProfiles;
      return ctx.next();
    }
  }
  return Response.redirect(`${config.base_url}?message=UnAuthorized`);
}
