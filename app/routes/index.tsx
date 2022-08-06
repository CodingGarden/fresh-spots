/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";

import FreshMap from '../islands/FreshMap.tsx';

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      {/* <a
        href="/auth/discord"
        class={tw`cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
        Login With Discord
      </a> */}
      <FreshMap />
    </div>
  );
}
