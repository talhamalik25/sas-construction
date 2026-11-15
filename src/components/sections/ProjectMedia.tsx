"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import type { ProjectRecord } from "@/data/projects";

interface ProjectMediaProps {
  project: ProjectRecord;
  sizes?: string;
  mode?: "card" | "dialog";
}

export function ProjectMedia({
  project,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  mode = "card",
}: ProjectMediaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize image data: support single or multi-image records
  const images = project.images && project.images.length > 0
    ? project.images
    : project.image
    ? [project.image]
    : [];

  const hasMultiple = images.length > 1;
  const currentPhoto = images[currentIndex] || images[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!hasMultiple) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      setCurrentIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setCurrentIndex(images.length - 1);
    }
  };

  // Fallback for any record without photographs
  if (!currentPhoto) {
    return (
      <div className="relative flex h-full min-h-[220px] flex-col justify-between border-l-2 border-accent bg-secondary/80 p-6 text-foreground md:p-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Scope Record
          </span>
          <p className="mt-2 font-heading text-lg font-semibold text-primary">
            {project.title}
          </p>
          <p className="mt-1 font-mono text-xs text-muted">
            {project.scopeSupplied}
          </p>
        </div>
        <div className="pt-4 text-[11px] leading-relaxed text-muted">
          Physical execution record documented in contractor register. Site photography pending verified permission.
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
        className={`relative w-full aspect-[16/10] overflow-hidden ${
          isDialog ? "bg-charcoal/95" : "bg-secondary"
        }`}
      >
        <Image
          src={currentPhoto.src}
          alt={currentPhoto.alt}
          fill
          sizes={sizes}
          className={`${
            isDialog ? "object-contain" : "object-cover object-center"
          } transition-transform duration-500 hover:scale-[1.01]`}
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

        {/* Honest, concise badge ONLY for Location References (not actual SAS project photo) */}
        {currentPhoto.classification === "B" && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-amber-200 bg-charcoal/90 px-2.5 py-1 rounded-[2px] border border-amber-300/30 backdrop-blur-xs">
              Location Reference
            </span>
          </div>
        )}
      </div>

      {/* Credit and Attribution Presentation */}
      {isDialog ? (
        <figcaption className="shrink-0 border-t border-primary/15 bg-surface px-5 py-3.5 text-xs text-muted">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-primary">
              {currentPhoto.classification === "B"
                ? "Location Reference — not evidence of SAS execution"
                : "Authentic Project Photography"}
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
                      className={`h-1.5 rounded-full transition-all ${
                        currentIndex === idx ? "w-3.5 bg-primary" : "w-1.5 bg-primary/30 hover:bg-primary/60"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-foreground/90">{currentPhoto.caption}</p>
          <p className="mt-1 text-[11px] text-muted">
            {currentPhoto.sourceUrl ? (
              <a
                href={currentPhoto.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary"
              >
                Source: {currentPhoto.author}
              </a>
            ) : (
              <span>Source: SAS Construction Field Records</span>
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
            {currentPhoto.changes && ` · ${currentPhoto.changes}`}
          </p>
        </figcaption>
      ) : (
        <figcaption className="shrink-0 border-t border-primary/10 bg-surface px-4 py-2.5 text-[11px] leading-relaxed text-muted">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <p className="font-medium text-foreground/80 truncate max-w-[calc(100%-110px)]">
              {currentPhoto.caption}
            </p>
            {hasMultiple && (
              <div className="flex items-center gap-1 shrink-0" role="group" aria-label="Photo selection">
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
                      className={`h-1.5 rounded-full transition-all ${
                        currentIndex === idx ? "w-3.5 bg-primary" : "w-1.5 bg-primary/30 hover:bg-primary/60"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          {currentPhoto.classification === "B" && (
            <p className="mt-1 text-[10px] text-muted">
              Location reference ·{" "}
              <a
                href={currentPhoto.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary"
              >
                Photo: {currentPhoto.author}
              </a>
              {" · "}
              <a
                href={currentPhoto.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary"
              >
                {currentPhoto.license}
              </a>
              {currentPhoto.changes && ` · ${currentPhoto.changes}`}
            </p>
          )}
          {currentPhoto.classification === "A" && images.some((img) => img.license) && (
            <p className="mt-1 text-[11px] text-muted">
              Location reference:{" "}
              <a
                href={images.find((img) => img.license)?.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:text-foreground"
              >
                Photo: {images.find((img) => img.license)?.author}
              </a>
              {" · "}
              <a
                href={images.find((img) => img.license)?.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:text-foreground"
              >
                CC BY-SA 4.0
              </a>
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
