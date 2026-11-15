import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contractorStrengths } from "@/data/approach";

export function WhyChooseUs() {
  return (
    <section id="why-sas" aria-labelledby="why-heading" className="bg-background py-20 md:py-28 lg:py-32">
      <Container><ScrollReveal>
        <div className="max-w-3xl"><SectionHeading eyebrow="The SAS approach" title="Experience You Can Build On." id="why-heading" /></div>
        <div className="mt-12 border-t border-primary/30 md:mt-16">
          {contractorStrengths.map((item, i) => (
            <div key={item.title} className="grid gap-4 border-b border-primary/20 py-7 md:grid-cols-12 md:gap-8 md:py-9" data-scroll-reveal>
              <span className="flex items-center gap-3 font-mono text-xs text-muted md:col-span-1" aria-hidden="true"><span className="size-2 border border-primary" />0{i + 1}</span>
              <h3 className="font-heading text-2xl font-medium leading-tight tracking-[-0.035em] text-primary md:col-span-6 lg:text-3xl">{item.title}</h3>
              <p className="max-w-md text-sm leading-[1.85] text-muted md:col-span-5 md:self-center">{item.description}</p>
            </div>
          ))}
        </div>
      </ScrollReveal></Container>
    </section>
  );
}
