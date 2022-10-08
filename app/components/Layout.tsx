import { FunctionalComponent } from "preact";
import { Head } from "$fresh/runtime.ts";
import NavBar from "../components/NavBar.tsx";

import PropsWithUser from "@/schemas/PropsWithUser.ts";
import { pageTitle } from "../signals/index.ts";

const Layout: FunctionalComponent<PropsWithUser> = ({ children, user }) => {
  return (
    <>
      <Head>
        <title>{pageTitle.value}</title>
        <link
          rel="stylesheet"
          href="/darkly.bootstrap.min.css"
          media="screen and (prefers-color-scheme: dark)"
        />
        <link
          rel="stylesheet"
          href="/flatly.bootstrap.min.css"
          media="screen and (prefers-color-scheme: light)"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fontsource/work-sans@4.5.12/index.css"
        />
        <link rel="stylesheet" href="/global.css" />
      </Head>
      <div class="w-screen h-screen overflow-hidden bg-primary-bg text-white flex flex-col">
        <NavBar user={user} />
        <main class="overflow-hidden flex-grow-1 flex">{children}</main>
      </div>
    </>
  );
};

export default Layout;
