import { useEffect } from "preact/hooks";
import { editingList } from "@/signals/index.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function HydrateIsland({
  name,
}: // onLoad,
{
  name: string;
  // onLoad: (data: any) => void;
}) {
  useEffect(() => {
    // @ts-ignore
    // TODO: dynamically set value without hard coding
    editingList.value = window[`HYDRATE_${name}`];
  }, []);
  if (IS_BROWSER) return null;
  return <div></div>;
}
