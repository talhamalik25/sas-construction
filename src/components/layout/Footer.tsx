"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Container";
import { NavigationAction } from "@/components/ui/NavigationAction";
import { createWhatsAppLink } from "@/lib/contact";
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
    <footer className="border-t border-primary/20 bg-secondary/60 pt-12 pb-20 md:pt-16">
      <Container>
        <div className="grid gap-10 pb-12 md:grid-cols-12 md:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-5 lg:col-span-6">
            <Link
              href="/"
              aria-label="SAS Construction home"
              className="inline-block transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo.png"
                alt="SAS Construction"
                width={1536}
                height={1024}
                sizes="140px"
                className="h-auto w-[120px] sm:w-[140px] object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-[1.85] text-muted">
              Independent construction contractor with over two decades of practical field experience managing road development, earthworks, utilities, and site preparation across Sindh.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <p className="mb-4 text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-primary">
              Explore
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col items-start space-y-1">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-wider text-primary hover:text-foreground transition-colors"
              >
                Home
              </Link>
              {navigation.map((item) => (
                <NavigationAction
                  key={item}
                  destination={item}
                  className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-wider text-muted hover:text-primary transition-colors"
                >
                  {item}
                </NavigationAction>
              ))}
            </nav>
          </div>

          {/* Direct Engagement */}

          <div className="md:col-span-4 lg:col-span-3">
            <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Get in touch
            </p>

            <p className="max-w-xs text-sm leading-7 text-muted">Start a conversation about your site and scope of work.</p>
            <a href={createWhatsAppLink("Hello SAS Construction, I would like to discuss a construction project.") ?? "/#contact"} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-8 hover:decoration-primary">Contact us on WhatsApp ↗</a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between gap-3 border-t border-primary/20 pt-6 text-[11px] font-mono text-muted sm:flex-row">
          <p>&copy; {year} SAS Construction. All rights reserved.</p>
          <p className="text-primary/80">
            Machinery &middot; Workforce &middot; Field Execution
          </p>
        </div>
      </Container>
    </footer>
  );
}
