export default function Landing() {
	return (
		<div class="px-2 sm:px-4">
			<h3 class="text-3xl pt-4 pb-2 text-center">
				The freshest spots in town.
			</h3>
			<div class="flex pb-4 w-full justify-center items-center">
				<a
					class="btn btn-info"
					href="/auth/discord"
				>
					Login with Discord
				</a>
			</div>
			<img
				class="block m-auto w-[50%] pb-10"
				src="https://user-images.githubusercontent.com/1373867/183501842-2f84d72d-29d7-4836-bace-7c795183a9f4.png"
				alt="fresh-spots-deno"
			/>
			{/* TODO: feature list and call to action? */}
		</div>
	);
}
