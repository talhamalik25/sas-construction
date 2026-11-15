"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { NavigationAction } from "@/components/ui/NavigationAction";

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
    <header
      className="relative z-20 border-b border-primary/15 bg-surface"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open && !(event.target as HTMLElement).closest("dialog")) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Container className="flex min-h-24 flex-wrap items-center justify-between gap-x-6 min-[960px]:min-h-26 min-[960px]:flex-nowrap">
        <Link
          href="/"
          className="flex h-[88px] w-[164px] shrink-0 items-center overflow-hidden min-[960px]:h-24 min-[960px]:w-[184px]"
          aria-label="SAS Construction home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="SAS Construction"
            width={1536}
            height={1024}
            sizes="(min-width: 960px) 184px, 164px"
            priority
            className="h-auto w-full shrink-0"
          />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle flex min-h-11 items-center gap-3 text-sm font-medium text-primary min-[960px]:hidden"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={`${
            open ? "flex" : "hidden"
          } w-full flex-col items-stretch gap-1 border-t border-primary/10 py-5 min-[960px]:flex min-[960px]:w-auto min-[960px]:flex-row min-[960px]:items-center min-[960px]:gap-6 min-[960px]:border-0 min-[960px]:py-0`}
        >
          <Link
            className="relative flex min-h-11 w-full items-center py-3 text-left text-sm font-medium text-primary transition-colors hover:text-primary after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-5 after:bg-accent after:content-[''] min-[960px]:w-auto min-[960px]:shrink-0"
            href="/"
            aria-current="page"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          {navigation.map((item) => (
            <NavigationAction
              key={item}
              destination={item}
              onNavigate={() => setOpen(false)}
              className="relative flex min-h-11 w-full items-center py-3 text-left text-sm font-medium text-muted transition-colors hover:text-primary min-[960px]:w-auto min-[960px]:shrink-0"
            >
              {item}
            </NavigationAction>
          ))}
          <NavigationAction
            destination="Contact"
            onNavigate={() => setOpen(false)}
            className="mt-3 inline-flex min-h-13 items-center justify-center gap-6 whitespace-nowrap rounded-[2px] border border-primary/25 bg-background px-6 py-3.5 text-sm font-medium text-primary transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white min-[960px]:mt-0 min-[960px]:ml-3 [&>svg]:size-[18px] [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:translate-x-0.5"
          >
            Request a Quote <ArrowUpRight aria-hidden="true" />
          </NavigationAction>
        </nav>
      </Container>
    </header>
  );
}
