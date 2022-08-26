/** @jsx h */
import { h, FunctionalComponent } from "preact";
import { tw } from "@twind";

import NavBar from "../components/NavBar.tsx";

const Layout: FunctionalComponent = ({ children }) => {
  return (
    <div class={tw`w-screen h-screen overflow-hidden bg-[#202030] text-white`}>
      <NavBar />
      <main class={tw`px-2 sm:px-4 h-[90%] overflow-auto`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
