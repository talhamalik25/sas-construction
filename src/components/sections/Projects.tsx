"use client";

import { CTA } from "@/components/ui/CTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectMedia } from "@/components/sections/ProjectMedia";
import { ChevronDown, MapPin, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  projectsData,
  projectCategories,
  type ProjectCategory,
  type ProjectRecord,
} from "@/data/projects";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedProject) {
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog && dialog.open) {
        dialog.close();
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedProject]);

  const filteredProjects = activeCategory === "all" ? projectsData : projectsData.filter(p => p.categoryKey === activeCategory);
  const featuredProjects = filteredProjects.filter(p => p.featured);
  const remainingProjects = filteredProjects.filter(p => !p.featured);
  const toggleRow = (id: string) => setExpandedRowId(previous => previous === id ? null : id);

  return (
    <section id="projects" className="bg-background py-20 md:py-28" aria-labelledby="projects-heading">
      <Container>
        <ScrollReveal>
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-16">
            <SectionHeading eyebrow="03 / Selected experience" title="The work on the ground." id="projects-heading" />
            <p data-scroll-reveal className="max-w-md text-sm leading-7 text-muted">Roads, earthworks and infrastructure. Explore nine project scopes shared by SAS Construction, with client-approved site photography.</p>
          </div>
          <div data-scroll-reveal role="group" aria-label="Filter projects by category" className="mt-9 flex flex-wrap gap-x-5 gap-y-1 border-y border-primary/20 py-3 md:mt-12">
            {projectCategories.map((cat) => (
              <button key={cat.key} type="button" aria-pressed={activeCategory === cat.key} onClick={() => { setActiveCategory(cat.key); setExpandedRowId(null); }} className="min-h-11 border-b-2 border-transparent px-1 text-xs font-medium text-muted transition-colors hover:text-primary aria-pressed:border-primary aria-pressed:text-primary">
                {cat.label}<span className="ml-2 font-mono text-[10px]">{cat.key === "all" ? projectsData.length : projectsData.filter(p => p.categoryKey === cat.key).length}</span>
              </button>
            ))}
          </div>
          <p role="status" className="sr-only">Showing {filteredProjects.length} project records.</p>
          {featuredProjects.length > 0 && (
            <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
              {featuredProjects.map((project, i) => (
                <article key={project.id} data-scroll-reveal className={i === 0 ? "md:col-span-2" : ""}>
                  <div className={i === 0 ? "grid gap-6 lg:grid-cols-[1.65fr_1fr] lg:items-center lg:gap-12" : ""}>
                    <ProjectMedia key={project.id} project={project} sizes={i === 0 ? "(min-width: 1024px) 740px, 100vw" : "(min-width: 768px) 600px, 100vw"} />
                    <div className={i === 0 ? "" : "mt-5"}>
                      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted">{project.numeral} / {project.category}</p>
                      <h3 className={i === 0 ? "font-heading text-section font-semibold text-primary" : "font-heading text-title font-semibold text-primary"}>{project.title}</h3>
                      <p className="mt-3 text-base leading-7 text-foreground">{project.scopeSupplied}</p>
                      <p className="mt-3 flex items-start gap-2 text-xs leading-6 text-muted"><MapPin size={14} className="mt-1 shrink-0" aria-hidden="true" />{project.location}{!project.locationConfirmed && !project.location.includes("pending") ? " · to be confirmed" : ""}</p>
                      <CTA type="button" variant="link" onClick={() => setSelectedProject(project)} className="mt-5 px-0">View Project Details</CTA>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          {remainingProjects.length > 0 && (
            <div className="mt-14 md:mt-18">
              <h3 className="mb-6 font-heading text-title font-semibold text-primary">More project experience</h3>
              <div className="border-t border-primary/20">
                {remainingProjects.map((project) => {
                  const isExpanded = expandedRowId === project.id;
                  return (
                    <div key={project.id} className="border-b border-primary/20">
                      <button type="button" aria-expanded={isExpanded} aria-controls={isExpanded ? `project-row-panel-${project.id}` : undefined} onClick={() => toggleRow(project.id)} className="group grid w-full grid-cols-[24px_1fr_32px] items-center gap-4 py-6 text-left transition-colors hover:bg-secondary/40 sm:grid-cols-[36px_1fr_1fr_32px] sm:gap-6">
                        <span className="font-mono text-xs text-muted">{project.numeral}</span>
                        <span className="font-heading text-lg font-semibold tracking-tight text-primary sm:text-xl">{project.title}<span className="mt-2 block font-sans text-xs font-normal leading-5 tracking-normal text-muted sm:hidden">{project.scopeSupplied}</span></span>
                        <span className="hidden text-sm leading-6 text-muted sm:block">{project.scopeSupplied}</span>
                        <ChevronDown aria-hidden="true" size={20} className={`transition-transform motion-reduce:transition-none ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                      {isExpanded && (
                        <div id={`project-row-panel-${project.id}`} className="grid gap-6 pb-8 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-10">
                          <ProjectMedia key={project.id} project={project} sizes="(min-width: 768px) 480px, 100vw" />
                          <div>
                            <p className="text-sm leading-7 text-muted">{project.description}</p>
                            <p className="mt-3 text-xs leading-6 text-muted">{project.location}{!project.locationConfirmed && !project.location.includes("pending") ? " · to be confirmed" : ""}</p>
                            <CTA type="button" variant="link" onClick={() => setSelectedProject(project)} className="mt-4 px-0">View Project Details</CTA>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <p className="mt-8 max-w-3xl text-xs leading-6 text-muted">Project titles and scopes supplied by SAS Construction. NLC and FWO are project reference labels. The separately credited M9 location photograph does not document SAS execution.</p>
        </ScrollReveal>
      </Container>
      {/* Accessible Project Details Modal Dialog */}
      <dialog
        ref={dialogRef}
        onCancel={() => setSelectedProject(null)}
        onClose={() => setSelectedProject(null)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex="0"]'
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        aria-labelledby={selectedProject ? "modal-project-title" : undefined}
        aria-describedby={selectedProject ? "modal-project-desc" : undefined}
        className="fixed inset-0 z-50 m-auto w-[calc(100%-32px)] max-w-2xl max-h-[90vh] overflow-y-auto border border-primary/20 bg-background p-6 md:p-8 text-foreground shadow-2xl backdrop:bg-foreground/50 rounded-[2px]"
      >
        {selectedProject && (
          <>
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-primary/15">
              <div>
                <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
                  Project № {selectedProject.numeral} &middot; {selectedProject.category}
                </span>
                <h3
                  id="modal-project-title"
                  className="font-heading text-2xl md:text-3xl font-semibold text-primary mt-1"
                >
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="flex size-11 shrink-0 items-center justify-center rounded-[2px] border border-primary/20 text-muted hover:text-primary hover:border-primary transition-colors cursor-pointer"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              {/* Modal Image */}
              <div className="relative w-full min-w-0 overflow-hidden rounded-[2px] bg-foreground border border-primary/15">
                <ProjectMedia
                  key={selectedProject.id}
                  project={selectedProject}
                  mode="dialog"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>

              {/* Scope & Description */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <span className="font-semibold text-primary">Location:</span>
                  <span className="text-muted flex items-center gap-1">
                    <MapPin size={12} className="text-primary" aria-hidden="true" />
                    {selectedProject.location}
                  </span>
                  <span className="font-semibold text-primary ml-auto">Scope:</span>
                  <span className="text-muted font-mono">{selectedProject.scopeSupplied}</span>
                </div>

                <p id="modal-project-desc" className="text-sm leading-[1.85] text-muted">
                  {selectedProject.description}
                </p>

                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary block mb-2">
                    Client-supplied Scopes:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground">
                    {selectedProject.scopes.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 bg-secondary/50 border border-primary/10 p-2.5 rounded-[2px]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-primary/15 flex flex-wrap items-center justify-between gap-4 text-xs leading-6 text-muted">
              <span className="font-mono">
                {selectedProject.clientNote ?? "Scope documented in client working register."}
              </span>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="inline-flex min-h-11 items-center px-4 py-2 border border-primary/20 rounded-[2px] text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
