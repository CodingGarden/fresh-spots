import { Handlers, PageProps } from "$fresh/server.ts";

import State from "@/schemas/State.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";
import Layout from "@/components/Layout.tsx";
import Alert from "@/components/Alert.tsx";
import FreshMap from "@/islands/FreshMap.tsx";
import config from "@/utils/config.ts";
import Sidebar from "@/islands/Sidebar.tsx";
import { editingList, pageTitle } from "@/signals/index.ts";
import { findOne } from "@/db/queries/SpotList.ts";
import { SpotListWithIdAndSpots } from "@/db/tables/SpotListTable.ts";
import { useEffect } from "preact/hooks";
import Hydrate from "@/components/Hydrate.tsx";

interface ListEditProps {
  user: UserWithSocialProfiles | null;
  list?: SpotListWithIdAndSpots;
}

export const handler: Handlers<ListEditProps, State> = {
  async GET(req, ctx) {
    const list = await findOne(ctx.params.id, ctx.state.userId);
    return ctx.render({
      list: list as unknown as SpotListWithIdAndSpots,
      user: ctx.state.user as UserWithSocialProfiles,
    });
  },
};

// TODO: cookie parsing middleware...
export default function Home({ data }: PageProps<ListEditProps>) {
  pageTitle.value = "List Edit";
  if (data.list) {
    editingList.value = data.list;
  }

  return (
    // TODO: use a signal
    <Layout user={data.user}>
      {/* TODO: remove this hacky code... probably with props */}
      <Hydrate
        name="editingList"
        data={data.list}
        // onLoad={(data) => {
        //   editingList.value = data.list;
        // }}
      />
      {data.list ? (
        <div class="w-full h-full flex">
          <Sidebar />
          <FreshMap mapTileUrl={config.map_tile_url} />
        </div>
      ) : (
        <Alert message={`List not found.`} />
      )}
    </Layout>
  );
}
