import type { Metadata } from "next";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

import Header from "#/header";
import Providers from "#/providers";

export const metadata: Metadata = {
  title: "Showcase Suite - Mvdlei",
  description: "Showcase Suite for packages and apps by Mvdlei",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
