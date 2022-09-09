import { Handlers, PageProps } from "$fresh/server.ts";

import State from "@/schemas/State.ts";
import db, { jsonb_agg } from "@/db/db.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";
import Layout from "@/components/Layout.tsx";
import FreshMap from "@/islands/FreshMap.tsx";
import config from "@/utils/config.ts";
import Sidebar from "@/islands/Sidebar.tsx";

export const handler: Handlers<UserWithSocialProfiles | null, State> = {
  async GET(req, ctx) {
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
        return ctx.render(user as unknown as UserWithSocialProfiles);
      }
    }
    return Response.redirect(`${config.base_url}?message=UnAuthorized`);
  },
};

// TODO: cookie parsing middleware...
export default function Home(
  { data }: PageProps<UserWithSocialProfiles | null>,
) {
  // TODO: use a signal
  return (
    <Layout user={data}>
      <div class="w-full h-full flex">
        <Sidebar />
        <FreshMap />
      </div>
    </Layout>
  );
}
