
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTA } from "@/components/ui/CTA";
import { createWhatsAppLink } from "@/lib/contact";

export function ProjectInquiry() {
  const whatsappHref = createWhatsAppLink(
    "Hello SAS Construction, I would like to discuss a construction project and request a quotation."
  );

  return (
    <section
      id="project-inquiry"
      aria-labelledby="inquiry-heading"
      className="relative isolate overflow-hidden bg-primary py-20 text-background md:py-28 lg:py-32"
    >
      {/* Architectural accent lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[10%] -z-10 w-[30%] skew-x-[-18deg] border-x border-background/10"
      >
        <div className="absolute inset-y-0 left-1/2 border-l border-background/10" />
      </div>

      <Container>
        <ScrollReveal>
          {/* Eyebrow */}
          <div
            className="mb-8 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent"
            data-scroll-reveal
          >
            <span
              aria-hidden="true"
              className="h-px w-8 bg-accent"
            />
            <span>Initiate Direct Groundwork</span>
          </div>

          {/* Heading */}
          <h2
            id="inquiry-heading"
            className="max-w-4xl font-heading text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[1.08] tracking-[-0.05em]"
            data-scroll-reveal
          >
            Have a Construction Project in Mind?
            <br />
            <span className="text-accent">
              Let&apos;s Discuss the Groundwork.
            </span>
          </h2>

          {/* Body & Action */}
          <div
            className="mt-10 flex flex-col justify-between gap-8 border-t border-background/20 pt-8 md:flex-row md:items-center md:gap-16"
            data-scroll-reveal
          >
            <p className="max-w-lg text-sm leading-[1.85] text-background/85 md:text-base">
              Planning road development, mass earthworks,
              underground utilities, or site preparation?
              Connect directly with SAS Construction to
              evaluate your project scope.
            </p>

            {whatsappHref ? (
              <CTA href={whatsappHref} variant="dark">
                Discuss Your Project
              </CTA>
            ) : (
              <span
                aria-label="Project enquiries are currently unavailable"
                className="inline-flex min-h-14 shrink-0 cursor-not-allowed items-center rounded-lg border border-accent/40 bg-accent/50 px-6 py-3 text-sm font-semibold text-primary/80"
              >
                Enquiries Unavailable
              </span>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
