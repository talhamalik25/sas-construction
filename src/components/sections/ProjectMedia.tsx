import Image from "next/image";
import type { ProjectRecord } from "@/data/projects";

export function ProjectMedia({ project, sizes }: { project: ProjectRecord; sizes: string }) {
  const photo = project.image;

  if (!photo) {
    return (
      <div className="flex h-full min-h-48 flex-col justify-between bg-secondary p-5 text-primary md:p-8" data-project-panel={project.id}>
        <div className="flex items-center justify-between border-b border-primary/20 pb-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">Project record</span>
          <span className="font-mono text-sm">{project.numeral}</span>
        </div>
        <div className="py-5">
          <span className="mb-4 block h-px w-10 bg-accent" aria-hidden="true" />
          <p className="font-heading text-xl font-semibold leading-snug tracking-tight md:text-2xl">{project.scopeSupplied}</p>
        </div>
        <p className="text-[11px] leading-relaxed text-muted">Site photography pending verification and permission.</p>
      </div>
    );
  }

  return (
    <figure className="flex h-full flex-col bg-secondary" data-project-photo={project.id}>
      <div className="relative min-h-0 flex-1">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-contain" />
      </div>
      <figcaption className="shrink-0 border-t border-primary/15 bg-surface px-4 py-3 text-[11px] leading-relaxed text-muted">
        <p className="font-semibold text-primary">{photo.classification === "B" ? "Location reference — not evidence of SAS execution" : "Verified SAS project photograph"}</p>
        <p>{photo.caption}</p>
        <p>
          <a href={photo.sourceUrl} className="underline underline-offset-2">Photo: {photo.author}</a>
          {" · "}<a href={photo.licenseUrl} className="underline underline-offset-2">{photo.license}</a>
          {" · "}{photo.changes}
        </p>
      </figcaption>
    </figure>
  );
}
