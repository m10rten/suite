import Link from "next/link";
import { GeistMono } from "geist/font/mono";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="flex relative items-center justify-center py-4 footer border-t bg-background/60">
      <Link
        href={"https://github.com/m10rten"}
        target="_blank"
        className="hover:underline underline-offset-2 flex justify-center gap-1 items-center">
        <span className={cn(GeistMono.className)}>© m10rten</span>
        <ExternalLink className="inline-block ml-2" size={16} />
      </Link>
    </footer>
  );
}

export default Footer;
