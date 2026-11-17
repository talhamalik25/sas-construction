"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { servicesData } from "@/data/services";

export function Services() {
  const [activeId, setActiveId] = useState<string>(servicesData[0].id);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(servicesData[0].id);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const prevActiveRef = useRef<string>(activeId);

  const activeService = servicesData.find((s) => s.id === activeId) ?? servicesData[0];

  // Subtle GSAP transition when active service changes on desktop
  useEffect(() => {
    if (prevActiveRef.current === activeId) return;
    prevActiveRef.current = activeId;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!showcaseRef.current) return;
      gsap.fromTo(
        showcaseRef.current.querySelectorAll("[data-showcase-anim]"),
        { opacity: 0.5, y: 6 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power2.out" }
      );
    });

    return () => media.revert();
  }, [activeId]);

  // Keyboard navigation for desktop tablist
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % servicesData.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + servicesData.length) % servicesData.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = servicesData.length - 1;
    } else {
      return;
    }
    const nextService = servicesData[nextIndex];
    setActiveId(nextService.id);
    const nextButton = document.getElementById(`service-tab-${nextService.id}`);
    nextButton?.focus();
  };

  const toggleMobileAccordion = (id: string) => {
    setMobileExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="bg-secondary/45 py-20 md:py-28 border-t border-primary/15"
      aria-labelledby="services-heading"
    >
      <Container>
        <ScrollReveal>
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-16">
            <SectionHeading eyebrow="02 / What we do" title="From site preparation to the road ahead." id="services-heading" />
            <p data-scroll-reveal className="max-w-md text-sm leading-7 text-muted">Six areas of construction expertise, coordinated directly around your site and scope of work.</p>
          </div>

          {/* DESKTOP LAYOUT (>= 1024px): Interactive Editorial Index + Dynamic Showcase */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-10 xl:gap-14 items-start mt-14 lg:mt-18 pt-10 border-t border-primary/15">
            {/* Left Column — Editorial Services Index */}
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Construction services index"
              className="lg:col-span-6 xl:col-span-6 flex flex-col divide-y divide-primary/15"
              data-scroll-reveal
            >
              {servicesData.map((service, index) => {
                const isActive = activeId === service.id;
                return (
                  <button
                    key={service.id}
                    id={`service-tab-${service.id}`}
                    role="tab"
                    type="button"
                    tabIndex={isActive ? 0 : -1}
                    aria-selected={isActive}
                    aria-controls="service-panel"
                    onClick={() => setActiveId(service.id)}
                    
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`group relative flex items-center justify-between text-left py-7 px-4 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary cursor-pointer border-l-2 ${
                      isActive
                        ? "bg-background border-primary"
                        : "border-transparent hover:bg-background/60"
                    }`}
                  >
                    <div className="flex items-baseline gap-5 xl:gap-6 min-w-0 pr-4">
                      {/* Numeral */}
                      <span
                        className={`font-mono text-sm xl:text-base font-semibold tracking-wider transition-colors duration-200 shrink-0 ${
                          isActive ? "text-primary font-bold" : "text-muted group-hover:text-primary"
                        }`}
                      >
                        {service.numeral}
                      </span>
                      {/* Title */}
                      <span
                        className={`font-heading text-xl xl:text-2xl font-semibold tracking-tight transition-colors duration-200 ${
                          isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>

                    {/* Active Accent Bar & Directional Arrow */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`h-0.5 bg-accent transition-all duration-200 ${
                          isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                        }`}
                        aria-hidden="true"
                      />
                      <ArrowUpRight
                        size={18}
                        className={`transition-all duration-200 ${
                          isActive
                            ? "text-primary translate-x-0.5 -translate-y-0.5"
                            : "text-muted group-hover:text-primary group-hover:translate-x-0.5"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column — Dynamic Visual Showcase */}
            <div
              className="lg:col-span-6 xl:col-span-6 sticky top-28"
              data-scroll-reveal
            >
              <div
                ref={showcaseRef}
                role="tabpanel"
                id="service-panel"
                tabIndex={0}
                aria-labelledby={`service-tab-${activeService.id}`}
                className="bg-background overflow-hidden relative"
              >
                {/* Visual Imagery Frame */}
                <div
                  data-showcase-anim
                  className="relative aspect-[16/10] overflow-hidden bg-secondary"
                >
                  <Image
                    src={activeService.image.src}
                    alt={activeService.image.alt}
                    fill
                    sizes="(min-width: 1280px) 580px, (min-width: 1024px) 480px, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {/* Subtle architectural vignette overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/85 via-primary/15 to-transparent"
                    aria-hidden="true"
                  />
                  {/* Top-right corner registration mark */}
                  <div
                    className="pointer-events-none absolute top-5 right-5 z-10 h-5 w-5 border-t border-r border-accent"
                    aria-hidden="true"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute bottom-4 left-5 z-10 flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-semibold tracking-[0.16em] text-white bg-primary/95 px-3 py-1 rounded-[2px] backdrop-blur-xs border border-white/10">
                      Discipline {activeService.numeral}
                    </span>
                  </div>
                </div>

                {/* Service Detail Content */}
                <div className="p-7 xl:p-8">
                  <h3
                    data-showcase-anim
                    className="font-heading text-xl xl:text-2xl font-semibold text-primary tracking-tight"
                  >
                    {activeService.title}
                  </h3>
                  <p
                    data-showcase-anim
                    className="mt-3 text-sm xl:text-[15px] leading-[1.8] text-muted"
                  >
                    {activeService.description}
                  </p>

                  {/* Scope Tags */}
                  <div
                    data-showcase-anim
                    className="mt-6 pt-5 border-t border-primary/15 flex flex-wrap gap-2"
                  >
                    {activeService.scopes.map((scope) => (
                      <span
                        key={scope}
                        className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-secondary/70 border border-primary/10 px-3 py-1.5 rounded-[2px]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        <span>{scope}</span>
                      </span>
                    ))}
                  </div>

                  {/* Footer Context / Provenance */}
                  <div
                    data-showcase-anim
                    className="mt-6 pt-4 border-t border-primary/10 flex items-center justify-between text-[11px] text-muted"
                  >
                    <span>Representative construction imagery</span>
                    <span className="font-mono font-medium text-primary">
                      {activeService.numeral} / 06
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE & TABLET LAYOUT (< 1024px): Accessible Accordion */}
          <div className="lg:hidden mt-10 divide-y divide-primary/15 border-y border-primary/15">
            {servicesData.map((service) => {
              const isOpen = mobileExpandedId === service.id;
              return (
                <div key={service.id} className="overflow-hidden">
                  <button
                    type="button"
                    id={`accordion-btn-${service.id}`}
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? `accordion-panel-${service.id}` : undefined}
                    onClick={() => toggleMobileAccordion(service.id)}
                    className="w-full flex items-center justify-between text-left py-5 px-1 min-h-14 rounded-[2px] group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 min-w-0 pr-3">
                      <span
                        className={`font-mono text-xs font-semibold tracking-wider transition-colors duration-200 ${
                          isOpen ? "text-primary font-bold" : "text-muted group-hover:text-primary"
                        }`}
                      >
                        {service.numeral}
                      </span>
                      <span
                        className={`font-heading text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-200 ${
                          isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>
                    <span
                      className={`size-8 rounded-[2px] flex items-center justify-center shrink-0 border border-primary/20 transition-all duration-200 ${
                        isOpen ? "bg-primary text-white rotate-180" : "bg-background text-muted"
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {/* Expanded Accordion Panel */}
                  {isOpen && (
                    <div
                      id={`accordion-panel-${service.id}`}
                      role="region"
                      aria-labelledby={`accordion-btn-${service.id}`}
                      className="pb-6 pt-1 px-1 space-y-4"
                    >
                      <p className="text-sm leading-[1.8] text-muted">
                        {service.description}
                      </p>

                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary rounded-[2px] border border-primary/15">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          sizes="(max-width: 1023px) 100vw, 600px"
                          className="object-cover object-center"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent"
                          aria-hidden="true"
                        />
                        <div
                          className="pointer-events-none absolute top-3 right-3 z-10 h-4 w-4 border-t border-r border-accent"
                          aria-hidden="true"
                        />
                        <span className="absolute bottom-3 left-3 z-10 text-[9px] uppercase font-mono font-semibold tracking-[0.14em] text-white bg-primary/95 px-2.5 py-0.5 rounded-[2px]">
                          Discipline {service.numeral}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {service.scopes.map((scope) => (
                          <span
                            key={scope}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-secondary/70 border border-primary/10 px-2.5 py-1 rounded-[2px]"
                          >
                            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                            <span>{scope}</span>
                          </span>
                        ))}
                      </div>

                      <div className="text-[10px] text-muted pt-2 border-t border-primary/10">
                        <span>Representative construction imagery</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
