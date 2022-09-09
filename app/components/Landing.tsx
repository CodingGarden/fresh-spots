export default function Landing() {
  return (
    <div class="px-2 sm:px-4">
      <h3 class="text-3xl py-10 text-center">
        The freshest spots in town.
      </h3>
      <img
        class="block m-auto w-[50%]"
        src="https://user-images.githubusercontent.com/1373867/183501842-2f84d72d-29d7-4836-bace-7c795183a9f4.png"
        alt="fresh-spots-deno"
      />
      {/* TODO: feature list and call to action? */}
      <div class="flex py-10 w-full justify-center items-center">
        <a
          href="/auth/discord"
          class="text-white bg-discord hover:bg-[#424549] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Login with Discord
        </a>
      </div>
    </div>
  );
}
