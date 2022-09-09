import { map, places } from "@/signals/index.ts";

export default function SideBar() {
  return (
    <div
      id="drawer-example"
      class="h-screen p-4 overflow-y-auto w-80"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <ul class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {places.value.map((place) => (
          <li onClick={() => {
            if (map.value) {
              // TODO: calculate distance... set duration accordingly
              map.value.flyTo(place, 15, {
                duration: 1,
              });
            }
          }} class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600 cursor-pointer">
            {JSON.stringify(place, null, 2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
