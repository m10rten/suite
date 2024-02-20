import { Button } from "#/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to your new app!</h1>
      <p className="text-lg text-center">
        This is a template for a Next.js app with Tailwind CSS and TypeScript.
      </p>
      <Button>Click me</Button>
    </main>
  );
}
