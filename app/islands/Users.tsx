/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/users");
      const json = await response.json();
      setUsers(json);
    })();
  }, []);
  const btn = tw`px-2 py-1 border(gray-100 1) hover:bg-gray-200`;
  return (
    <div class={tw`flex gap-2 w-full`}>
      <p class={tw`my-6`}>
        Client rendered: There are {users.length} users!
      </p>
    </div>
  );
}
