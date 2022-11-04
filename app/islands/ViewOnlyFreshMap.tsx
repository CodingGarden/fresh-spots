import { useEffect, useRef, useState } from "preact/hooks";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import { LatLngExpression, Map as LMap } from "leaflet";

import { map, viewingSpot, viewingList } from "@/signals/index.ts";
import { Spot } from "@/db/tables/SpotTable.ts";

type PreactLeaflet = typeof import("preact-leaflet-ts");

let Map: PreactLeaflet["Map"];
let TileLayer: PreactLeaflet["TileLayer"];
let Marker: PreactLeaflet["Marker"];
let spotIcon: L.DivIcon;
let viewingIcon: L.DivIcon;

interface PreactMap {
  state: {
    map: LMap;
  };
}

if (IS_BROWSER) {
  ({ Map, TileLayer, Marker } = await import("preact-leaflet-ts"));
  const html = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 42.53" class="overflow-visible">
  <g id="icon-shadow" style="transform: translate(6px, 2px); filter: blur(2px); opacity: 0.8;">
    <path fill="#000000" d="M30.73,15.36c0,8.49-15.37,26.17-15.37,26.17S0,23.85,0,15.36a15.37,15.37,0,0,1,30.73,0Z"></path>
  </g>
  <g id="icon">
    <path id="marker" d="M30.73,15.36c0,8.49-15.37,26.17-15.37,26.17S0,23.85,0,15.36a15.37,15.37,0,0,1,30.73,0Z"></path>
  </g>
</svg>`;
  spotIcon = L.divIcon({
    className: "spot-icon",
    html,
    iconSize: [33, 42.53],
    iconAnchor: [33 / 2, 42.53],
  });
  viewingIcon = L.divIcon({
    iconSize: [33, 42.53],
    iconAnchor: [33 / 2, 42.53],
    className: "spot-icon-editing",
    html,
  });
}

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
      const mapComponent = mapRef.current as unknown as PreactMap;
      map.value = mapComponent.state.map;
      if (IS_BROWSER) {
        if (viewingList.value && viewingList.value.spots.length) {
          // deno-lint-ignore ban-ts-comment
          // @ts-ignore
          const bounds = new L.LatLngBounds(
            viewingList.value.spots.map((spot) => [
              spot.latitude,
              spot.longitude,
            ])
          );
          map.value.fitBounds(bounds);
        }
      }
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
        {Map && IS_BROWSER && (
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
            {viewingList.value?.spots.map((spot) =>
              (spot as unknown as Spot).id === viewingSpot.value?.id ? null : (
                <Marker
                  onClick={(e: L.LeafletMouseEvent) => {
                    e.originalEvent.preventDefault();
                    viewingSpot.value = spot as unknown as Spot;
                    map.value?.flyTo([spot.latitude, spot.longitude], 15, {
                      duration: 1,
                    });
                  }}
                  icon={spotIcon}
                  key={[spot.latitude, spot.longitude]}
                  position={[spot.latitude, spot.longitude]}
                />
              )
            )}
            {viewingSpot.value && (
              <Marker
                icon={viewingIcon}
                key={[viewingSpot.value.latitude, viewingSpot.value.longitude]}
                position={[
                  viewingSpot.value.latitude,
                  viewingSpot.value.longitude,
                ]}
              />
            )}
          </Map>
        )}
      </div>
    </>
  );
}
