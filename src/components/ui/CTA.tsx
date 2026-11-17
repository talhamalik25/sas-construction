
"use client";

import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import { ArrowUpRight } from "lucide-react";
import { NavigationAction } from "@/components/ui/NavigationAction";
import { sectionDestinations } from "@/lib/constants";

type Shared = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "link";
  className?: string;
};

type Props = Shared &
  (
    | {
        destination: keyof typeof sectionDestinations;
        onNavigate?: () => void;
        href?: never;
        target?: never;
        rel?: never;
      }
    | (Omit<ComponentPropsWithoutRef<"a">, "children" | "className"> & {
        destination?: never;
      })
    | (Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
        destination?: never;
        href?: never;
      })
  );

export function CTA({
  children,
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const variantStyles = {
    primary: "border-accent bg-accent text-primary hover:border-primary hover:bg-primary hover:text-background focus-visible:outline-primary",
    secondary: "border-primary/30 bg-transparent text-primary hover:border-primary hover:bg-secondary focus-visible:outline-primary",
    dark: "border-accent bg-accent text-primary hover:border-background hover:bg-background focus-visible:outline-accent",
    link: "border-primary/20 bg-transparent text-primary hover:border-primary hover:bg-secondary focus-visible:outline-primary",
  }[variant];
  const content = (
    <>
      <span className="cta-label">{children}</span>
      <ArrowUpRight aria-hidden="true" size={18} className="cta-direction shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
    </>
  );
  const spacing = variant === "link" ? "gap-4 px-5" : "gap-6 px-6";
  const baseClasses = `cta cta-${variant} group inline-flex min-h-13 max-w-full items-center justify-between rounded-full border py-3 text-[13px] font-semibold leading-5 transition-[background-color,border-color,color,box-shadow] duration-200 hover:shadow-sm active:opacity-80 disabled:cursor-not-allowed disabled:border-muted/30 disabled:bg-secondary disabled:text-muted ${spacing} ${variantStyles} ${className}`;

  // Navigation CTA
  if ("destination" in props && props.destination) {
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

  if ("href" in props && typeof props.href === "string") {
    const { href, target, rel, ...anchorProps } = props;
    return (
      <a
        {...anchorProps}
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  // Regular button
  const buttonProps = props as ComponentPropsWithoutRef<"button">;
  return (
    <button {...buttonProps} className={baseClasses}>
      {content}
    </button>
  );
}
