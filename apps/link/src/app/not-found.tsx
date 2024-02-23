import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 w-full flex-col items-center justify-center mt-24 mb-8">
      <h1 className="text-4xl font-bold">Not Found</h1>
      <p className="text-xs text-secondary-foreground/80 mt-4 max-w-xs">
        The page you are looking for does not exist.
      </p>

      <Button
        variant={"outline"}
        asChild
        className="from-primary to-primary/80 bg-gradient-to-tr">
        <Link href="/">
          <i className="=">Go back Home</i>
        </Link>
      </Button>
    </div>
  );
}
