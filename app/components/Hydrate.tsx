import HydrateIsland from "@/islands/HydrateIsland.tsx";

export default function Hydrate({
  name,
  // onLoad,
  data,
}: {
  name: string;
  // onLoad: (data: any) => void;
  data: any;
}) {
  const __html = `var HYDRATE_${name} = ${JSON.stringify(data)}`;
  return (
    <>
      <script
        id={`HYDRATE_${name}`}
        dangerouslySetInnerHTML={{ __html }}
      ></script>
      <HydrateIsland name={name} />
    </>
  );
}
