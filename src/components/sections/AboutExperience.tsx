import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const capabilities = [
  {
    title: "Machinery & Equipment",
    detail: "Direct management of earthmoving, grading, and compaction machinery fleet.",
  },
  {
    title: "Skilled Workforce",
    detail: "Experienced on-site equipment operators, ground teams, and field supervisors.",
  },
  {
    title: "Complete Site Execution",
    detail: "Hands-on day-to-day oversight from initial site cutting to finished subgrade.",
  },
] as const;

export function AboutExperience() {
  return (
    <section
      id="about-experience"
      className="bg-background pt-16 pb-20 md:pt-24 md:pb-28 border-t border-primary/15"
      aria-labelledby="experience-heading"
    >
      <Container>
        <ScrollReveal>
          {/* Eyebrow Header */}
          <div
            className="mb-8 flex items-center gap-4 text-[10px] font-semibold tracking-[0.14em] text-primary uppercase md:mb-12 md:text-xs"
            data-scroll-reveal
          >
            <span className="h-px w-8 shrink-0 bg-accent" aria-hidden="true" />
            <span>About &amp; Experience</span>
            <span className="h-px flex-1 bg-primary/15" aria-hidden="true" />
            <span className="hidden font-mono text-[11px] text-muted sm:inline">
              Est. Ground Experience
            </span>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-y-10 md:grid-cols-12 md:items-start md:gap-x-10 lg:gap-x-14">
            {/* Left Column: Stat + Headline + Narrative */}
            <div className="min-w-0 md:col-span-7 flex flex-col justify-between">
              {/* 20+ Years Hero Metric */}
              <div data-scroll-reveal className="relative">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-[clamp(6.5rem,22vw,14.5rem)] leading-[0.84] font-semibold tracking-[-0.07em] text-primary select-none">
                    20
                  </span>
                  <span className="font-heading text-[clamp(3.5rem,11vw,7.5rem)] leading-[0.84] font-normal text-primary">
                    +
                  </span>
                </div>
                <p className="mt-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted before:h-px before:w-6 before:bg-accent before:content-['']">
                  Years of Practical Field Experience
                </p>
              </div>

              {/* Editorial Headline */}
              <h2
                id="experience-heading"
                className="mt-8 font-heading text-[clamp(1.9rem,3.8vw,3.2rem)] leading-[1.14] font-semibold tracking-[-0.045em] text-foreground"
                data-scroll-reveal
              >
                Two Decades on the Ground.{" "}
                <span className="block text-primary">Practical Execution You Can Rely On.</span>
              </h2>

              {/* Narrative Storytelling */}
              <p
                className="mt-6 max-w-[560px] text-sm leading-[1.85] text-muted md:text-base"
                data-scroll-reveal
              >
                SAS Construction is an independent contractor bringing over two decades of physical, on-site construction experience to road development, earthworks, infrastructure improvements, and site preparation. From machinery deployment and workforce coordination to day-to-day execution, the contractor directly oversees every operational phase on the ground.
              </p>

              {/* Three Structured Capability Pillars */}
              <div className="mt-10 border-t border-primary/20 pt-6" data-scroll-reveal>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-primary/80 block mb-4">
                  Core Contractor Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {capabilities.map((cap) => (
                    <div
                      key={cap.title}
                      className="border border-primary/15 bg-surface p-4 rounded-[2px] transition-colors hover:border-accent"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                        <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-primary">
                          {cap.title}
                        </h3>
                      </div>
                      <p className="text-[11px] leading-[1.6] text-muted">
                        {cap.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Documentary Photography */}
            <div className="min-w-0 md:col-span-5 md:pt-4">
              <figure className="m-0" data-scroll-reveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] border border-primary/15 bg-secondary group">
                  <Image
                    src="/images/representative-earthworks.webp"
                    alt="Excavator bucket and tracked machinery on an earthmoving site"
                    fill
                    className="object-cover object-[center_65%] transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 959px) 42vw, 480px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute top-4 right-4 z-10 h-5 w-5 border-t border-r border-accent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-accent block mb-1">
                      Field Operations
                    </span>
                    <span className="font-heading text-lg font-medium tracking-tight">
                      On-site Machinery Coordination
                    </span>
                  </div>
                </div>

                <figcaption className="mt-3 flex flex-col gap-1 text-[10px] leading-5 text-muted">
                  <span>Representative imagery &middot; Not a SAS project site</span>
                  <a
                    href="https://unsplash.com/photos/a-yellow-excavator-digging-in-dirt-at-a-construction-site-jPsmNCgLghU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-6 w-fit items-center gap-1 underline decoration-primary/30 underline-offset-4 hover:text-primary"
                  >
                    Photography: Defrino Maasy / Unsplash
                  </a>
                </figcaption>
              </figure>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
