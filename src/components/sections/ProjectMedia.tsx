"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectRecord, ProjectImage } from "@/data/projects";

interface ProjectMediaProps {
  project: ProjectRecord;
  sizes: string;
  mode?: "card" | "dialog";
  initialIndex?: number;
}

export function ProjectMedia({
  project,
  sizes,
  mode = "card",
  initialIndex = 0,
}: ProjectMediaProps) {
  const images: ProjectImage[] =
    project.images && project.images.length > 0
      ? project.images
      : project.image
        ? [project.image]
        : [];

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const hasMultiple = images.length > 1;
  const currentPhoto = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasMultiple) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  if (!currentPhoto) {
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

  const isDialog = mode === "dialog";

  return (
    <figure
      className="relative flex flex-col bg-secondary"
      data-project-photo={project.id}
      onKeyDown={handleKeyDown}
      tabIndex={hasMultiple ? 0 : undefined}
      aria-label={hasMultiple ? `Photo gallery for ${project.title}, image ${currentIndex + 1} of ${images.length}` : undefined}
    >
      <div
        className={`relative w-full aspect-[16/10] bg-secondary overflow-hidden ${
          isDialog ? "bg-charcoal/95" : ""
        }`}
      >
        <Image
          src={currentPhoto.src}
          alt={currentPhoto.alt}
          fill
          sizes={sizes}
          className="object-contain transition-transform duration-500 hover:scale-[1.01]"
          priority={currentIndex === 0 && project.featured}
        />

        {/* Architectural corner registration mark for card mode */}
        {!isDialog && (
          <div
            className="pointer-events-none absolute top-3 right-3 z-10 h-4 w-4 border-t border-r border-accent"
            aria-hidden="true"
          />
        )}

        {/* Multi-image navigation controls */}
        {hasMultiple && (
          <>
            <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none z-20">
              <button
                type="button"
                onClick={handlePrev}
                aria-label={`Previous image (${currentIndex === 0 ? images.length : currentIndex} of ${images.length})`}
                className="pointer-events-auto flex size-8 sm:size-9 items-center justify-center rounded-[2px] bg-primary/85 text-white hover:bg-foreground border border-accent/40 shadow-sm transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={`Next image (${currentIndex === images.length - 1 ? 1 : currentIndex + 2} of ${images.length})`}
                className="pointer-events-auto flex size-8 sm:size-9 items-center justify-center rounded-[2px] bg-primary/85 text-white hover:bg-foreground border border-accent/40 shadow-sm transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Image counter indicator */}
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
              <span className="font-mono text-[10px] font-semibold text-white bg-primary/90 px-2 py-1 rounded-[2px] border border-white/20 backdrop-blur-xs">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </>
        )}

        {/* Classification Badge overlay */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-white bg-primary/90 px-2 py-0.5 rounded-[2px] border border-white/10 backdrop-blur-xs">
            {currentPhoto.classification === "A" ? "Project Photo" : "Location Reference"}
          </span>
        </div>
      </div>

      {/* Mandatory Credit and Attribution Footer */}
      <figcaption className="shrink-0 border-t border-primary/15 bg-surface px-4 py-3 text-[11px] leading-relaxed text-muted">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <p className="font-semibold text-primary">
            {currentPhoto.classification === "B"
              ? "Location reference — not evidence of SAS execution"
              : "Project photo"}
          </p>
          {hasMultiple && (
            <div className="flex items-center gap-1" role="group" aria-label="Photo selection">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  aria-label={`View photo ${idx + 1}`}
                  className="flex min-h-[24px] min-w-[24px] items-center justify-center p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx ? "w-4 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/60"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="mt-1">{currentPhoto.caption}</p>
        <p className="mt-1 text-[10px] text-muted">
          {currentPhoto.sourceUrl ? (
            <a
              href={currentPhoto.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-primary"
            >
              Photo: {currentPhoto.author}
            </a>
          ) : (
            <span>Record: {currentPhoto.author || "SAS Construction"}</span>
          )}
          {currentPhoto.license && currentPhoto.licenseUrl && (
            <>
              {" · "}
              <a
                href={currentPhoto.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary"
              >
                {currentPhoto.license}
              </a>
            </>
          )}
          {currentPhoto.changes && <>{" · "}{currentPhoto.changes}</>}
        </p>

        {/* Persistent licensed disclosure if project includes external attribution */}
        {!currentPhoto.license && images.some((img) => img.license) && (
          <p className="mt-1 text-[10px] text-muted">
            {images
              .filter((img) => img.license && img.licenseUrl)
              .map((img) => (
                <span key={img.src}>
                  Location reference:{" "}
                  <a
                    href={img.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-primary"
                  >
                    Photo: {img.author}
                  </a>
                  {" · "}
                  <a
                    href={img.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-primary"
                  >
                    {img.license}
                  </a>
                </span>
              ))}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
