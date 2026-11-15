export function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div data-scroll-reveal>
      <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary md:text-[11px]">
        <span className="h-px w-8 shrink-0 bg-accent" aria-hidden="true" />{eyebrow}
      </p>
      <h2 id={id} className="font-heading text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.045em]">{title}</h2>
    </div>
  );
}
