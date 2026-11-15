
import { ArrowUpRight } from "lucide-react";
import { createWhatsAppLink } from "@/lib/contact";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="size-7"
    >
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.59 5.95L.06 24l6.31-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.83 11.83 0 0 0-3.43-8.42ZM12.06 21.78a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.25c0-5.45 4.44-9.89 9.89-9.89a9.8 9.8 0 0 1 6.99 2.9 9.84 9.84 0 0 1 2.89 7c0 5.44-4.44 9.87-9.88 9.87Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function FloatingWhatsAppCTA() {
  const href = createWhatsAppLink(
    "Hello SAS Construction, I would like to discuss a construction project."
  );

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SAS Construction on WhatsApp"
      title="Chat on WhatsApp"
      className="
        floating-whatsapp
        group
        fixed
        bottom-[calc(20px+env(safe-area-inset-bottom,0px))]
        right-5
        z-40
        flex
        size-14
        items-center
        justify-center
        rounded-2xl
        border
        border-accent/70
        bg-primary
        text-[#25D366]
        shadow-lg shadow-primary/25
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-accent
        hover:bg-primary/90
        hover:shadow-xl hover:shadow-primary/35
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-accent
        motion-reduce:transform-none
        motion-reduce:transition-none
        sm:bottom-7
        sm:right-7
      "
    >
      <WhatsAppIcon />

      {/* Subtle corner arrow on hover */}
      <ArrowUpRight
        size={11}
        strokeWidth={2.5}
        aria-hidden="true"
        className="
          absolute
          right-1.5
          top-1.5
          text-accent
          opacity-0
          transition-opacity
          duration-200
          group-hover:opacity-100
          motion-reduce:transition-none
        "
      />
    </a>
  );
}
