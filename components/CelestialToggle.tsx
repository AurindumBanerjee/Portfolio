"use client";

import { useEffect, useRef, useState } from "react";
import { CELESTIAL } from "./HeroScene";

/**
 * An invisible, focusable button pinned over the sun/moon drawn in the sky
 * layer, so the body itself is clickable.
 *
 * The sky SVG uses preserveAspectRatio="xMidYMid slice", which scales to
 * cover and crops the overflow. To keep the hit target on top of the artwork
 * this repeats that same mapping against the measured section size, rather
 * than guessing at a percentage offset that would drift at other aspect
 * ratios.
 *
 * The button is not the only way to switch themes - the navbar carries an
 * ordinary labelled toggle - so this is an enhancement, never the sole route.
 */
export function CelestialToggle({
  isLight,
  onToggle,
}: {
  readonly isLight: boolean;
  readonly onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{
    left: number;
    top: number;
    size: number;
  } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      if (!width || !height) return;

      // "slice" scales by whichever axis needs the larger factor to cover.
      const scale = Math.max(width / CELESTIAL.viewW, height / CELESTIAL.viewH);
      const renderedW = CELESTIAL.viewW * scale;
      const renderedH = CELESTIAL.viewH * scale;
      // xMidYMid centres the overflow on both axes.
      const offsetX = (width - renderedW) / 2;
      const offsetY = (height - renderedH) / 2;

      // Pad the target outward so it comfortably clears 44px on touch.
      const drawn = CELESTIAL.size * scale;
      const size = Math.max(drawn, 44);
      const pad = (size - drawn) / 2;

      setBox({
        left: offsetX + CELESTIAL.x * scale - pad,
        top: offsetY + CELESTIAL.y * scale - pad,
        size,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el.parentElement ?? el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-20">
      {box ? (
        <button
          type="button"
          onClick={onToggle}
          aria-label={isLight ? "Switch to night theme" : "Switch to day theme"}
          title={isLight ? "Click the sun for night" : "Click the moon for day"}
          className="group pointer-events-auto absolute"
          style={{ left: box.left, top: box.top, width: box.size, height: box.size }}
        >
          {/* A faint ring on hover, so the body reads as interactive without
              cluttering the scene when the pointer is elsewhere. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ boxShadow: "0 0 0 3px var(--lantern-bright)" }}
          />
        </button>
      ) : null}
    </div>
  );
}
