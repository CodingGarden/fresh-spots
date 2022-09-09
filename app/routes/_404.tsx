import { UnknownPageProps } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import Alert from "@/components/Alert.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  const message = url.searchParams.get("message");
  return (
    <Layout>
      <Alert message={message || `404 not found: ${url.pathname}`} />
    </Layout>
  );
}
