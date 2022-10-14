import { Handlers, PageProps } from "$fresh/server.ts";

import State from "@/schemas/State.ts";
import db, { jsonb_agg } from "@/db/db.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";
import Layout from "@/components/Layout.tsx";
import FreshMap from "@/islands/FreshMap.tsx";
import config from "@/utils/config.ts";
import Sidebar from "@/islands/Sidebar.tsx";
import { pageTitle } from "@/signals/index.ts";
import ListForm from "@/islands/ListForm.tsx";

export const handler: Handlers<UserWithSocialProfiles | null, State> = {
  GET(req, ctx) {
    return ctx.render(ctx.state.user);
  },
};

export default function Home({
  data,
}: PageProps<UserWithSocialProfiles | null>) {
  pageTitle.value = "CREATE LIST";
  return (
    <Layout user={data}>
      <div class="container container-fluid">
        <ListForm />
      </div>
    </Layout>
  );
}
