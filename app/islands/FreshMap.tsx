import { useEffect, useRef, useState } from "preact/hooks";
import { effect } from "@preact/signals";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import { LatLngExpression, Map as LMap } from "leaflet";

import { map, places } from "@/signals/index.ts";
import config from "@/utils/config.ts";

type PreactLeaflet = typeof import("preact-leaflet-ts");

let Map: PreactLeaflet["Map"];
let TileLayer: PreactLeaflet["TileLayer"];
let Marker: PreactLeaflet["Marker"];

interface PreactMap {
  state: {
    map: LMap;
  };
}

if (IS_BROWSER) {
  ({ Map, TileLayer, Marker } = await import("preact-leaflet-ts"));
}

effect(() => {
  if (map.value) {
    map.value.on("click", (event) => {
      places.value = [...places.value, event.latlng];
      // TODO: calculate distance... set duration accordingly
      map.value?.flyTo(event.latlng, 15, {
        duration: 1,
      });
      if (IS_BROWSER) {
        localStorage.setItem("places", JSON.stringify(places.value));
      }
    });
  }
});

interface FreshMapProps {
  mapTileUrl: string;
}

export default function FreshMap({ mapTileUrl }: FreshMapProps) {
  const [currentCenter, setCurrentCenter] = useState<
    LatLngExpression | undefined
  >([39.742043, -104.991531]);
  const mapRef = useRef<PreactLeaflet["Map"]>(null);

  useEffect(() => {
    if (mapRef.current) {
      const mapComponent = (mapRef.current as unknown as PreactMap);
      map.value = mapComponent.state.map;
    }
  }, [mapRef]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"></script>
      </Head>
      <div class="flex-grow w-full h-full isolate">
        {(Map && IS_BROWSER) && (
          <Map
            // @ts-ignore class prop does exist...
            class="w-full h-full"
            center={currentCenter}
            zoom={5}
            ref={mapRef}
          >
            <TileLayer
              url={mapTileUrl}
              attribution="&copy; OpenStreetMap contributors &copy; CARTO"
              maxZoom="20"
            />
            {places.value.map((place) => <Marker position={place} />)}
          </Map>
        )}
      </div>
    </>
  );
}
