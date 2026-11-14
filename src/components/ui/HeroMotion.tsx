"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from("[data-hero-reveal]", {
          y: 18,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          clearProps: "transform",
        });
        gsap.from(".hero-photo img", {
          scale: 1.035,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".hero-photo",
            start: "top 95%",
            once: true,
          },
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
