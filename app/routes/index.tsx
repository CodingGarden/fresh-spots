import { Handlers, PageProps } from "$fresh/server.ts";

import State from "@/schemas/State.ts";
import db, { jsonb_agg } from "@/db/db.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";
import Layout from "../components/Layout.tsx";

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
    return ctx.render(null);
  },
};

// TODO: cookie parsing middleware...
export default function Home(
  { data }: PageProps<UserWithSocialProfiles | null>,
) {
  return (
    <Layout user={data}>
      <h3 class="text-3xl py-10 text-center">
        The freshest spots in town.
      </h3>
      <img
        class="block m-auto w-[50%]"
        src="https://user-images.githubusercontent.com/1373867/183501842-2f84d72d-29d7-4836-bace-7c795183a9f4.png"
        alt="fresh-spots-deno"
      />
      {/* TODO: feature list and call to action? */}
      <div class="flex py-10 w-full justify-center items-center">
        <a
          href="/auth/discord"
          class="text-white bg-[#7289da] hover:bg-[#424549] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Login with Discord
        </a>
      </div>
    </Layout>
  );
}
