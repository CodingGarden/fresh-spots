import { signal } from "@preact/signals";
import { Map as LMap } from "leaflet";
import { Spot } from "@/db/tables/SpotTable.ts";
import { SpotListWithIdAndSpots } from "@/db/tables/SpotListTable.ts";

export const editingList = signal<SpotListWithIdAndSpots | null>(null);

export const editingSpot = signal<Spot | null>(null);

export const map = signal<LMap | null>(null);

export const pageTitle = signal("Fresh Spots");
