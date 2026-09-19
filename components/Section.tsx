"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps {
  readonly id: string;
  /** Pixel-font eyebrow above the heading. */
  readonly eyebrow: string;
  readonly title: string;
  /** Optional lead paragraph under the heading. */
  readonly lead?: string;
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Standard section wrapper: consistent rhythm, heading level, and a reveal
 * that runs once when the heading scrolls into view.
 *
 * Content is never hidden behind the animation — `whileInView` only changes
 * opacity and offset, and reduced motion neutralises the transition globally.
 */
export function Section({ id, eyebrow, title, lead, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("relative py-24 sm:py-32", className)}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-3xl"
        >
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2
            id={`${id}-heading`}
            className="text-pixel-lg leading-snug text-stone-bright sm:text-pixel-xl"
          >
            {title}
          </h2>
          {lead ? (
            <p className="mt-5 text-base leading-relaxed text-stone-mid sm:text-lg">{lead}</p>
          ) : null}
        </motion.div>

        {children}
      </div>
    </section>
  );
}

/** A panel with the world's pixel frame. Used for cards, modals and callouts. */
export function PixelPanel({
  children,
  className,
  tone = "default",
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly tone?: "default" | "lit" | "signal";
}) {
  return (
    <div
      className={cn(
        "pixel-frame",
        tone === "lit" && "pixel-frame-lit",
        tone === "signal" && "pixel-frame-signal",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A horizontal divider drawn as a dashed pixel rule. */
export function PixelRule({ className }: { readonly className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-1 w-full", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, #37415c 0 8px, transparent 8px 16px)",
      }}
    />
  );
}
