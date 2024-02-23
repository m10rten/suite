"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function SinginContent() {
  const router = useRouter();

  return (
    <>
      <h1 className="text-4xl font-bold">Sign In</h1>
      <Button
        variant={"outline"}
        className="mt-4"
        onClick={() => signIn("github", { callbackUrl: "/" })}>
        <Github />
        <span className="ml-2">Sign in with Github</span>
        <span className="sr-only">Sign in with Github</span>
      </Button>
      <p className="text-xs text-secondary-foreground/80 mt-4 max-w-xs">
        By signing in, you agree to our{" "}
        <Link className="underline" href="/terms">
          Terms of Service
        </Link>
      </p>
    </>
  );
}
