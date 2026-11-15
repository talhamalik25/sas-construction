"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { NavigationAction } from "@/components/ui/NavigationAction";
import { sectionDestinations } from "@/lib/constants";

type Shared = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
};

type Props = Shared & (
  | { destination: keyof typeof sectionDestinations; onNavigate?: () => void }
  | (ComponentPropsWithoutRef<"button"> & { destination?: never })
);

export function CTA({ children, variant = "primary", className = "", ...props }: Props) {
  const variantStyles = {
    primary:
      "bg-primary text-background border-primary hover:bg-foreground hover:border-foreground disabled:border-muted disabled:bg-secondary disabled:text-muted",
    secondary:
      "bg-background text-primary border-primary hover:bg-secondary disabled:border-muted disabled:bg-secondary disabled:text-muted",
    dark:
      "bg-background text-primary border-background hover:bg-accent hover:border-accent focus-visible:outline-accent disabled:border-muted disabled:bg-secondary disabled:text-muted",
  }[variant];

  const arrowStyles = {
    primary: "border-accent text-accent group-disabled:border-muted group-disabled:text-muted",
    secondary: "border-primary text-primary group-disabled:border-muted group-disabled:text-muted",
    dark: "bg-accent border-accent text-primary group-disabled:bg-secondary group-disabled:border-muted group-disabled:text-muted",
  }[variant];

  const content = (
    <>
      <span className="cta-label flex items-center px-5 py-3.5 max-sm:px-4 tracking-wide font-sans">
        {children}
      </span>
      <span
        className={`cta-direction flex w-12 shrink-0 items-center justify-center border-l transition-colors duration-200 ${arrowStyles}`}
        aria-hidden="true"
      >
        <ArrowUpRight
          size={18}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
        />
      </span>
    </>
  );

  const baseClasses = `cta cta-${variant} group inline-flex items-stretch justify-between min-h-[54px] max-w-full shrink-0 border rounded-[2px] text-[13px] font-semibold leading-[1.4] no-underline transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed ${variantStyles} ${className}`;

  if (props.destination) {
    return (
      <NavigationAction
        destination={props.destination}
        onNavigate={props.onNavigate}
        className={baseClasses}
      >
        {content}
      </NavigationAction>
    );
  }

  return (
    <button {...props} className={baseClasses}>
      {content}
    </button>
  );
}
