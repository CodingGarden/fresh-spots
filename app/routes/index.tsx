/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Home() {
  return (
    <div class={tw`w-screen h-screen overflow-hidden bg-[#202030] text-white`}>
      {/* TODO: setup tailwind config with theme colors */}
      <nav class={tw`bg-[#56BC58] border-gray-200 px-2 sm:px-4 py-2.5`}>
        <div class={tw`container flex flex-wrap justify-between items-center mx-auto`}>
          <a href="/" class={tw`flex items-center`}>
            <svg class={tw`mr-3 h-6 sm:h-9`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 41.53">
              <g id="icon">
                <path fill="#000000" id="marker" d="M30.73,15.36c0,8.49-15.37,26.17-15.37,26.17S0,23.85,0,15.36a15.37,15.37,0,0,1,30.73,0Z"/>
                <g id="lines">
                  <rect fill="#FFFFFF" x="7.78" y="8.41" width="15.16" height="3.69" rx="1.84"/>
                  <rect fill="#FFFFFF" x="7.78" y="15.02" width="8.89" height="3.69" rx="1.84"/>
                  <rect fill="#FFFFFF" x="7.78" y="21.62" width="3.69" height="3.69" rx="1.84"/>
                </g>
              </g>
            </svg>
            <span class={tw`self-center text-xl font-semibold whitespace-nowrap`}>FRESH SPOTS</span>
          </a>
        </div>
      </nav>
      <main class={tw`px-2 sm:px-4 h-[90%] overflow-auto`}>
        <h3 class={tw`text-3xl py-10 text-center`}>The freshest spots in town.</h3>
        <img class={tw`display-block m-auto w-[50%]`} src="https://user-images.githubusercontent.com/1373867/183501842-2f84d72d-29d7-4836-bace-7c795183a9f4.png" alt="fresh-spots-deno" />
        {/* TODO: feature list and call to action? */}
        <div class={tw`flex py-10 w-full justify-center align-center`}>
          <a href="/auth/discord" class={tw`text-white bg-[#7289da] hover:bg-[#424549] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>Login with Discord</a>
        </div>
      </main>
    </div>
  );
}
