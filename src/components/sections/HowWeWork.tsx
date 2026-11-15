"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { workStages } from "@/data/approach";

export function HowWeWork() {
  const timeline = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from("[data-progress-line]", {
          scaleY: 0, transformOrigin: "top", ease: "none",
          scrollTrigger: { trigger: timeline.current, start: "top 75%", end: "bottom 65%", scrub: 0.3 },
        });
      }, timeline);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section id="how-we-work" aria-labelledby="approach-heading" className="border-t border-primary/15 bg-secondary py-20 md:py-28 lg:py-32">
      <Container>
        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Our approach" title="From Groundwork to Execution." id="approach-heading" />
              <p className="mt-6 max-w-lg text-sm leading-[1.85] text-muted md:text-base" data-scroll-reveal>Every construction project begins with understanding the work on the ground. SAS Construction takes a hands-on approach to coordinating machinery, workforce and site activities throughout project execution.</p>
              <p className="mt-8 border-t border-primary/20 pt-4 text-xs leading-6 text-muted">A proposed working approach, adapted to the agreed scope of each assignment.</p>
            </div>
            <div ref={timeline} className="relative lg:col-span-7">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-primary/20"><span data-progress-line className="block h-full w-px bg-primary" /></span>
              <ol>
              {workStages.map((stage, i) => (
                <li key={stage.title} className="relative grid grid-cols-[3rem_1fr] gap-4 border-b border-primary/20 py-7 pl-6 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[4rem_1fr] md:gap-6 md:pl-9" data-scroll-reveal>
                  <span aria-hidden="true" className={`absolute ${i === 0 ? "top-2" : "top-9"} -left-1 size-2 bg-primary ring-4 ring-secondary`} />
                  <span className="font-heading text-4xl font-medium tracking-[-0.06em] text-primary md:text-5xl" aria-hidden="true">0{i + 1}</span>
                  <div><h3 className="font-heading text-xl font-semibold tracking-tight text-primary md:text-2xl">{stage.title}</h3><p className="mt-3 max-w-md text-sm leading-[1.85] text-muted">{stage.description}</p></div>
                </li>
              ))}
              </ol>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
