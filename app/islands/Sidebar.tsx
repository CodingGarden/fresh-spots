import { map, places } from "@/signals/index.ts";

export default function SideBar() {
  return (
    <div
      id="drawer-example"
      class="h-screen p-4 overflow-y-auto w-80"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <ul class="list-group">
        {places.value.map((place) => (
          <li onClick={() => {
            if (map.value) {
              // TODO: calculate distance... set duration accordingly
              map.value.flyTo(place, 15, {
                duration: 1,
              });
            }
          }} class="list-group-item">
            {JSON.stringify(place, null, 2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
