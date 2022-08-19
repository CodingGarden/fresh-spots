/** @jsx h */
 /** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { tw } from "@twind";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import { LatLngExpression } from "leaflet";

type PreactLeaflet = typeof import("preact-leaflet-ts");

let Map: PreactLeaflet["Map"];
let TileLayer: PreactLeaflet["TileLayer"];

if (IS_BROWSER) {
  ({ Map, TileLayer } = await import("preact-leaflet-ts"));
}

export default function FreshMap() {
  const [currentCenter, setCurrentCenter] = useState<LatLngExpression | undefined>([39.742043, -104.991531]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"></script>
      </Head>
      <Map
        class={tw`w-full h-full`}
        center={currentCenter}
        zoom={5}
      >
        <TileLayer
          // create acount when we deploy...
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution="© OpenStreetMap"
          maxZoom="19"
        />
      </Map>
    </>
  );
}
