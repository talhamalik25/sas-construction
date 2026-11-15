import { ArrowUpRight } from "lucide-react";
import { createWhatsAppLink } from "@/lib/contact";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="size-[23px] shrink-0">
      <path
        fill="currentColor"
        d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.48 0 .13 5.35.13 11.93c0 2.1.55 4.15 1.6 5.96L.03 24l6.26-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.48-8.42ZM12.07 21.8h-.01a9.88 9.88 0 0 1-5.03-1.37l-.36-.21-3.72.98.99-3.63-.23-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.89 7c0 5.45-4.44 9.88-9.9 9.88Zm5.43-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.49-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.22 5.1 4.52.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"
      />
    </svg>
  );
}

export function FloatingWhatsAppCTA() {
  const href = createWhatsAppLink(
    "Hello SAS Construction, I would like to discuss a construction project.",
  );
  // An unavailable floating control obscures content without offering an action.
  // The Contact section already explains why enquiry delivery is unavailable.
  if (!href) return null;
  const className =
    "group inline-flex min-h-14 items-center justify-center gap-[11px] rounded-[20px] border border-accent bg-primary px-[18px] text-[13px] font-semibold leading-[1.2] text-background no-underline shadow-lg transition-[background-color,box-shadow,transform] duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent hover:-translate-y-0.5 hover:bg-foreground hover:shadow-xl disabled:cursor-not-allowed disabled:border-muted disabled:bg-secondary disabled:text-muted disabled:shadow-md max-[374px]:min-h-[52px] max-[374px]:gap-[9px] max-[374px]:px-3 max-[374px]:text-xs";
  const content = (
    <>
      <WhatsAppIcon />
      <span>Chat on WhatsApp</span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-[17px] shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-disabled:text-muted"
      />
    </>
  );

  return (
    <div className="fixed bottom-[calc(16px+env(safe-area-inset-bottom,0px))] right-[clamp(16px,calc((100vw-1320px)/2),32px)] z-30 max-w-[calc(100vw-32px)]">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} whitespace-nowrap`}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          className={`${className} whitespace-nowrap`}
          disabled
          aria-label="Chat on WhatsApp, unavailable until verified contact details are provided"
          title="WhatsApp is unavailable until verified contact details are provided."
        >
          {content}
        </button>
      )}
    </div>
  );
}
