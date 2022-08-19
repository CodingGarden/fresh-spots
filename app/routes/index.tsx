/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import FreshMap from "../islands/FreshMap.tsx";

export default function Home() {
  return (
    <div class={tw`w-screen h-screen overflow-hidden`}>
      <FreshMap />
    </div>
  );
}
