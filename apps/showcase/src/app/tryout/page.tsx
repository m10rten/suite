import dynamic from "next/dynamic";

const DynamicBlock = dynamic(() => import("@/components/test-block"), {
  ssr: false,
  loading: () => <span>loading client...</span>,
});

export default function CounterPage() {
  return (
    <main className="w-full h-full container flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">
        Tryout of <code>@mvdlei/hooks</code>
      </h1>
      <DynamicBlock />
    </main>
  );
}
