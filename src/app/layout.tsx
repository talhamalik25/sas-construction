import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
        <a
          className="fixed top-3 left-4 z-50 -translate-y-24 bg-primary px-5 py-3 text-white transition-transform focus:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
