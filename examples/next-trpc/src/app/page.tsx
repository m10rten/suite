import { Button } from "@mvdlei/ui";

export default function Home() {
  return (
    <main className="relative container h-screen w-screen py-8">
      <h1>Next.js + tRPC</h1>
      <p>
        <a href="https://trpc.io">tRPC</a> is a small and fast TypeScript RPC framework
        for building end-to-end type-safe APIs and applications with TypeScript.
      </p>

      <Button>Click me</Button>
    </main>
  );
}
