"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { NavigationAction } from "@/components/ui/NavigationAction";
import { sectionDestinations } from "@/lib/constants";

type Shared = { children: ReactNode; variant?: "primary" | "secondary" | "dark"; className?: string };
type Props = Shared & (
  | { destination: keyof typeof sectionDestinations; onNavigate?: () => void }
  | (ComponentPropsWithoutRef<"button"> & { destination?: never })
);

export function CTA({ children, variant = "primary", className = "", ...props }: Props) {
  const content = <><span className="cta-label">{children}</span><span className="cta-direction" aria-hidden="true"><ArrowUpRight size={18} /></span></>;
  const classes = `cta cta-${variant} ${className}`;
  if (props.destination) return <NavigationAction destination={props.destination} onNavigate={props.onNavigate} className={classes}>{content}</NavigationAction>;
  return <button {...props} className={classes}>{content}</button>;
}
