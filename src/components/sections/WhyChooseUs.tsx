import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contractorStrengths } from "@/data/approach";

export function WhyChooseUs() {
  return (
    <section id="why-sas" aria-labelledby="why-heading" className="border-t border-primary/15 bg-background py-20 md:py-28">
      <Container>
        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="05 / Why SAS" title="Close to the work. Accountable on site." id="why-heading" />
              <p data-scroll-reveal className="mt-6 text-sm leading-7 text-muted">Practical knowledge and direct involvement in the people, machinery and decisions that move a project forward.</p>
            </div>
            <div className="lg:col-span-8">
              {contractorStrengths.map((item,i) => (
                <article key={item.title} data-scroll-reveal className="grid grid-cols-[28px_1fr] gap-5 border-t border-primary/20 py-7 first:pt-5 sm:grid-cols-[28px_1fr_1fr] sm:gap-7">
                  <span aria-hidden="true" className="pt-1 font-mono text-xs text-muted">0{i+1}</span>
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-primary">{item.title}</h3>
                  <p className="col-start-2 text-sm leading-7 text-muted sm:col-start-auto">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
