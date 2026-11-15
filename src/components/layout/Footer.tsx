"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NavigationAction } from "@/components/ui/NavigationAction";
import { navigation } from "@/lib/constants";

function subscribeToYear(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}
const currentYear = () => new Date().getFullYear();
const serverYear = () => null;

export function Footer() {
  const year = useSyncExternalStore(subscribeToYear, currentYear, serverYear);
  return (
    <footer className="border-t border-primary/20 bg-background pt-12 pb-6 md:pt-16">
      <Container>
        <div className="grid gap-10 pb-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <Link href="/" aria-label="SAS Construction home" className="inline-block bg-surface"><Image src="/logo.png" alt="SAS Construction" width={1536} height={1024} sizes="180px" className="h-auto w-[180px]" /></Link>
            <p className="mt-5 max-w-sm text-sm leading-[1.85] text-muted">An independent construction contractor bringing hands-on experience to roads, earthworks and site development.</p>
          </div>
          <div className="md:col-span-3">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Explore</p>
            <nav aria-label="Footer navigation" className="flex flex-col items-start">
              <Link href="/" className="inline-flex min-h-11 items-center text-sm text-primary hover:underline">Home</Link>
              {navigation.map(item => <NavigationAction key={item} destination={item} className="inline-flex min-h-11 items-center text-sm text-primary underline-offset-4 hover:underline">{item}</NavigationAction>)}
            </nav>
          </div>
          <div className="md:col-span-3">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Start a conversation</p>
            <NavigationAction destination="Contact" className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-primary underline decoration-accent decoration-2 underline-offset-8">Discuss your project <ArrowUpRight size={16} aria-hidden="true" /></NavigationAction>
            <p className="mt-4 text-xs leading-6 text-muted">Online enquiries await a verified contact destination.</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-primary/20 pt-6 text-[11px] leading-5 text-muted sm:flex-row">
          <p>© {year} SAS Construction. All rights reserved.</p><p>Machinery. Workforce. Site execution.</p>
        </div>
      </Container>
    </footer>
  );
}
