import { FunctionalComponent } from "preact";
import NavBar from "../components/NavBar.tsx";

import PropsWithUser from "@/schemas/PropsWithUser.ts";

const Layout: FunctionalComponent<PropsWithUser> = ({ children, user }) => {
  return (
    <div class="w-screen h-screen overflow-hidden bg-primary-bg text-white flex flex-col">
      <NavBar user={user} />
      <main class="overflow-auto flex-grow-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
