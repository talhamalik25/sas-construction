"use client";

import { useId, useRef, type ReactNode } from "react";

// Replace with links when destination pages are approved and implemented.
export function PreviewAction({ children, className = "", destination }: {
  children: ReactNode;
  className?: string;
  destination: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  return (
    <span className="relative inline-flex flex-col items-start min-[960px]:static">
      <button
        type="button"
        className={className}
        aria-haspopup="dialog"
        aria-describedby={`${id}-hint`}
        onClick={() => dialog.current?.showModal()}
      >
        {children}
      </button>
      <span id={`${id}-hint`} className="sr-only">{destination} - preview only.</span>
      <dialog
        ref={dialog}
        className="preview-dialog fixed inset-0 m-auto w-[calc(100%-40px)] max-w-md border border-primary/15 bg-background p-7 text-foreground shadow-xl backdrop:bg-foreground/40"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
      >
        <h2 id={`${id}-title`} className="pr-8 font-heading text-2xl font-semibold text-primary">
          {destination} coming soon
        </h2>
        <p id={`${id}-description`} className="my-5 text-sm leading-7 text-muted">
          Our {destination.toLowerCase()} page is being prepared. Please check back soon.
        </p>
        <form method="dialog">
          <button
            type="submit"
            className="inline-flex min-h-13 items-center justify-center gap-6 rounded-[2px] border border-primary bg-primary px-6 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#193b32] [&>svg]:size-[18px] [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:translate-x-0.5"
          >
            Back to homepage
          </button>
        </form>
      </dialog>
    </span>
  );
}
