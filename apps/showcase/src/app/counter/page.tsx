import dynamic from "next/dynamic";

const DynamicBlock = dynamic(() => import("@/components/test-block"), {
  ssr: false,
  loading: () => <span>loading...</span>,
});

export default function CounterPage() {
  return (
    <main className="w-full h-full container flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">Counter</h1>
      <h2 className="text-xl sm:text-2xl font-bold text-center">
        with localstorage from `@mvdlei/hooks`
      </h2>
      <DynamicBlock />
    </main>
  );
}
