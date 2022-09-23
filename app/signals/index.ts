import { signal } from "@preact/signals";
import { LatLngExpression, Map as LMap } from "leaflet";

export const places = signal<LatLngExpression[]>([]);

export const map = signal<LMap | null>(null);

export const pageTitle = signal("Fresh Spots");
