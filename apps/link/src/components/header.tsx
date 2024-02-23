import Link from "next/link";

import { auth } from "@/lib/auth";

import Profile from "./profile";
import ThemeSwitch from "./theme-switch";
import { Button } from "./ui/button";

export default async function Header() {
  const session = await auth();
  return (
    <header className="fixed top-0 w-full border-b py-2 px-4 z-50 backdrop-blur-md bg-background/80 shadow-sm">
      <nav className="w-full justify-between flex items-center my-1 sm:container">
        <span className="flex font-mono text-lg">
          <span className="hidden sm:block">Mvdlei / </span>
          <Link href={"/"}>
            <h1 className="font-bold">&nbsp;Link</h1>
          </Link>
        </span>
        <div className="flex items-center sm:gap-5 gap-3 group sm:px-3 px-1 text-sm sm:text-base">
          {session ? (
            <Profile session={session} />
          ) : (
            <>
              <ThemeSwitch />
              <Button variant={"outline"} asChild>
                <Link href={"/signin"}>
                  <span className="cursor-pointer">Sign in</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
