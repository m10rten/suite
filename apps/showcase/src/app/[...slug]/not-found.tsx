import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <section className="my-auto flex items-center justify-center text-center ">
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-9xl font-extrabold animate-pulse">404</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 text-center">
          Oops! Looks like you&apos;ve stumbled upon a broken link. Let&apos;s get you
          back home.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link
              className="from-primary to-purple-500 bg-gradient-to-r inline-flex items-center justify-center rounded-md  px-8 py-5 text-sm font-medium hadow transition-colors"
              href="/">
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
