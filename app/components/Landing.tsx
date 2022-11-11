export default function Landing({ image }: { image: string }) {
  return (
    <div class="px-2 sm:px-4 mx-auto">
      <h3 class="text-3xl py-10 text-center">The freshest spots in town.</h3>
      <img
        class="block m-auto"
        style={{ width: "300px" }}
        src={image}
        alt="fresh-spots-deno"
      />
      <div class="text-center">
        Suggest an AI generated image{" "}
        <a
          href="https://github.com/CodingGarden/fresh-spots/issues/5"
          target="_blank"
          rel="noopener nofollow"
        >
          here
        </a>
      </div>
    </div>
  );
}
