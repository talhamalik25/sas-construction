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
          scaleY: 0,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: timeline.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.3,
          },
        });
      }, timeline);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section
      id="how-we-work"
      aria-labelledby="approach-heading"
      className="border-t border-primary/15 bg-secondary py-20 md:py-28"
    >
      <Container>
        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20 items-start">
            {/* Left Column — Section Lead */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="04 / How we work"
                title="A clear path from brief to site."
                id="approach-heading"
              />
              <p
                className="mt-6 max-w-lg text-sm leading-[1.85] text-muted md:text-base"
                data-scroll-reveal
              >
                A practical approach to understanding your site, organising the work and coordinating execution. Each assignment starts with an agreed scope.
              </p>

              <div
                className="mt-8 border-t border-primary/20 pt-5 space-y-2 text-xs text-muted"
                data-scroll-reveal
              >
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span className="font-mono text-primary font-medium">Adaptive Workflow:</span>
                </div>
                <p className="leading-relaxed">
                  Tailored to the agreed contractual scope, terrain characteristics, and client project schedules.
                </p>
              </div>
            </div>

            {/* Right Column — Process Timeline */}
            <div ref={timeline} className="relative lg:col-span-7">
              {/* Vertical Progress Line */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px bg-primary/20"
              >
                <span
                  data-progress-line
                  className="block h-full w-px bg-primary"
                />
              </span>

              <ol className="space-y-0">
                {workStages.map((stage, i) => (
                  <li
                    key={stage.title}
                    className="relative grid grid-cols-[2rem_1fr] md:grid-cols-[3.5rem_1fr] gap-4 md:gap-6 border-b border-primary/20 py-8 pl-5 md:pl-8 first:pt-0 last:border-0 last:pb-0"
                    data-scroll-reveal
                  >
                    {/* Timeline Node Point */}
                    <span
                      aria-hidden="true"
                      className={`absolute ${
                        i === 0 ? "top-2" : "top-10"
                      } -left-1 size-2 rounded-full bg-primary ring-4 ring-secondary`}
                    />

                    {/* Step Numeral */}
                    <div className="flex flex-col">
                      <span
                        className="font-mono text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1"
                        aria-hidden="true"
                      >
                        Step
                      </span>
                      <span
                        className="font-heading text-3xl md:text-4xl font-medium tracking-tight text-primary select-none"
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-primary">
                        {stage.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-[1.8] text-muted">
                        {stage.description}
                      </p>
                    </div>
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
