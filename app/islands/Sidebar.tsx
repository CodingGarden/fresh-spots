import { map } from "@/signals/index.ts";
import SpotForm from "@/islands/SpotForm.tsx";

import { editingList, editingSpot } from "@/signals/index.ts";

export default function SideBar() {
  return (
    <div
      id="drawer-example"
      class="h-screen p-4 overflow-y-auto w-160"
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <h1 class="h3">{editingList.value?.name}</h1>
      {editingSpot.value && <SpotForm />}
      <ul class="list-group">
        {editingList.value?.spots.map((spot) => (
          <li
            onClick={() => {
              if (map.value) {
                // TODO: calculate distance... set duration accordingly
                map.value.flyTo([spot.latitude, spot.longitude], 15, {
                  duration: 1,
                });
              }
            }}
            class="list-group-item mb-2"
          >
            {spot.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
