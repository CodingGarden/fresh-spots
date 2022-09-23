import { Handlers, PageProps } from "$fresh/server.ts";

import State from "@/schemas/State.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";
import Layout from "@/components/Layout.tsx";
import FreshMap from "@/islands/FreshMap.tsx";
import config from "@/utils/config.ts";
import Sidebar from "@/islands/Sidebar.tsx";
import { pageTitle } from "@/signals/index.ts";

export const handler: Handlers<UserWithSocialProfiles | null, State> = {
  GET(req, ctx) {
    return ctx.render(ctx.state.user);
  },
};

// TODO: cookie parsing middleware...
export default function Home(
  { data }: PageProps<UserWithSocialProfiles | null>,
) {
  pageTitle.value = "Dashboard";
  // TODO: use a signal
  return (
    <Layout user={data}>
      <div class="w-full h-full flex">
        <Sidebar />
        <FreshMap mapTileUrl={config.map_tile_url} />
      </div>
    </Layout>
  );
}
