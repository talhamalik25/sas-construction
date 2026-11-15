"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { NavigationAction } from "@/components/ui/NavigationAction";
import { CTA } from "@/components/ui/CTA";
import { createWhatsAppLink } from "@/lib/contact";

export function PremiumNavigation() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigating = useRef(false);
  const quoteHref = createWhatsAppLink(
    "Hello SAS Construction, I would like to request a quotation for my project."
  );

  function close(forNavigation = false) {
    navigating.current = forNavigation;
    dialog.current?.close();
    setOpen(false);
    if (!forNavigation) toggle.current?.focus();
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 960px)");
    const resize = () => {
      if (desktop.matches && dialog.current?.open) {
        navigating.current = true;
        dialog.current.close();
        setOpen(false);
        document.querySelector<HTMLElement>('nav[aria-label="Main navigation"] a')?.focus();
      }
    };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, []);

  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="relative z-20 border-b border-primary/15 bg-surface">
      <Container className="flex h-16 sm:h-[72px] min-[960px]:h-24 items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link
          href="/"
          aria-label="SAS Construction home"
          className="flex shrink-0 items-center transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo.png"
            alt="SAS Construction"
            width={1536}
            height={1024}
            sizes="(min-width: 960px) 150px, 120px"
            preload
            className="h-auto w-[112px] sm:w-[126px] min-[960px]:w-[150px] shrink-0 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 min-[960px]:flex xl:gap-8">
          <Link
            href="/"
            aria-current="page"
            className="desktop-nav-link inline-flex items-center min-h-11 text-xs font-semibold uppercase tracking-[0.14em] text-primary relative py-2 after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-accent"
          >
            Home
          </Link>
          {navigation.map((item) => (
            <NavigationAction
              key={item}
              destination={item}
              className="desktop-nav-link inline-flex items-center min-h-11 text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-primary transition-colors duration-200 relative py-2 after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all after:duration-200"
            >
              {item}
            </NavigationAction>
          ))}
          {quoteHref ? (
            <CTA href={quoteHref} className="ml-3">
              Request a Quote
            </CTA>
          ) : (
            <CTA destination="Contact" className="ml-3">
              Request a Quote
            </CTA>
          )}
        </nav>

        {/* Mobile Menu Button - Architectural Compact Toggle */}
        <button
          ref={toggle}
          type="button"
          className="menu-toggle inline-flex min-h-11 items-center gap-2.5 rounded-[2px] border border-primary/25 bg-background/90 px-3.5 py-2 text-xs font-mono font-medium tracking-[0.16em] uppercase text-primary transition-all duration-200 hover:border-primary hover:bg-secondary cursor-pointer min-[960px]:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-haspopup="dialog"
          onClick={() => {
            navigating.current = false;
            setOpen(true);
          }}
        >
          <span>Menu</span>
          <span className="flex flex-col justify-center gap-1 w-3.5 h-3 shrink-0" aria-hidden="true">
            <span className="h-[1.5px] w-full bg-primary" />
            <span className="h-[1.5px] w-2.5 self-end bg-accent" />
          </span>
        </button>
      </Container>

      {/* Accessible Mobile Menu Drawer Dialog */}
      <dialog
        ref={dialog}
        id="mobile-navigation"
        aria-labelledby="mobile-menu-title"
        className="mobile-menu fixed inset-y-0 right-0 z-60 m-0 flex h-dvh max-h-dvh w-[min(400px,calc(100%-24px))] max-w-none flex-col overflow-y-auto overscroll-contain border-0 border-l border-accent bg-background p-6 sm:p-7 text-foreground shadow-2xl"
        onCancel={() => {
          navigating.current = false;
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
          if (!navigating.current) toggle.current?.focus();
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const r = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          ) {
            close();
          }
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href],button:not([disabled])'
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
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between gap-4 border-b border-primary/15 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <div>
              <p id="mobile-menu-title" className="font-heading text-sm font-semibold tracking-tight text-primary">
                SAS Construction
              </p>
              <span className="block font-mono text-[9px] tracking-[0.14em] text-muted uppercase">
                Field Contractor &middot; 20+ Years
              </span>
            </div>
          </div>
          <button
            type="button"
            autoFocus
            aria-label="Close menu"
            onClick={() => close()}
            className="flex size-11 shrink-0 items-center justify-center rounded-[2px] border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Navigation List */}
        <nav aria-label="Mobile navigation" className="my-5 space-y-1">
          <Link
            href="/"
            onClick={() => close(true)}
            className="mobile-nav-link group flex items-center justify-between min-h-[58px] sm:min-h-[64px] border-b border-primary/10 font-heading text-[clamp(20px,4.5vw,26px)] font-medium tracking-tight text-primary transition-all duration-200 hover:pl-2 hover:text-foreground hover:bg-secondary/30 px-1 rounded-[2px]"
          >
            <span className="mobile-nav-number font-mono text-xs tracking-wider text-accent font-semibold group-hover:text-primary transition-colors" aria-hidden="true">
              01
            </span>
            <span className="font-heading">Home</span>
            <ArrowUpRight size={16} className="text-muted/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-auto" aria-hidden="true" />
          </Link>
          {navigation.map((item, i) => (
            <NavigationAction
              key={item}
              destination={item}
              onNavigate={() => close(true)}
              className="mobile-nav-link group flex items-center justify-between min-h-[58px] sm:min-h-[64px] border-b border-primary/10 font-heading text-[clamp(20px,4.5vw,26px)] font-medium tracking-tight text-primary transition-all duration-200 hover:pl-2 hover:text-foreground hover:bg-secondary/30 px-1 rounded-[2px]"
            >
              <span className="mobile-nav-number font-mono text-xs tracking-wider text-accent font-semibold group-hover:text-primary transition-colors" aria-hidden="true">
                0{i + 2}
              </span>
              <span className="font-heading">{item}</span>
              <ArrowUpRight size={16} className="text-muted/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-auto" aria-hidden="true" />
            </NavigationAction>
          ))}
        </nav>

        {/* Drawer Footer CTA */}
        <div className="mt-auto border-t border-primary/15 pt-5 space-y-3">
          <p className="text-xs leading-relaxed text-muted">
            Direct on-site contractor coordination, machinery deployment, and execution across Sindh.
          </p>
          {quoteHref ? (
            <CTA href={quoteHref} onClick={() => close(true)} className="w-full justify-center">
              Request a Quote
            </CTA>
          ) : (
            <CTA destination="Contact" onNavigate={() => close(true)} className="w-full justify-center">
              Request a Quote
            </CTA>
          )}
          <div className="flex items-center justify-between pt-1 font-mono text-[9px] text-muted tracking-wider uppercase">
            <span>Sindh, Pakistan</span>
            <span className="text-primary font-medium">WhatsApp Available</span>
          </div>
        </div>
      </dialog>
    </header>
  );
}
