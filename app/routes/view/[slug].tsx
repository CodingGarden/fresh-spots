import { Handlers, PageProps } from "$fresh/server.ts";

import State from "@/schemas/State.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";
import Layout from "@/components/Layout.tsx";
import Alert from "@/components/Alert.tsx";
import ViewOnlyFreshMap from "@/islands/ViewOnlyFreshMap.tsx";
import config from "@/utils/config.ts";
import { viewingList, pageTitle } from "@/signals/index.ts";
import { findOne } from "@/db/queries/SpotList.ts";
import { SpotListWithIdAndSpots } from "@/db/tables/SpotListTable.ts";
import { useEffect } from "preact/hooks";
import Hydrate from "@/components/Hydrate.tsx";
import ViewOnlySideBar from "../../islands/ViewOnlySidebar.tsx";

interface ListEditProps {
  user: UserWithSocialProfiles | null;
  list: SpotListWithIdAndSpots;
}

export const handler: Handlers<ListEditProps, State> = {
  async GET(req, ctx) {
    let list = await findOne({
      slug: ctx.params.slug,
    });
    if (!list && ctx.state.userId) {
      list = await findOne(
        {
          slug: ctx.params.slug,
        },
        ctx.state.userId
      );
    }
    if (!list) {
      return ctx.renderNotFound();
    }
    return ctx.render({
      list: list as unknown as SpotListWithIdAndSpots,
      user: ctx.state.user as UserWithSocialProfiles,
    });
  },
};

export default function Home({ data }: PageProps<ListEditProps>) {
  pageTitle.value = data.list.name;
  if (data.list) {
    viewingList.value = data.list;
  }

  return (
    <Layout user={data.user}>
      <Hydrate name="viewingList" data={data.list} />
      {data.list ? (
        <div class="flex-grow flex">
          <ViewOnlySideBar />
          <ViewOnlyFreshMap mapTileUrl={config.map_tile_url} />
        </div>
      ) : (
        <Alert message={`List not found.`} />
      )}
    </Layout>
  );
}
