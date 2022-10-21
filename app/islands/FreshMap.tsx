import { useEffect, useRef, useState } from "preact/hooks";
import { effect } from "@preact/signals";
import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import { LatLngExpression, Map as LMap } from "leaflet";

import {
  map,
  editingSpot,
  editingList,
  editingSpotUnsavedChanges,
} from "@/signals/index.ts";
import config from "@/utils/config.ts";

type PreactLeaflet = typeof import("preact-leaflet-ts");

let Map: PreactLeaflet["Map"];
let TileLayer: PreactLeaflet["TileLayer"];
let Marker: PreactLeaflet["Marker"];
let spotIcon: L.DivIcon;
let editingIcon: L.DivIcon;

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
  editingIcon = L.divIcon({
    iconSize: [33, 42.53],
    iconAnchor: [33 / 2, 42.53],
    className: "spot-icon-editing",
    html,
  });
}

effect(() => {
  if (map.value) {
    map.value.on("click", (event) => {
      map.value?.flyTo(event.latlng, 15, {
        duration: 1,
      });
      if (!editingSpot.value) {
        editingSpot.value = {
          latitude: event.latlng.lat,
          longitude: event.latlng.lng,
          name: "",
          list_id: -1,
          user_id: -1,
          description: "",
        };
      } else {
        editingSpot.value = {
          ...editingSpot.value,
          latitude: event.latlng.lat,
          longitude: event.latlng.lng,
        };
        editingSpotUnsavedChanges.value = true;
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
      const mapComponent = mapRef.current as unknown as PreactMap;
      map.value = mapComponent.state.map;
      if (IS_BROWSER) {
        if (editingList.value && editingList.value.spots.length) {
          // deno-lint-ignore ban-ts-comment
          // @ts-ignore
          const bounds = new L.LatLngBounds(
            editingList.value.spots.map((spot) => [
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
            {editingList.value?.spots.map((spot) =>
              spot.id === editingSpot.value?.id ? null : (
                <Marker
                  onClick={(e) => {
                    e.originalEvent.preventDefault();
                    if (!editingSpotUnsavedChanges.value) {
                      editingSpot.value = spot;
                      map.value?.flyTo([spot.latitude, spot.longitude], 15, {
                        duration: 1,
                      });
                    }
                  }}
                  icon={spotIcon}
                  key={[spot.latitude, spot.longitude]}
                  position={[spot.latitude, spot.longitude]}
                />
              )
            )}
            {editingSpot.value && (
              <Marker
                icon={editingIcon}
                key={[editingSpot.value.latitude, editingSpot.value.longitude]}
                position={[
                  editingSpot.value.latitude,
                  editingSpot.value.longitude,
                ]}
              />
            )}
          </Map>
        )}
      </div>
    </>
  );
}
