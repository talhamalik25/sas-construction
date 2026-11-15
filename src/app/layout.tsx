import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsAppCTA } from "@/components/layout/FloatingWhatsAppCTA";
import { siteUrl, siteDescription } from "@/lib/site";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "SAS Construction | Roadwork, Earthwork & Site Development",
  description: siteDescription,
  openGraph: {
    type: "website", url: "/", siteName: "SAS Construction",
    title: "SAS Construction | Roadwork, Earthwork & Site Development",
    description: siteDescription,
    images: [{ url: "/logo.png", width: 1536, height: 1024, alt: "SAS Construction" }],
  },
  twitter: { card: "summary", title: "SAS Construction", description: siteDescription, images: ["/logo.png"] },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          className="skip-link fixed top-3 left-4 z-50 bg-primary px-5 py-3 text-white"
          href="#main-content"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <FloatingWhatsAppCTA />
      </body>
    </html>
  );
}
