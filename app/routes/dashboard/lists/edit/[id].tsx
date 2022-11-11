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
    const idAsNumber = Number(ctx.params.id);
    const list = await findOne(
      {
        slug: isNaN(idAsNumber) ? ctx.params.id : undefined,
        id: isNaN(idAsNumber) ? undefined : idAsNumber,
      },
      ctx.state.userId
    );
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
  pageTitle.value = "List Edit";
  if (data.list) {
    editingList.value = data.list;
  }

  return (
    <Layout user={data.user}>
      <Hydrate name="editingList" data={data.list} />
      {data.list ? (
        <div class="flex-grow flex">
          <Sidebar baseUrl={config.base_url} />
          <FreshMap mapTileUrl={config.map_tile_url} />
        </div>
      ) : (
        <Alert message={`List not found.`} />
      )}
    </Layout>
  );
}
