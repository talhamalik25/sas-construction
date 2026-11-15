import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contractorStrengths } from "@/data/approach";

export function WhyChooseUs() {
  return (
    <section
      id="why-sas"
      aria-labelledby="why-heading"
      className="border-t border-primary/15 bg-background py-20 md:py-28 lg:py-32"
    >
      <Container>
        <ScrollReveal>
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Contractor Strengths"
                title="Experience You Can Build On."
                id="why-heading"
              />
            </div>
            <p
              className="max-w-md text-xs sm:text-sm leading-relaxed text-muted md:text-right"
              data-scroll-reveal
            >
              Independent accountability and direct site management across roadwork, earthmoving, and infrastructure development.
            </p>
          </div>

          {/* Architectural 2x2 Editorial Grid */}
          <div
            className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 border border-primary/20 divide-y md:divide-y-0 md:divide-x divide-primary/20 bg-surface rounded-[2px]"
            data-scroll-reveal
          >
            {contractorStrengths.map((item, i) => (
              <article
                key={item.title}
                className="group relative p-8 sm:p-10 md:p-12 transition-colors duration-200 hover:bg-secondary/20 flex flex-col justify-between"
                data-scroll-reveal
              >
                {/* Architectural corner registration mark */}
                <span
                  className="pointer-events-none absolute top-4 right-4 h-3 w-3 border-t border-r border-accent/70 transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />

                <div>
                  {/* Step Numeral Header */}
                  <div className="flex items-center justify-between border-b border-primary/15 pb-4">
                    <span className="font-mono text-xs font-bold tracking-wider text-primary">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-muted">
                      Core Discipline
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 font-heading text-xl sm:text-2xl font-semibold tracking-tight text-primary">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-[1.8] text-muted">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-8 pt-4 border-t border-primary/10 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span className="text-[11px] font-mono tracking-wide text-primary/80">
                    Direct Field Oversight
                  </span>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
