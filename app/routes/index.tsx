/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import Layout from "../components/Layout.tsx";

// TODO: cookie parsing middleware...
export default function Home() {
  return (
    <Layout>
      <h3 class={tw`text-3xl py-10 text-center`}>
        The freshest spots in town.
      </h3>
      <img
        class={tw`block m-auto w-[50%]`}
        src="https://user-images.githubusercontent.com/1373867/183501842-2f84d72d-29d7-4836-bace-7c795183a9f4.png"
        alt="fresh-spots-deno"
      />
      {/* TODO: feature list and call to action? */}
      <div class={tw`flex py-10 w-full justify-center items-center`}>
        <a
          href="/auth/discord"
          class={tw`text-white bg-[#7289da] hover:bg-[#424549] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
        >
          Login with Discord
        </a>
      </div>
    </Layout>
  );
}
