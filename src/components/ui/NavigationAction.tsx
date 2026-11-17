"use client";

import { type ReactNode, type AriaAttributes } from "react";
import { sectionDestinations } from "@/lib/constants";

export function NavigationAction({ children, className = "", destination, onNavigate, "aria-current": ariaCurrent }: {
  children: ReactNode;
  className?: string;
  destination: keyof typeof sectionDestinations | "Contact";
  onNavigate?: () => void;
  "aria-current"?: AriaAttributes["aria-current"];
}) {
  const href = sectionDestinations[destination];

  if (href) {
    return (
      <a href={href} aria-current={ariaCurrent} className={className} onClick={() => {
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
