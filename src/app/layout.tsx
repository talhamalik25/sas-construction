import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";


export const metadata: Metadata = {
  title: "SAS Construction | Roadwork, Earthwork & Site Development",
  description: "Over 20 years of experience in road construction, earthworks, infrastructure development and site preparation. SAS Construction, an independent construction contractor.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
      </body>
    </html>
  );
}
