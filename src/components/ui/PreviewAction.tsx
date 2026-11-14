"use client";

import { useId, useState, type ReactNode } from "react";

// Replace with links when destination pages are approved and implemented.
export function PreviewAction({ children, className = "", destination }: {
  children: ReactNode;
  className?: string;
  destination: string;
}) {
  const [notice, setNotice] = useState(false);
  const noticeId = useId();
  return (
    <span className="preview-action">
      <button type="button" className={className} aria-describedby={noticeId} onClick={() => setNotice(true)}>
        {children}
      </button>
      <span id={noticeId} className={notice ? "preview-notice" : "sr-only"} role="status">
        {notice ? `${destination} is not available in this homepage preview.` : `${destination} - preview only.`}
      </span>
    </span>
  );
}
