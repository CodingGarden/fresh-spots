import { signal } from "@preact/signals";
import { Map as LMap, LatLngExpression } from "leaflet";

export const places = signal<LatLngExpression[]>((localStorage && localStorage.getItem('places')) ? JSON.parse(localStorage.getItem('places')) : []);

export const map = signal<LMap | null>(null);