"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { PreviewAction } from "@/components/ui/PreviewAction";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 960px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }}>
      <Container className="header-inner">
        <Link href="/" className="brand" aria-label="SAS Construction home" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="SAS Construction" width={1536} height={1024} sizes="156px" priority />
        </Link>
        <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open}
          aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
          <span className={`menu-lines ${open ? "is-open" : ""}`} aria-hidden="true"><span /><span /></span>
        </button>
        <nav id="primary-navigation" aria-label="Main navigation" className={`navigation ${open ? "is-open" : ""}`}>
          <Link className="nav-link active" href="/" aria-current="page" onClick={() => setOpen(false)}>Home</Link>
          {navigation.map((item) => <PreviewAction key={item} destination={item} className="nav-link">{item}</PreviewAction>)}
          <PreviewAction destination="Contact" className="button button-outline header-cta">
            Request a Quote <span aria-hidden="true">&#8599;</span>
          </PreviewAction>
          <span className="nav-preview-label">Homepage preview &middot; More pages coming soon</span>
        </nav>
      </Container>
    </header>
  );
}
