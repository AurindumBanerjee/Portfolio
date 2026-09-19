"use client";

import { useEffect, useRef, useState } from "react";
import { useRichInteraction } from "@/lib/hooks";

/**
 * A pixel-art cursor plus a soft lantern light that follows it.
 *
 * Mounts only on fine-pointer devices with motion allowed. Everything is
 * driven by direct style writes inside one rAF loop rather than React state,
 * so moving the mouse never triggers a re-render.
 */
export function PixelCursor() {
  const rich = useRichInteraction();
  const [mounted, setMounted] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // Target (true pointer) and rendered (eased) positions.
  const target = useRef({ x: -100, y: -100 });
  const light = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);

  useEffect(() => {
    setMounted(rich);
  }, [rich]);

  useEffect(() => {
    if (!rich) return;

    // Hide the native cursor only once ours is actually live.
    document.body.style.cursor = "none";

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;

      // Interactive elements swell the cursor. Checked here rather than with
      // per-element listeners so it works for anything added later.
      const el = event.target as HTMLElement | null;
      hovering.current = Boolean(
        el?.closest('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])'),
      );
    };

    const onLeave = () => {
      target.current.x = -100;
      target.current.y = -100;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let frame = 0;
    const tick = () => {
      const { x, y } = target.current;

      // The cursor itself snaps to a 2px grid — it is a sprite, not a dot.
      if (cursorRef.current) {
        const gx = Math.round(x / 2) * 2;
        const gy = Math.round(y / 2) * 2;
        cursorRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0) scale(${
          hovering.current ? 1.5 : 1
        })`;
      }

      // The light lags behind, like a lantern being carried.
      light.current.x += (x - light.current.x) * 0.12;
      light.current.y += (y - light.current.y) * 0.12;
      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${light.current.x}px, ${light.current.y}px, 0)`;
      }

      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(frame);
      document.body.style.cursor = "";
    };
  }, [rich]);

  if (!mounted) return null;

  return (
    <>
      {/* Warm pool of light trailing the pointer. */}
      <div
        ref={lightRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60]"
        style={{ willChange: "transform" }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2"
          style={{
            width: 420,
            height: 420,
            background:
              "radial-gradient(circle, rgba(232,163,61,0.07) 0%, rgba(232,163,61,0.03) 35%, transparent 68%)",
          }}
        />
      </div>

      {/* The cursor sprite: an arrow drawn as pixels. */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70]"
        style={{ willChange: "transform", transition: "scale 120ms steps(2,end)" }}
      >
        <svg
          width={20}
          height={20}
          viewBox="0 0 10 10"
          className="crisp"
          aria-hidden="true"
          focusable="false"
        >
          {/* Outline */}
          {/* Outline is the page background, body is the key light: that pair
              stays legible whichever way round the theme is. */}
          <path
            d="M1 0 h1 v1 h1 v1 h1 v1 h1 v1 h1 v1 h1 v1 h-3 v1 h-1 v1 h-1 v1 h-1 z"
            fill="var(--void)"
            transform="translate(0.5, 0.5)"
          />
          <path
            d="M1 0 h1 v1 h1 v1 h1 v1 h1 v1 h1 v1 h1 v1 h-3 v1 h-1 v1 h-1 v1 h-1 z"
            fill="var(--lantern)"
          />
        </svg>
      </div>
    </>
  );
}
