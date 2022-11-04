import { Signal, signal } from "@preact/signals";
import { Map as LMap } from "leaflet";
import { Spot } from "@/db/tables/SpotTable.ts";
import { SpotListWithIdAndSpots } from "@/db/tables/SpotListTable.ts";

export const editingList = signal<SpotListWithIdAndSpots | null>(null);

export const editingSpotUnsavedChanges = signal(false);

export const editingSpot = signal<Spot | null>(null);

export const viewingList = signal<SpotListWithIdAndSpots | null>(null);

export const viewingSpot = signal<Spot | null>(null);

export const map = signal<LMap | null>(null);

export const pageTitle = signal("Fresh Spots");

export const divRefs = signal(new Map<number, HTMLDivElement | null>());

export const signalsByName = new Map<string, Signal>([
  ["editingList", editingList],
  ["editingSpotUnsavedChanges", editingSpotUnsavedChanges],
  ["editingSpot", editingSpot],
  ["viewingList", viewingList],
  ["viewingSpot", viewingSpot],
  ["map", map],
  ["pageTitle", pageTitle],
]);
