import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const capabilities = [
  "Machinery & Equipment",
  "Skilled Workforce",
  "Complete Site Execution",
] as const;

export function AboutExperience() {
  return (
    <section
      id="about-experience"
      className="bg-background pt-16 pb-20 md:pt-24 md:pb-28"
      aria-labelledby="experience-heading"
    >
      <Container>
        <ScrollReveal>
          <div
            className="mb-8 flex items-center gap-5 border-t border-primary/25 pt-5 text-[10px] font-medium tracking-[0.13em] text-primary uppercase md:mb-12 md:text-xs"
            data-scroll-reveal
          >
            <span>About &amp; Experience</span>
            <span className="h-px flex-1 bg-accent" aria-hidden="true" />
            <span className="hidden text-muted sm:inline">Built through doing.</span>
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-y-8 md:grid-cols-12 md:items-start md:gap-x-8 md:gap-y-10 min-[1100px]:gap-x-12 min-[1100px]:gap-y-12">
            <div
              className="min-w-0 md:col-span-7 md:col-start-1 md:row-start-1 md:self-center"
              data-scroll-reveal
            >
              <p className="-ml-2 font-heading text-[clamp(10rem,48vw,17rem)] leading-[0.86] font-medium tracking-[-0.085em] text-primary md:text-[clamp(13rem,25vw,22.5rem)]">
                <span className="sr-only">Over 20 years of practical experience</span>
                <span aria-hidden="true">
                  20<span className="ml-2 inline-block align-top text-[0.43em] leading-[1.35] font-normal tracking-normal text-primary">+</span>
                </span>
              </p>
              <p
                className="mt-6 flex items-center gap-3 text-[10px] font-medium tracking-[0.12em] text-muted uppercase before:h-px before:w-8 before:bg-accent before:content-['']"
                aria-hidden="true"
              >
                Years of practical experience
              </p>
            </div>
            <h2
              id="experience-heading"
              className="max-w-[700px] font-heading text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.16] font-semibold tracking-[-0.045em] text-foreground md:col-span-7 md:col-start-1 md:row-start-2"
              data-scroll-reveal
            >
              20 Years on the Ground.{" "}
              <span className="block text-primary">Experience That Builds Confidence.</span>
            </h2>
            <p
              className="max-w-[530px] text-[15px] leading-[1.85] text-muted md:col-span-6 md:col-start-7 md:row-start-3 min-[1100px]:col-span-5 min-[1100px]:col-start-8 min-[1100px]:text-base"
              data-scroll-reveal
            >
              SAS Construction brings over two decades of practical construction experience to road development, earthworks, infrastructure improvement and site preparation. From machinery and workforce coordination to on-site execution, every stage is managed with a hands-on approach.
            </p>
            <figure
              className="m-0 min-w-0 md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:pt-6 min-[1100px]:col-span-4 min-[1100px]:col-start-9 min-[1100px]:pt-8"
              data-scroll-reveal
            >
              <div className="relative aspect-[6/5] overflow-hidden bg-secondary md:aspect-[4/5]">
                <Image
                  src="/images/representative-earthworks.webp"
                  alt="Excavator bucket and tracked machinery on an earthmoving site"
                  fill
                  className="object-cover object-[center_65%]"
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 959px) 42vw, 400px"
                />
              </div>
              <figcaption className="mt-3 flex flex-col gap-1 text-[10px] leading-5 text-muted">
                <span>Representative imagery. Not a SAS project site.</span>
                <a
                  href="https://unsplash.com/photos/a-yellow-excavator-digging-in-dirt-at-a-construction-site-jPsmNCgLghU"
                  className="inline-flex min-h-6 w-fit items-center gap-1 underline decoration-primary/30 underline-offset-4 hover:text-primary"
                >
                  Defrino Maasy / Unsplash <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
            <ul
              className="border-t border-primary/20 md:col-span-5 md:col-start-1 md:row-start-3 min-[1100px]:col-span-6"
              aria-label="Construction capabilities"
            >
              {capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-center gap-4 border-b border-primary/20 py-5 text-sm font-medium text-primary min-[1100px]:text-base"
                  data-scroll-reveal
                >
                  <span className="h-2 w-2 shrink-0 border border-primary" aria-hidden="true" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
