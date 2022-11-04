import { useEffect } from "preact/hooks";
import { signalsByName } from "@/signals/index.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function HydrateIsland({ name }: { name: string }) {
  useEffect(() => {
    const signal = signalsByName.get(name);
    if (signal) {
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      signal.value = window[`HYDRATE_${name}`];
    }
  }, []);
  if (IS_BROWSER) return null;
  return <div></div>;
}
