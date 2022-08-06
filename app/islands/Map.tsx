/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";

// deno-lint-ignore no-explicit-any
let L: any | null = null;

if (IS_BROWSER) {
  L = await import("preact-leaflet-ts");
}

export default function () {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"></script>
      </Head>
      {L ? (
        <L.Map
          class={tw`h-[600px] w-view hover:shadow-xl`}
          center={[51.510357, -0.116773]}
          zoom={7}
        >
          <L.TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
            maxZoom="19"
          />
        </L.Map>
      ) : (
        <span></span>
      )}
    </>
  );
}
