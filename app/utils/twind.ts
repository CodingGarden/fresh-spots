import { IS_BROWSER } from "$fresh/runtime.ts";
import { twind } from "@/deps.ts";
export const { setup, tw } = twind;
export const config: twind.Configuration = {
  darkMode: "class",
  mode: "silent",
};
if (IS_BROWSER) setup(config);
