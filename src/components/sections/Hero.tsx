import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NavigationAction } from "@/components/ui/NavigationAction";
import { HeroMotion } from "@/components/ui/HeroMotion";
import { heroImage } from "@/lib/constants";

export function Hero() {
  return (
    <HeroMotion>
      <section
        className="pt-8 pb-6 md:pt-10 [@media(min-width:960px)_and_(max-height:850px)]:pt-6"
        aria-labelledby="hero-heading"
      >
        <Container>
          <div className="relative min-w-0">
            <div
              className="mb-7 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 md:mb-9 [@media(min-width:960px)_and_(max-height:850px)]:mb-6"
              data-hero-reveal
            >
              <p className="flex items-center gap-3 text-[10px] leading-5 font-semibold tracking-[0.12em] text-primary uppercase md:text-[11px]">
                <span className="h-px w-7 shrink-0 bg-accent" aria-hidden="true" />
                Independent contractor. Hands-on execution.
              </p>
              <p className="text-[11px] font-medium text-muted max-sm:pl-10">20+ years of field experience</p>
            </div>
            <h1
              id="hero-heading"
              className="font-heading text-[clamp(2.5rem,7vw,6.3rem)] leading-[1.04] font-semibold tracking-[-0.06em] text-foreground max-sm:text-[clamp(2.5rem,10.4vw,4.1rem)] max-sm:tracking-[-0.045em] [@media(min-width:960px)_and_(max-height:850px)]:text-[clamp(3.75rem,6.2vw,5.4rem)]"
              data-hero-reveal
            >
              <span className="block">Building Strong</span>{" "}
              <span className="block">
                Foundations <span className="text-primary max-sm:block">for Tomorrow.</span>
              </span>
            </h1>
            <div
              className="mt-7 mb-8 flex flex-col justify-between gap-6 border-t border-primary/15 pt-6 md:mt-9 md:mb-10 min-[960px]:mt-9 min-[960px]:mb-10 min-[960px]:flex-row min-[960px]:items-center min-[960px]:gap-12 [@media(min-width:960px)_and_(max-height:850px)]:mt-6 [@media(min-width:960px)_and_(max-height:850px)]:mb-7 [@media(min-width:960px)_and_(max-height:850px)]:pt-5"
              data-hero-reveal
            >
              <p className="max-w-[520px] text-sm leading-[1.8] text-muted md:text-base min-[960px]:max-w-[470px]">
                Over 20 years of experience in road construction, earthworks, infrastructure development and site preparation.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 min-[960px]:shrink-0">
                <NavigationAction
                  destination="Projects"
                  className="inline-flex min-h-13 items-center justify-center gap-6 rounded-[2px] border border-primary bg-primary px-6 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#193b32] [&>svg]:size-[18px] [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:translate-x-0.5"
                >
                  Explore Our Projects <ArrowUpRight aria-hidden="true" />
                </NavigationAction>
                <NavigationAction
                  destination="Contact"
                  className="inline-flex min-h-13 items-center justify-center gap-6 px-1 text-sm font-medium text-primary underline decoration-accent decoration-2 underline-offset-8 transition-colors duration-200 hover:decoration-primary [&>svg]:size-[18px] [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:translate-x-0.5"
                >
                  Get in Touch <ArrowRight aria-hidden="true" />
                </NavigationAction>
              </div>
            </div>
          </div>
        </Container>
        <figure className="relative m-0">
          <div className="hero-photo relative isolate h-[400px] overflow-hidden bg-secondary md:h-[480px] min-[960px]:h-[clamp(380px,48svh,580px)] after:pointer-events-none after:absolute after:inset-0 after:bg-linear-to-t after:from-primary/95 after:via-primary/10 after:to-transparent after:content-['']">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              preload
              quality={90}
              sizes="100vw"
              className="object-cover object-[32%_35%]"
            />
            <div className="pointer-events-none absolute top-8 right-8 z-10 h-5 w-5 border-t border-r border-accent" aria-hidden="true" />
            <Container className="photo-caption-container absolute inset-x-0 bottom-7 z-10 flex items-end justify-between gap-6 md:bottom-10">
              <div className="photo-title min-w-0 border-l border-accent pl-5 text-white">
                <span className="photo-label mb-4 block text-[10px] font-medium tracking-[0.13em] uppercase md:text-xs">
                  Earthwork &amp; site preparation
                </span>
                <span className="block font-heading text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.1] font-medium tracking-[-0.035em]">
                  Progress starts<br />at ground level.
                </span>
              </div>
              <p className="photo-scope hidden text-right text-xs leading-6 text-white md:block">
                Machinery. Labour.<br />Site management. Execution.
              </p>
            </Container>
          </div>
          <Container className="flex flex-col justify-between gap-1 pt-4 text-[10px] leading-5 text-muted sm:flex-row sm:gap-4 sm:text-xs">
            <span>Representative imagery &middot; Not a SAS project site</span>
            <a
              href={heroImage.source}
              className="inline-flex w-fit items-center gap-1 underline decoration-primary/30 underline-offset-4 hover:text-primary"
            >
              Photography: {heroImage.photographer} / Unsplash <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </Container>
        </figure>
      </section>
    </HeroMotion>
  );
}
