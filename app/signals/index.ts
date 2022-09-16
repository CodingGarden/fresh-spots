import { IS_BROWSER } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import { LatLngExpression, Map as LMap } from "leaflet";

function getInitialValue() {
  if (IS_BROWSER) {
    return JSON.parse(localStorage.getItem("places") || '[]');
  }
  return [];
}

export const places = signal<LatLngExpression[]>(getInitialValue());

export const map = signal<LMap | null>(null);

export const pageTitle = signal('Fresh Spots');
