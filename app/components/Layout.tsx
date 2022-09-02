/** @jsx h */
import { FunctionalComponent, h } from "preact";
import { tw } from "@twind";

import NavBar from "../components/NavBar.tsx";

import PropsWithUser from "@/schemas/PropsWithUser.ts";

const Layout: FunctionalComponent<PropsWithUser> = ({ children, user }) => {
  return (
    <div class={tw`w-screen h-screen overflow-hidden bg-[#202030] text-white`}>
      <NavBar user={user} />
      <main class={tw`px-2 sm:px-4 h-[90%] overflow-auto`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
