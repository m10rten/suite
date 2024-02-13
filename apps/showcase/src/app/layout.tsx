import type { Metadata } from "next";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

import { cn } from "@/lib/utils";
import Footer from "#/footer";
import Header from "#/header";
import Providers from "#/providers";

export const metadata: Metadata = {
  title: "Showcase Suite - Mvdlei",
  description: "Showcase Suite for packages and apps by Mvdlei - @m10rten",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(GeistSans.className)}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
