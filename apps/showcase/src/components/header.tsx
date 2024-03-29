import Link from "next/link";

import ThemeSwitch from "#/theme-switch";

export default function Header() {
  return (
    <header className="fixed top-0 w-full border-b py-2 px-4 z-50 backdrop-blur-md bg-background/80 shadow-sm">
      <nav className="w-full justify-between flex items-center my-1 sm:container">
        <span className="flex font-mono text-lg">
          <span className="hidden sm:block">Mvdlei / </span>
          <Link href={"/"}>
            <h1 className="font-bold">&nbsp;Suite</h1>
          </Link>
        </span>
        <div className="flex items-center sm:gap-5 gap-3 group sm:px-3 px-1 text-sm sm:text-base">
          <Link href="/overview" className="hover:underline transition-all">
            Get started
          </Link>
          <Link href="/info" className="hover:underline transition-all">
            Why &apos;this&apos;?
          </Link>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}
