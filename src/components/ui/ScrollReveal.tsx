"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Scoped, progressive enhancement: content remains readable without animation. */
export function ScrollReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        root.current?.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 18,
            duration: 0.45,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
