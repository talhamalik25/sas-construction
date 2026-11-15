import Image from "next/image";
import type { ProjectRecord } from "@/data/projects";

export function ProjectMedia({ project, sizes }: { project: ProjectRecord; sizes: string }) {
  const photo = project.image;

  if (!photo) {
    return (
      <div
        className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden bg-secondary/80 p-6 sm:p-8 text-primary border border-primary/10 select-none"
        data-project-panel={project.id}
      >
        {/* Architectural grid background styling */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(#254e43_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden="true"
        />

        {/* Four corner architectural crosshair marks */}
        <span className="pointer-events-none absolute top-3 left-3 font-mono text-[10px] text-primary/40" aria-hidden="true">+</span>
        <span className="pointer-events-none absolute top-3 right-3 font-mono text-[10px] text-primary/40" aria-hidden="true">+</span>
        <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] text-primary/40" aria-hidden="true">+</span>
        <span className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] text-primary/40" aria-hidden="true">+</span>

        {/* Header Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-primary/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-primary/90">
              Field Record № {project.numeral}
            </span>
          </div>
          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-[2px] bg-primary/10 text-primary">
            {project.category}
          </span>
        </div>

        {/* Center Technical Scope Display */}
        <div className="relative z-10 py-5">
          <span className="mb-3 block h-0.5 w-8 bg-accent" aria-hidden="true" />
          <p className="font-heading text-xl sm:text-2xl font-semibold leading-tight tracking-tight text-primary">
            {project.scopeSupplied}
          </p>
          <p className="mt-2 text-xs font-mono text-muted tracking-wide">
            {project.location}
          </p>
        </div>

        {/* Footer Technical Stamp */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-primary/15 pt-3 text-[10px] font-mono text-muted">
          <span>SAS Construction Register</span>
          <span className="text-primary/70">Verified Scope &middot; Photography Pending</span>
        </div>
      </div>
    );
  }

  return (
    <figure className="relative flex h-full flex-col bg-secondary" data-project-photo={project.id}>
      <div className="relative min-h-[220px] flex-1 bg-secondary overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
        />
        {/* Architectural corner registration mark */}
        <div
          className="pointer-events-none absolute top-3 right-3 z-10 h-4 w-4 border-t border-r border-accent"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/70 via-transparent to-transparent" aria-hidden="true" />
      </div>

      {/* Mandatory Credit and Attribution Footer */}
      <figcaption className="shrink-0 border-t border-primary/15 bg-surface px-4 py-3 text-[11px] leading-relaxed text-muted">
        <p className="font-semibold text-primary">
          {photo.classification === "B"
            ? "Location reference — not evidence of SAS execution"
            : "Verified SAS project photograph"}
        </p>
        <p className="line-clamp-2">{photo.caption}</p>
        <p className="mt-1 text-[10px] text-muted">
          <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">
            Photo: {photo.author}
          </a>
          {" · "}
          <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">
            {photo.license}
          </a>
          {" · "}
          {photo.changes}
        </p>
      </figcaption>
    </figure>
  );
}
