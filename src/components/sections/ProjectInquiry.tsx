
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTA } from "@/components/ui/CTA";

export function ProjectInquiry() {
  return (
    <section id="project-inquiry" aria-labelledby="inquiry-heading" className="relative isolate overflow-hidden bg-primary py-20 text-background md:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[12%] -z-10 w-[28%] skew-x-[-20deg] border-x border-background/10"><div className="absolute inset-y-0 left-1/2 border-l border-background/10" /></div>
      <Container><ScrollReveal>
        <p className="mb-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-accent" data-scroll-reveal><span aria-hidden="true" className="h-px w-8 bg-accent" />Your next project</p>
        <h2 id="inquiry-heading" className="max-w-5xl font-heading text-[clamp(2.4rem,5.8vw,5.2rem)] font-medium leading-[1.08] tracking-[-0.05em]" data-scroll-reveal>Have a Project in Mind?<br /><span className="text-accent">Let&apos;s Discuss the Groundwork.</span></h2>
        <div className="mt-10 flex flex-col justify-between gap-8 border-t border-background/25 pt-8 md:flex-row md:items-center md:gap-16" data-scroll-reveal>
          <p className="max-w-lg text-sm leading-[1.85] md:text-base">Planning road development, earthwork or site preparation? Share your project requirements with SAS Construction.</p>
          <CTA destination="Contact" variant="dark">Discuss Your Project</CTA>
        </div>
      </ScrollReveal></Container>
    </section>
  );
}
