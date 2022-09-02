/** @jsx h */
import { h } from "preact";
import { UnknownPageProps } from "$fresh/server.ts";
import { tw } from "@twind";

import Layout from "../components/Layout.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  const message = url.searchParams.get("message");
  return (
    <Layout>
      <div
        class={tw`m-4 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800`}
        role="alert"
      >
        <span class={tw`font-medium`}>
          {message || `404 not found: ${url.pathname}`}
        </span>
      </div>
    </Layout>
  );
}
