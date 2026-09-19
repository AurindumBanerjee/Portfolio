"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function Navbar() {
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile menu while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-obsidian/92 backdrop-blur-sm" : "bg-transparent",
      )}
      style={
        scrolled
          ? { boxShadow: "0 4px 0 0 rgba(55,65,92,0.55)" }
          : undefined
      }
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Aurindum Banerjee - back to top"
        >
          {/* Monogram drawn as a pixel tile. */}
          <svg
            width={32}
            height={32}
            viewBox="0 0 8 8"
            className="crisp flex-none"
            aria-hidden="true"
            focusable="false"
          >
            <rect width={8} height={8} fill="#111522" />
            <rect x={0} y={0} width={8} height={1} fill="#37415c" />
            <rect x={0} y={7} width={8} height={1} fill="#07080c" />
            <path d="M2 6 V3 h1 V2 h2 v1 h1 v3 h-1 V4 h-2 v2 z" fill="#e8a33d" />
          </svg>
          <span className="font-pixel text-pixel-base uppercase tracking-[0.12em] text-stone-bright transition-colors group-hover:text-lantern-bright">
            Aurindum
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block px-4 py-2 font-pixel text-pixel-sm uppercase tracking-[0.14em] transition-colors",
                    isActive
                      ? "text-lantern-bright"
                      : "text-stone-dim hover:text-stone-bright",
                  )}
                >
                  {section.label}
                  {/* Active marker: a solid pixel underline. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 bottom-0 h-1 transition-opacity",
                      isActive ? "bg-lantern opacity-100" : "opacity-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 text-stone-bright md:hidden"
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t-4 border-slate-edge bg-obsidian md:hidden"
      >
        <ul className="flex flex-col px-5 py-2">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === section.id ? "true" : undefined}
                className={cn(
                  "block border-b-2 border-slate-deep py-4 font-pixel text-pixel-base uppercase tracking-[0.12em]",
                  active === section.id ? "text-lantern-bright" : "text-stone-mid",
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
