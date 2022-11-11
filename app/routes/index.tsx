import { Handlers } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";

import Layout from "@/components/Layout.tsx";
import Landing from "@/components/Landing.tsx";
import config from "@/utils/config.ts";
import Alert from "@/components/Alert.tsx";
import { pageTitle } from "../signals/index.ts";

const imageNames = [
  "183501842-2f84d72d-29d7-4836-bace-7c795183a9f4.png",
  "187644097-3346520c-e748-46b9-b497-26d36a793dfd.png",
  "187646948-c9379705-6ac8-477a-b143-e0811d4127ca.png",
  "187649289-eb445635-d660-4d98-b091-45b9dc21310e.png",
  "190708297-a4ab3be3-1114-4df1-a695-b254c47b9c9e.jpg",
  "190709055-641348dd-aba6-405d-87c7-582fd78d7241.png",
  "190709726-1a1d9048-b88a-4b11-a1da-2fed85733644.png",
  "190709877-3b77af9b-fdf7-4c4e-bd91-0dc5b956accf.png",
  "190709897-b4c03f4f-a2c0-46f9-9166-5795d0d41cf9.png",
  "190709898-5df43d46-51a6-4803-909d-8456f1f060c9.png",
  "190710602-22822fd3-0de8-4624-a8f7-a1b6c5ae8189.png",
  "190710609-f46ed636-09ae-4dea-8bac-39ff1eb3a627.png",
  "190714569-ff5a5df9-c440-4117-a84d-66b48a3ab642.png",
  "190714625-d10396d4-6ce6-448e-895a-0a7a7fdf93d4.png",
  "190714697-a8ee980b-c7ef-4d11-9a7b-07b47d5bb4aa.png",
  "190714733-07b44bc5-e81c-411f-82f6-8ee4a1b59f61.png",
  "190714748-136388dc-1bfe-43f1-a080-6569c2126f0d.png",
  "190714759-4fd9aabd-06cf-464c-a183-6196c3c61fed.png",
  "197265226-63dfbedc-6b4e-4f65-86f8-e55aecb3bc63.jpg",
];
export const handler: Handlers = {
  GET(req, ctx) {
    if (ctx.state.userId) {
      return Response.redirect(`${config.base_url}/dashboard`);
    }
    const params = new URLSearchParams(req.url.split("?")[1]);
    const images = [];

    for (const imageName of imageNames) {
      images.push(asset(`/images/dinos/${imageName}`));
    }
    return ctx.render({
      message: params.get("message"),
      image: images[Math.floor(images.length * Math.random())],
    });
  },
};

export default function Home({
  data,
}: {
  data: { message: string; image: string };
}) {
  pageTitle.value = "Fresh Spots";
  return (
    <Layout user={null} flexCol>
      {data.message && <Alert message={data.message} />}
      <Landing image={data.image} />
    </Layout>
  );
}
