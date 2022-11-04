import { effect } from "@preact/signals";
import { map } from "@/signals/index.ts";

import { viewingList, viewingSpot, divRefs } from "@/signals/index.ts";
import { Spot } from "@/db/tables/SpotTable.ts";

effect(() => {
  if (viewingSpot.value) {
    const viewingSpotElement = divRefs.value.get(
      viewingSpot.value.id as unknown as number
    );
    if (viewingSpotElement) {
      viewingSpotElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }
});

export default function ViewOnlySideBar() {
  return (
    <div
      id="drawer-example"
      class="h-full p-4 overflow-y-auto w-2/5 min-w-[300px]"
      tabIndex={-1}
      aria-labelledby="drawer-label"
    >
      <div class="mb-4">
        <h2>{viewingList.value?.name}</h2>
        <p class="card-text">{viewingList.value?.description}</p>
      </div>
      <div class="mt-2">
        {!viewingList.value?.spots.length && <h5>There are no spots yet.</h5>}
        {viewingList.value?.spots.map((spot) => (
          <div
            ref={(element) =>
              divRefs.value.set(spot.id as unknown as number, element)
            }
            onClick={() => {
              if (map.value) {
                viewingSpot.value = spot as unknown as Spot;
                map.value.flyTo([spot.latitude, spot.longitude], 15, {
                  duration: 1,
                });
              }
            }}
            class={`card mb-2 cursor-pointer ${
              viewingSpot.value?.id === (spot as unknown as Spot).id
                ? "border-warning"
                : ""
            }`}
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
