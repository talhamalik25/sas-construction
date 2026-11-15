import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsAppCTA } from "@/components/layout/FloatingWhatsAppCTA";
import { siteUrl, siteTitle, siteDescription } from "@/lib/site";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#254E43",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "construction contractor Karachi",
    "road construction Pakistan",
    "earthworks and backfilling",
    "road paving",
    "sewerage installation",
    "water line development",
    "site preparation Sindh",
    "boundary wall construction",
    "SAS Construction",
  ],
  authors: [{ name: "SAS Construction" }],
  creator: "SAS Construction",
  publisher: "SAS Construction",
  formatDetection: {
    telephone: true,
    address: false,
    email: false,
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: "SAS Construction",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/logo.png",
        width: 1536,
        height: 1024,
        alt: "SAS Construction - Independent Construction Contractor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${siteUrl}/#organization`,
  name: "SAS Construction",
  alternateName: "SAS Construction Pakistan",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/logo.png`,
  description: siteDescription,
  telephone: "+923312718673",
  priceRange: "$$",
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Karachi, Sindh, Pakistan",
    },
    {
      "@type": "AdministrativeArea",
      name: "Sindh, Pakistan",
    },
  ],
  knowsAbout: [
    "Road Construction",
    "Earthworks and Backfilling",
    "Road Paving",
    "Sewerage Installation",
    "Water Line Development",
    "Site Preparation",
    "Boundary Wall Construction",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50 focus:bg-primary focus:px-5 focus:py-3 focus:text-white"
          href="#main-content"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingWhatsAppCTA />
      </body>
    </html>
  );
}
