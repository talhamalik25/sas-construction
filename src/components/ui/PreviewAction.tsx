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
    <span className="preview-action">
      <button type="button" className={className} aria-haspopup="dialog"
        aria-describedby={`${id}-hint`} onClick={() => dialog.current?.showModal()}>
        {children}
      </button>
      <span id={`${id}-hint`} className="sr-only">{destination} - preview only.</span>
      <dialog ref={dialog} className="preview-dialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
        <h2 id={`${id}-title`}>{destination} coming soon</h2>
        <p id={`${id}-description`}>Our {destination.toLowerCase()} page is being prepared. Please check back soon.</p>
        <form method="dialog">
          <button type="submit" className="button button-primary">Back to homepage</button>
        </form>
      </dialog>
    </span>
  );
}
