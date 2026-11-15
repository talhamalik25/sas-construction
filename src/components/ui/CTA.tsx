
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
  variant?: "primary" | "secondary" | "dark";
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
  // Button variants
  const variantStyles = {
    primary:
      "bg-primary text-background border-primary hover:bg-foreground hover:border-foreground disabled:border-muted disabled:bg-secondary disabled:text-muted",

    secondary:
      "bg-background text-primary border-primary hover:bg-secondary disabled:border-muted disabled:bg-secondary disabled:text-muted",

    // Premium single-color gold CTA
    dark:
      "bg-accent text-primary border-accent hover:bg-[#E5C591] hover:border-[#E5C591] focus-visible:outline-accent disabled:border-muted disabled:bg-secondary disabled:text-muted",
  }[variant];

  // Arrow styling
  const arrowStyles = {
    primary:
      "border-accent text-accent group-disabled:border-muted group-disabled:text-muted",

    secondary:
      "border-primary text-primary group-disabled:border-muted group-disabled:text-muted",

    // Same gold background, no separate color block
    dark:
      "border-primary/20 text-primary group-disabled:border-muted group-disabled:text-muted",
  }[variant];

  const content = (
    <>
      {/* CTA Label */}
      <span
        className="
          cta-label
          flex
          items-center
          px-5
          py-3.5
          font-sans
          tracking-wide
          max-sm:px-4
        "
      >
        {children}
      </span>

      {/* Arrow */}
      <span
        aria-hidden="true"
        className={`
          cta-direction
          flex
          w-12
          shrink-0
          items-center
          justify-center
          border-l
          transition-colors
          duration-200
          ${arrowStyles}
        `}
      >
        <ArrowUpRight
          size={18}
          className="
            transition-transform
            duration-200
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
            motion-reduce:transform-none
          "
        />
      </span>
    </>
  );

  const baseClasses = `
    cta
    cta-${variant}
    group
    inline-flex
    min-h-[54px]
    max-w-full
    shrink-0
    items-stretch
    justify-between
    overflow-hidden
    rounded-lg
    border
    text-[13px]
    font-semibold
    leading-[1.4]
    no-underline
    transition-colors
    duration-200
    cursor-pointer
    disabled:cursor-not-allowed
    ${variantStyles}
    ${className}
  `;

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
