"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/* useLayoutEffect warns when rendered on the server; this component's DOM work
   is client-only, so fall back to useEffect there. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { AnimatePresence, motion } from "framer-motion";
import { X, Github } from "lucide-react";
import type { Project } from "@/data/resume";
import { PixelEnvironment } from "./PixelEnvironment";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Project case study, as a modal dialog.
 *
 * Implements the dialog pattern properly: focus moves in on open, is trapped
 * while open, Escape and backdrop clicks close it, the page behind is inert
 * to scroll, and focus returns to whatever opened it.
 */
export function ProjectModal({
  project,
  onClose,
}: {
  readonly project: Project | null;
  readonly onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const open = project !== null;

  // Remember the trigger, so focus can go home on close. Captured in a layout
  // effect: by the time the passive effect below runs, the click that opened
  // the dialog has already blurred the card and activeElement is <body>.
  useIsomorphicLayoutEffect(() => {
    if (open) {
      const active = document.activeElement as HTMLElement | null;
      if (active && active !== document.body) restoreTo.current = active;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog.
    const raf = window.requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panelRef.current)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      // Wrap at both ends so Tab never escapes the dialog.
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;

      // Return focus to the card that opened the dialog. Deferred by a frame
      // so it lands after React has finished unmounting the dialog, which
      // would otherwise steal focus back to <body>.
      const target = restoreTo.current;
      if (target?.isConnected) {
        window.requestAnimationFrame(() => target.focus({ preventScroll: true }));
      }
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-void/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pixel-frame my-4 w-full max-w-3xl outline-none"
          >
            {/* Title bar, styled as a dialogue box header. */}
            <div className="flex items-center justify-between gap-4 border-b-4 border-slate-edge bg-slate-mid px-5 py-3">
              <p className="font-pixel text-pixel-sm uppercase tracking-[0.16em] text-lantern">
                Case Study
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="p-1.5 text-stone-mid transition-colors hover:text-lantern-bright"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Establishing shot of the project's location. */}
            <div className="relative h-32 overflow-hidden sm:h-44">
              <PixelEnvironment scene={project.scene} seed={41} className="h-full w-full" />
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-pixel text-pixel-sm uppercase tracking-[0.14em] text-stone-dim">
                {project.period}
              </p>
              <h2
                id="project-modal-title"
                className="mt-3 text-pixel-lg leading-snug text-stone-bright sm:text-pixel-xl"
              >
                {project.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-mid">
                {project.summary}
              </p>

              <section className="mt-8">
                <h3 className="label-pixel mb-3 text-ember">The problem</h3>
                <p className="text-sm leading-relaxed text-stone-mid sm:text-base">
                  {project.problem}
                </p>
              </section>

              <section className="mt-8">
                <h3 className="label-pixel mb-3 text-signal">Approach</h3>
                <ul className="space-y-3">
                  {project.approach.map((step) => (
                    <li
                      key={step}
                      className="relative pl-5 text-sm leading-relaxed text-stone-mid sm:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.5em] h-1.5 w-1.5 bg-signal"
                      />
                      {step}
                    </li>
                  ))}
                </ul>
              </section>

              {project.metrics.length > 0 ? (
                <section className="mt-8">
                  <h3 className="label-pixel mb-4 text-lantern">Results</h3>
                  <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="bg-slate-mid p-4">
                        <dt className="text-[0.7rem] leading-tight text-stone-dim">
                          {metric.label}
                        </dt>
                        <dd className="mt-2 font-pixel text-pixel-base text-lantern-bright">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <section className="mt-8">
                <h3 className="label-pixel mb-3 text-stone-mid">Built with</h3>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech} className="tech-tag">
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Repository link appears only when one exists in the resume. */}
              {project.repo ? (
                <div className="mt-9">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="pixel-button"
                  >
                    <Github size={16} aria-hidden="true" />
                    View source
                  </a>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
