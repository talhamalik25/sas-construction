export function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div data-scroll-reveal>
      <p className="mb-5 flex items-center gap-3 text-eyebrow font-semibold uppercase text-primary">
        <span className="h-px w-8 shrink-0 bg-accent" aria-hidden="true" />{eyebrow}
      </p>
      <h2 id={id} className="font-heading text-section font-semibold">{title}</h2>
    </div>
  );
}
