import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { siteConfig } from "@/src/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} · GitHub Repository Analyzer`,
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
