import Link from "next/link";

import { Button } from "#/ui/button";

export default function Home() {
  return (
    <main className="w-full h-full container flex flex-col justify-center items-center gap-4">
      <span className="text-2xl font-medium text-indigo-600 dark:text-indigo-400">
        Introducing
      </span>
      <h1 className="text-5xl font-bold text-center">A New Intuitive Way Of Building</h1>
      <p className="text-xl max-w-xl text-center text-foreground/80">
        A new way of building websites, apps, and products with a simple, intuitive, and
        powerful API. With this suite of packages, you can build anything you want,
        Intuitively.
      </p>

      <div className="flex gap-2">
        <Button asChild>
          <Link href="/overview">Get Started</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/most-used">See Most Used</Link>
        </Button>
      </div>
    </main>
  );
}
