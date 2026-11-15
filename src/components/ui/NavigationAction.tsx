"use client";

import { type ReactNode } from "react";
import { sectionDestinations } from "@/lib/constants";

export function NavigationAction({ children, className = "", destination, onNavigate }: {
  children: ReactNode;
  className?: string;
  destination: keyof typeof sectionDestinations | "Contact";
  onNavigate?: () => void;
}) {
  const href = sectionDestinations[destination];

  if (href) {
    return (
      <a href={href} className={className} onClick={() => {
        onNavigate?.();
        if (href.startsWith("/#")) {
          const target = document.getElementById(href.slice(2));
          target?.setAttribute("tabindex", "-1");
          target?.focus({ preventScroll: true });
        }
      }}>{children}</a>
    );
  }

}
