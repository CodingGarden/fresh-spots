import { UnknownPageProps } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import Alert from "@/components/Alert.tsx";
import { pageTitle } from "../signals/index.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  const message = url.searchParams.get("message");
  pageTitle.value = 'Not Found';
  return (
    <Layout>
      <Alert message={message || `404 not found: ${url.pathname}`} />
    </Layout>
  );
}
