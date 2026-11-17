import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { HeroMotion } from "@/components/ui/HeroMotion";
import { heroImage } from "@/lib/constants";
import { createWhatsAppLink } from "@/lib/contact";

export function Hero() {
  const quote = createWhatsAppLink("Hello SAS Construction, I would like to request a quotation for my project.");
  return (
    <HeroMotion>
      <section aria-labelledby="hero-heading" className="pt-10 pb-8 md:pt-14 md:pb-10">
        <Container>
          <div data-hero-reveal className="mb-6 flex items-center justify-between gap-5 md:mb-8">
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-primary">
              <span className="h-px w-7 shrink-0 bg-accent" aria-hidden="true" />
              20+ years. Hands-on experience.
            </p>
            <span className="hidden text-xs text-muted md:block">Independent contractor · Pakistan</span>
          </div>
          <div className="grid items-end gap-7 lg:grid-cols-[1.2fr_1fr] lg:gap-10 xl:gap-16">
            <h1 id="hero-heading" data-hero-reveal className="font-heading text-display font-semibold text-foreground">
              Building strong<br />
              <span className="text-primary">foundations.</span>
            </h1>
            <div data-hero-reveal className="lg:pb-1">
              <p className="max-w-md text-sm leading-7 text-muted md:text-base">
                Roadwork, earthworks and site development. SAS Construction brings practical experience and direct coordination to the work on the ground.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1">
                <CTA href={quote ?? "/#contact"}>Request a Quote</CTA>
                <CTA destination="Projects" variant="link" className="">Explore Our Work</CTA>
              </div>
            </div>
          </div>
          <figure className="mt-8 md:mt-11">
            <div className="hero-photo relative isolate h-[300px] overflow-hidden bg-secondary sm:h-[380px] lg:h-[clamp(320px,40vw,460px)]">
              <Image src={heroImage.src} alt={heroImage.alt} fill preload quality={90} sizes="(min-width: 1400px) 1272px, 100vw" className="object-cover object-[40%_45%]" />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-foreground/75 to-transparent px-5 pt-20 pb-6 text-background sm:px-8 sm:pb-8">
                <div className="flex items-end justify-between gap-6">
                  <p className="font-heading text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-tight tracking-tight">Progress starts<br />at ground level.</p>
                  <span className="hidden border-l border-accent pl-5 text-xs leading-6 sm:block">Machinery. Workforce.<br />Direct site coordination.</span>
                </div>
              </div>
            </div>
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-[11px] leading-5 text-muted">
              <span>Representative imagery · Not a SAS project site</span>
              <span className="hidden sm:inline">Earthwork &amp; site preparation</span>
            </figcaption>
          </figure>
        </Container>
      </section>
    </HeroMotion>
  );
}
