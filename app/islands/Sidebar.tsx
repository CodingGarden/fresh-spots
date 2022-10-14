import { map } from "@/signals/index.ts";
import SpotForm from "@/islands/SpotForm.tsx";

import {
  editingList,
  editingSpot,
  editingSpotUnsavedChanges,
} from "@/signals/index.ts";

export default function SideBar() {
  return (
    <div
      id="drawer-example"
      class="h-full p-4 overflow-y-auto w-2/5 min-w-[300px]"
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <h1 class="h3">{editingList.value?.name}</h1>
      <h4>{editingList.value?.slug}</h4>
      {editingSpot.value && <SpotForm />}
      <div>
        {editingList.value?.spots.map((spot) => (
          <div
            onClick={() => {
              if (map.value) {
                if (!editingSpotUnsavedChanges.value) {
                  editingSpot.value = spot;
                  map.value.flyTo([spot.latitude, spot.longitude], 15, {
                    duration: 1,
                  });
                }
              }
            }}
            class={`card mb-2 ${
              !editingSpotUnsavedChanges.value
                ? "cursor-pointer"
                : "cursor-no-drop"
              // deno-lint-ignore ban-ts-comment
              // @ts-ignore
            } ${editingSpot.value?.id === spot.id ? "active" : ""}`}
          >
            <div class="card-header">{spot.name}</div>
            <div class="card-body">
              <p class="card-text">{spot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
