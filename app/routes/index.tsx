/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import User from "../models/User.ts";

export const handler: Handlers<User[]> = {
  async GET(_, ctx) {
    const users = await User.all();
    return ctx.render(users);
  },
};

export default function Home({ data }: PageProps<User[]>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <p class={tw`my-6`}>
        There are {data.length} users!
      </p>
      <Counter start={3} />
    </div>
  );
}
