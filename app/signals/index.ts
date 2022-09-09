import { signal } from "@preact/signals";
import { LatLngExpression, Map as LMap } from "leaflet";

export const places = signal<LatLngExpression[]>(
  (localStorage && localStorage.getItem("places"))
    ? JSON.parse(localStorage ? localStorage.getItem("places") || '{}' : "{}")
    : [],
);

export const map = signal<LMap | null>(null);
