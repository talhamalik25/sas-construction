import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { HeroMotion } from "@/components/ui/HeroMotion";
import { heroImage } from "@/lib/constants";

export function Hero() {
  return (
    <HeroMotion>
      <section
        className="pt-8 pb-6 md:pt-12 [@media(min-width:960px)_and_(max-height:850px)]:pt-6"
        aria-labelledby="hero-heading"
      >
        <Container>
          <div className="relative min-w-0">
            {/* Eyebrow Meta Bar */}
            <div
              className="mb-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 md:mb-8 [@media(min-width:960px)_and_(max-height:850px)]:mb-5"
              data-hero-reveal
            >
              <p className="flex items-center gap-3 text-[10px] leading-5 font-semibold tracking-[0.14em] text-primary uppercase md:text-xs">
                <span className="h-px w-8 shrink-0 bg-accent" aria-hidden="true" />
                Independent Contractor &middot; Hands-on Execution
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium text-muted max-sm:pl-11">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                20+ Years Field Experience
              </span>
            </div>

            {/* Display Headline */}
            <h1
              id="hero-heading"
              className="font-heading text-[clamp(2.5rem,7vw,6.3rem)] leading-[1.04] font-semibold tracking-[-0.055em] text-foreground max-sm:text-[clamp(2.4rem,10.2vw,4rem)] max-sm:tracking-[-0.04em] [@media(min-width:960px)_and_(max-height:850px)]:text-[clamp(3.75rem,6.2vw,5.4rem)]"
              data-hero-reveal
            >
              <span className="block">Building Strong</span>{" "}
              <span className="block">
                Foundations <span className="text-primary max-sm:block">for Tomorrow.</span>
              </span>
            </h1>

            {/* Sub-lead & Action Buttons */}
            <div
              className="mt-7 mb-8 flex flex-col justify-between gap-6 border-t border-primary/15 pt-6 md:mt-9 md:mb-10 min-[960px]:mt-9 min-[960px]:mb-10 min-[960px]:flex-row min-[960px]:items-center min-[960px]:gap-12 [@media(min-width:960px)_and_(max-height:850px)]:mt-6 [@media(min-width:960px)_and_(max-height:850px)]:mb-7 [@media(min-width:960px)_and_(max-height:850px)]:pt-5"
              data-hero-reveal
            >
              <p className="max-w-[540px] text-sm leading-[1.85] text-muted md:text-base min-[960px]:max-w-[490px]">
                Over 20 years of experience in road construction, earthworks, infrastructure development and site preparation across Sindh.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 min-[960px]:shrink-0">
                <CTA destination="Projects" variant="secondary">
                  Explore Our Projects
                </CTA>
                <CTA destination="Contact">
                  Get in Touch
                </CTA>
              </div>
            </div>
          </div>
        </Container>

        {/* Panoramic Editorial Photography Frame */}
        <figure className="relative m-0">
          <div className="hero-photo relative isolate h-[400px] overflow-hidden bg-secondary md:h-[480px] min-[960px]:h-[clamp(380px,50svh,600px)] after:pointer-events-none after:absolute after:inset-0 after:bg-linear-to-t after:from-primary/95 after:via-primary/15 after:to-transparent after:content-['']">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              preload
              quality={90}
              sizes="100vw"
              className="object-cover object-[32%_35%]"
            />

            {/* Corner registration mark */}
            <div
              className="pointer-events-none absolute top-6 right-6 sm:top-8 sm:right-8 z-10 h-6 w-6 border-t border-r border-accent"
              aria-hidden="true"
            />

            {/* In-photo Editorial Caption Container */}
            <Container className="photo-caption-container absolute inset-x-0 bottom-6 sm:bottom-8 md:bottom-10 z-10 flex items-end justify-between gap-6">
              <div className="photo-title min-w-0 border-l border-accent pl-4 sm:pl-5 text-white">
                <span className="photo-label mb-2 sm:mb-3 block text-[10px] font-mono tracking-[0.16em] uppercase text-accent md:text-xs">
                  Earthwork &amp; Site Preparation
                </span>
                <span className="block font-heading text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.1] font-medium tracking-tight">
                  Progress starts<br />at ground level.
                </span>
              </div>
              <p className="photo-scope hidden text-right text-xs leading-6 text-white/90 md:block font-mono">
                Machinery &middot; Workforce<br />Site Management &middot; Execution
              </p>
            </Container>
          </div>

          {/* Mandatory Provenance & Photo Attribution */}
          <Container className="flex flex-col justify-between gap-1 pt-3 text-[10px] leading-5 text-muted sm:flex-row sm:gap-4 sm:text-xs">
            <a
              href={heroImage.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1 underline decoration-primary/30 underline-offset-4 hover:text-primary"
            >
            </a>
          </Container>
        </figure>
      </section>
    </HeroMotion>
  );
}
