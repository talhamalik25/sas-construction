"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { NavigationAction } from "@/components/ui/NavigationAction";
import { CTA } from "@/components/ui/CTA";

export function PremiumNavigation() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigating = useRef(false);
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
        dialog.current.close(); setOpen(false);
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
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  return <header className="relative z-20 border-b border-primary/15 bg-surface">
    <Container className="flex h-[88px] items-center justify-between gap-6 min-[960px]:h-24">
      <Link href="/" aria-label="SAS Construction home" className="flex shrink-0 items-center"><Image src="/logo.png" alt="SAS Construction" width={1536} height={1024} sizes="(min-width: 960px) 150px, 130px" preload className="h-auto w-[130px] shrink-0 object-contain min-[960px]:w-[150px]" /></Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-5 min-[960px]:flex xl:gap-7">
        <Link href="/" aria-current="page" className="desktop-nav-link">Home</Link>
        {navigation.map(item => <NavigationAction key={item} destination={item} className="desktop-nav-link">{item}</NavigationAction>)}
        <CTA destination="Contact" className="ml-2">Request a Quote</CTA>
      </nav>
      <button ref={toggle} type="button" className="menu-toggle inline-flex min-h-11 items-center gap-4 border border-primary/25 bg-background py-2.5 pr-3 pl-4 text-xs font-semibold tracking-wide text-primary min-[960px]:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog" onClick={() => { navigating.current=false;setOpen(true); }}>Menu<span className="border-l border-primary/20 pl-3"><Menu size={19} aria-hidden="true" /></span></button>
    </Container>
    <dialog ref={dialog} id="mobile-navigation" aria-labelledby="mobile-menu-title" className="mobile-menu" onCancel={() => {navigating.current=false;setOpen(false);}} onClose={() => {setOpen(false);if(!navigating.current)toggle.current?.focus();}} onClick={event => {
      if(event.target!==event.currentTarget)return;
      const r=event.currentTarget.getBoundingClientRect();
      if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();
    }} onKeyDown={event => {
      if(event.key!=="Tab")return;
      const controls=event.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
      const first=controls[0],last=controls[controls.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
    }}>
      <div className="flex items-center justify-between gap-4 border-b border-primary/20 pb-5">
        <p id="mobile-menu-title" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">SAS Construction<span className="mt-2 block font-normal tracking-[0.12em] text-muted">Navigation</span></p>
        <button type="button" autoFocus aria-label="Close menu" onClick={()=>close()} className="flex size-11 shrink-0 items-center justify-center border border-primary/25 text-primary transition-colors hover:bg-secondary"><X size={20} aria-hidden="true" /></button>
      </div>
      <nav aria-label="Mobile navigation" className="my-7">
        <Link href="/" onClick={()=>close(true)} className="mobile-nav-link"><span className="mobile-nav-number" aria-hidden="true">01</span>Home<ArrowUpRight size={18} aria-hidden="true" /></Link>
        {navigation.map((item,i)=><NavigationAction key={item} destination={item} onNavigate={()=>close(true)} className="mobile-nav-link"><span className="mobile-nav-number" aria-hidden="true">0{i+2}</span>{item}<ArrowUpRight size={18} aria-hidden="true" /></NavigationAction>)}
      </nav>
      <div className="mt-auto border-t border-primary/20 pt-6">
        <p className="mb-4 text-xs leading-6 text-muted">Start with your site.<br />Let&apos;s discuss the groundwork.</p>
        <CTA destination="Contact" onNavigate={()=>close(true)} className="w-full">Request a Quote</CTA>
        <p className="mt-5 text-[10px] uppercase tracking-[0.12em] text-muted">Experience. Coordination. Execution.</p>
      </div>
    </dialog>
  </header>;
}
