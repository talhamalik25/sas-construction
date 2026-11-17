import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const capabilities = [
  { title: "Machinery coordination", detail: "Organising equipment around the work required on site." },
  { title: "Workforce management", detail: "Coordinating people and day-to-day site activities." },
  { title: "Hands-on execution", detail: "Direct contractor involvement from preparation through the agreed scope." },
];

export function AboutExperience() {
  return (
    <section id="about-experience" aria-labelledby="experience-heading" className="py-20 md:py-28">
      <Container>
        <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="01 / About SAS" title="Practical experience. Personal involvement." id="experience-heading" />
              <p data-scroll-reveal className="mt-6 max-w-xl text-base leading-8 text-muted">
                SAS Construction is an independent contractor with over two decades in the field. We coordinate the machinery, workforce and everyday decisions behind roadwork, earthworks and site development.
              </p>
              <div data-scroll-reveal className="mt-9 flex items-center gap-6 border-y border-primary/20 py-6">
                <span className="font-heading text-[clamp(8rem,12vw,8rem)] font-medium leading-none tracking-[-0.06em] text-primary">20<span className="text-[0.65em]">+</span></span>
                <p className="max-w-40 text-sm leading-6 text-muted">Years of practical<br /><span className="font-medium text-primary">construction experience</span></p>
              </div>
              <dl className="mt-7 divide-y divide-primary/10">
                {capabilities.map((item, i) => (
                  <div key={item.title} data-scroll-reveal className="grid grid-cols-[24px_1fr] gap-4 py-4 sm:grid-cols-[24px_180px_1fr]">
                    <span aria-hidden="true" className="pt-1 font-mono text-[11px] text-muted">0{i + 1}</span>
                    <dt className="font-heading text-base font-semibold text-primary">{item.title}</dt>
                    <dd className="col-start-2 text-sm leading-6 text-muted sm:col-start-auto">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure data-scroll-reveal className="lg:col-span-5 lg:pt-16">
              <div className="relative aspect-[4/5] max-h-[570px] overflow-hidden bg-secondary">
                <Image src="/images/representative-earthworks.webp" alt="Excavator bucket and tracked machinery on an earthmoving site" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover object-[center_65%]" />
              </div>
              <figcaption className="mt-3 text-[11px] leading-5 text-muted">
                <p>Representative imagery · Not a SAS project site</p>
                <a href="https://unsplash.com/photos/a-yellow-excavator-digging-in-dirt-at-a-construction-site-jPsmNCgLghU" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center underline underline-offset-4 hover:text-primary"></a>
              </figcaption>
            </figure>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
