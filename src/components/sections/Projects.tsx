"use client";

import { ProjectMedia } from "@/components/sections/ProjectMedia";
import { ArrowUpRight, ChevronDown, MapPin, X } from "lucide-react";
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
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  // Filter projects by category
  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.categoryKey === activeCategory);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const remainingProjects = filteredProjects.filter((p) => !p.featured);

  const toggleRow = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      className="bg-background py-20 md:py-28 lg:py-32 border-t border-primary/15"
      aria-labelledby="projects-heading"
    >
      <Container>
        <ScrollReveal>
          {/* Section Header */}
          <div className="max-w-[800px]">
            <div
              className="mb-6 flex items-center gap-3 text-[10px] font-semibold tracking-[0.14em] text-primary uppercase md:text-[11px]"
              data-scroll-reveal
            >
              <span className="h-px w-8 shrink-0 bg-accent" aria-hidden="true" />
              <span>Project Register &middot; Field Scopes</span>
            </div>
            <h2
              id="projects-heading"
              className="font-heading text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.12] font-semibold tracking-[-0.045em] text-foreground"
              data-scroll-reveal
            >
              Built Through Experience. Proven on the Ground.
            </h2>
            <p
              className="mt-5 max-w-[660px] text-sm leading-[1.85] text-muted md:text-base"
              data-scroll-reveal
            >
              Documented construction assignments and field scopes executed across Sindh. All details reflect supplied contractor records.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div
            className="mt-10 md:mt-12 flex flex-wrap items-center gap-2 md:gap-3"
            data-scroll-reveal
            role="group"
            aria-label="Filter projects by category"
          >
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count =
                cat.key === "all"
                  ? projectsData.length
                  : projectsData.filter((p) => p.categoryKey === cat.key).length;

              return (
                <button
                  key={cat.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex min-h-11 items-center gap-2.5 px-4 py-2.5 rounded-[2px] text-xs md:text-sm font-medium transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-surface text-muted border-primary/20 hover:border-primary hover:text-primary"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] ${
                      isActive ? "bg-white/20 text-white font-semibold" : "bg-secondary text-primary font-medium"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <p role="status" className="sr-only">
            Showing {filteredProjects.length} project records.
          </p>

          {/* FEATURED PROJECTS SHOWCASE */}
          {featuredProjects.length > 0 && (
            <div className="mt-12 md:mt-16 space-y-10 md:space-y-12">
              {/* Lead Featured Project (Project 01 - NLC Orangi) */}
              {featuredProjects.slice(0, 1).map((project) => (
                <article
                  key={project.id}
                  className="border border-primary/15 bg-surface overflow-hidden rounded-[2px] shadow-xs"
                  data-scroll-reveal
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Media Column */}
                    <div className="lg:col-span-7 relative w-full min-w-0 bg-secondary overflow-hidden">
                      <ProjectMedia project={project} sizes="(min-width: 1024px) 60vw, 100vw" />
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-5 p-7 lg:p-9 xl:p-10 flex flex-col justify-between">
                      <div>
                        {/* Meta Category & Location */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted mb-3">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-primary uppercase tracking-wider">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                            Project {project.numeral} &middot; {project.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-muted text-xs">
                            <MapPin size={13} className="text-primary shrink-0" aria-hidden="true" />
                            {project.location}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-primary tracking-tight">
                          {project.title}
                        </h3>
                        <p className="mt-1 font-mono font-medium text-xs sm:text-sm text-foreground">
                          Scope: {project.scopeSupplied}
                        </p>

                        <p className="mt-4 text-sm leading-[1.8] text-muted">
                          {project.description}
                        </p>

                        {/* Scope Bullets */}
                        <div className="mt-6 pt-5 border-t border-primary/10">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-muted block mb-3">
                            Documented Scope
                          </span>
                          <ul className="space-y-2 text-xs font-medium text-foreground">
                            {project.scopes.map((scope) => (
                              <li key={scope} className="flex items-center gap-2">
                                <span className="h-1 w-3 bg-accent shrink-0" aria-hidden="true" />
                                <span>{scope}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Footer / Action */}
                      <div className="mt-8 pt-6 border-t border-primary/10 flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex min-h-11 items-center gap-2 px-4 py-2 rounded-[2px] border border-primary/25 bg-background text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                        >
                          <span>View Scope Details</span>
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </button>
                        <span className="font-mono text-[10px] text-muted">
                          Record № {project.numeral}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Secondary Featured Projects (Projects 02 & 03: FWO Motorway M9 & ASF City) */}
              {featuredProjects.length > 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                  {featuredProjects.slice(1).map((project) => (
                    <article
                      key={project.id}
                      className="border border-primary/15 bg-surface overflow-hidden rounded-[2px] flex flex-col justify-between shadow-xs"
                      data-scroll-reveal
                    >
                      {/* Media */}
                      <div className="relative w-full min-w-0 bg-secondary overflow-hidden">
                        <ProjectMedia project={project} sizes="(min-width: 1024px) 45vw, 100vw" />
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted mb-3">
                            <span className="font-mono font-semibold text-primary text-[11px] uppercase tracking-wider">
                              Project {project.numeral} &middot; {project.category}
                            </span>
                            <span className="inline-flex items-center gap-1 text-muted text-xs">
                              <MapPin size={12} className="text-primary" aria-hidden="true" />
                              {project.location}
                            </span>
                          </div>

                          <h3 className="font-heading text-xl md:text-2xl font-semibold text-primary tracking-tight">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-xs md:text-sm font-mono font-medium text-foreground">
                            Scope: {project.scopeSupplied}
                          </p>

                          <p className="mt-3 text-sm leading-[1.8] text-muted">
                            {project.description}
                          </p>

                          {/* Scopes */}
                          <div className="mt-5 pt-4 border-t border-primary/10 flex flex-wrap gap-2">
                            {project.scopes.map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-secondary/70 border border-primary/10 px-2.5 py-1 rounded-[2px]"
                              >
                                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                                <span>{s}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="mt-6 pt-4 border-t border-primary/10 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex min-h-11 items-center gap-1.5 px-3.5 py-2 rounded-[2px] border border-primary/25 bg-background text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                          >
                            <span>Details</span>
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </button>
                          <span className="font-mono text-[10px] text-muted">
                            Record № {project.numeral}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CURATED PROJECT INDEX (Remaining Projects) */}
          {remainingProjects.length > 0 && (
            <div className="mt-16 md:mt-20 pt-12 border-t border-primary/15">
              <div className="mb-8 flex items-center justify-between" data-scroll-reveal>
                <div>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-primary tracking-tight">
                    Project Register &amp; Work Scopes
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-muted">
                    Client-supplied roadwork, earthmoving, and infrastructure assignments.
                  </p>
                </div>
                <span className="hidden sm:inline-block font-mono text-xs text-muted">
                  {remainingProjects.length} Recorded Scopes
                </span>
              </div>

              {/* Alternating Editorial Rows */}
              <div
                className="divide-y divide-primary/15 border-y border-primary/15"
                data-scroll-reveal
              >
                {remainingProjects.map((project) => {
                  const isExpanded = expandedRowId === project.id;
                  return (
                    <div
                      key={project.id}
                      className="transition-colors duration-200 hover:bg-secondary/25"
                    >
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={isExpanded ? `project-row-panel-${project.id}` : undefined}
                        onClick={() => toggleRow(project.id)}
                        className="w-full py-5 md:py-6 px-3 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-[2px] text-left group cursor-pointer"
                      >
                        <div className="flex items-start md:items-center gap-4 md:gap-6 min-w-0">
                          {/* Numeral */}
                          <span className="font-mono text-xs md:text-sm font-bold tracking-wider text-muted group-hover:text-primary transition-colors shrink-0 pt-0.5 md:pt-0">
                            {project.numeral}
                          </span>

                          {/* Title & Scope */}
                          <div className="min-w-0">
                            <h4 className="font-heading text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {project.title}
                            </h4>
                            <p className="text-xs text-muted mt-0.5">
                              {project.scopeSupplied} &middot;{" "}
                              <span className="text-primary font-medium">{project.category}</span>
                            </p>
                          </div>
                        </div>

                        {/* Location & Expand Trigger */}
                        <div className="flex items-center justify-between md:justify-end gap-5 pl-8 md:pl-0">
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                            <MapPin size={13} className="text-primary shrink-0" aria-hidden="true" />
                            <span>{project.location}</span>
                          </span>

                          <span
                            className={`size-8 rounded-[2px] flex items-center justify-center shrink-0 border border-primary/20 transition-all duration-200 ${
                              isExpanded ? "bg-primary text-white rotate-180" : "bg-surface text-muted"
                            }`}
                            aria-hidden="true"
                          >
                            <ChevronDown size={16} />
                          </span>
                        </div>
                      </button>

                      {/* Expanded Row Panel */}
                      {isExpanded && (
                        <div
                          id={`project-row-panel-${project.id}`}
                          className="px-4 pb-8 pt-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-t border-primary/10 bg-secondary/20"
                        >
                          <div className="md:col-span-4 relative w-full min-w-0 overflow-hidden rounded-[2px] border border-primary/15 bg-secondary">
                            <ProjectMedia project={project} sizes="(min-width: 768px) 30vw, 100vw" />
                          </div>

                          <div className="md:col-span-8 space-y-3">
                            <p className="text-sm leading-[1.8] text-muted">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-1">
                              {project.scopes.map((s) => (
                                <span
                                  key={s}
                                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-surface border border-primary/15 px-2.5 py-1 rounded-[2px]"
                                >
                                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                                  <span>{s}</span>
                                </span>
                              ))}
                            </div>

                            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                              <span className="text-[11px] font-mono text-muted">
                                {project.clientNote ?? "Scope documented in client working register."}
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedProject(project)}
                                className="inline-flex min-h-11 items-center gap-1 rounded-[2px] font-semibold text-primary hover:text-foreground underline decoration-accent decoration-2 underline-offset-4 cursor-pointer"
                              >
                                Full Scope Details <ArrowUpRight size={13} aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section Footer Provenance Disclosure */}
          <div
            className="mt-14 pt-8 border-t border-primary/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted"
            data-scroll-reveal
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span>
                Project scopes are supplied by SAS Construction. Location references do not document SAS execution. Other records await verified, permitted site photography.
              </span>
            </div>
            <span className="font-mono text-primary font-medium shrink-0">
              {projectsData.length} Client-supplied Records
            </span>
          </div>
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
        aria-labelledby="modal-project-title"
        aria-describedby="modal-project-desc"
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
              <div className="relative w-full min-w-0 overflow-hidden rounded-[2px] bg-charcoal border border-primary/15">
                <ProjectMedia
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

            <div className="pt-4 border-t border-primary/15 flex items-center justify-between text-xs text-muted">
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
