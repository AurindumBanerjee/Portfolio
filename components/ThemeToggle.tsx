"use client";

import { useTheme } from "@/lib/theme";

/**
 * A pixel-art day/night switch.
 *
 * Rendered as a real checkbox-style button: it reports its state through
 * `aria-pressed`, is reachable by keyboard, and carries a label that names
 * the action rather than the icon.
 */
export function ThemeToggle({ className }: { readonly className?: string }) {
  const { theme, toggleTheme, ready } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isLight}
      aria-label={isLight ? "Switch to night theme" : "Switch to day theme"}
      title={isLight ? "Switch to night" : "Switch to day"}
      className={`group relative inline-flex flex-none items-center ${className ?? ""}`}
      // Until the stored preference is read the button would claim the wrong
      // state to assistive tech, so it is hidden from the a11y tree briefly.
      aria-hidden={!ready}
    >
      {/* Track. The sky inside it is always the *opposite* of the current
          theme's page background, so the switch stays visible either way. */}
      <span
        className="relative block h-8 w-16 transition-colors"
        style={{
          backgroundColor: isLight ? "#7fb0e8" : "var(--slate-mid)",
          boxShadow: "0 0 0 4px var(--slate-edge)",
        }}
      >
        {/* Stars, visible at night */}
        <span
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: isLight ? 0 : 1 }}
        >
          <span className="absolute left-[38px] top-[7px] h-1 w-1 bg-stone-mid" />
          <span className="absolute left-[46px] top-[15px] h-1 w-1 bg-stone-dim" />
          <span className="absolute left-[52px] top-[6px] h-1 w-1 bg-stone-mid" />
        </span>

        {/* Clouds, visible by day */}
        <span
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: isLight ? 1 : 0 }}
        >
          <span className="absolute left-[8px] top-[8px] h-1.5 w-4 bg-stone-bright/35" />
          <span className="absolute left-[12px] top-[5px] h-1.5 w-2.5 bg-stone-bright/35" />
          <span className="absolute left-[6px] top-[18px] h-1.5 w-3 bg-stone-bright/25" />
        </span>

        {/* The travelling body: moon at night, sun by day. */}
        <span
          aria-hidden="true"
          className="absolute top-1 block h-6 w-6 transition-transform duration-300"
          style={{
            transform: isLight ? "translateX(4px)" : "translateX(36px)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.3, 0.64, 1)",
          }}
        >
          {isLight ? <SunSprite /> : <MoonSprite />}
        </span>
      </span>
    </button>
  );
}

/*
 * The sprites keep literal colours rather than palette variables: a sun must
 * look like a sun in both themes, and `--lantern` is blue by day, which would
 * put a blue sun on a blue sky.
 */

/** 8x8 pixel sun, drawn with a corona. */
function SunSprite() {
  return (
    <svg viewBox="0 0 8 8" className="crisp h-full w-full" aria-hidden="true" focusable="false">
      {/* Rays */}
      <g fill="#f5a623">
        <rect x={3} y={0} width={2} height={1} />
        <rect x={3} y={7} width={2} height={1} />
        <rect x={0} y={3} width={1} height={2} />
        <rect x={7} y={3} width={1} height={2} />
      </g>
      {/* Body */}
      <g fill="#ffb02e">
        <rect x={2} y={2} width={4} height={4} />
        <rect x={3} y={1} width={2} height={6} />
        <rect x={1} y={3} width={6} height={2} />
      </g>
      {/* Highlight */}
      <rect x={3} y={3} width={1} height={1} fill="#ffe0a3" />
    </svg>
  );
}

/** 8x8 pixel crescent moon. */
function MoonSprite() {
  return (
    <svg viewBox="0 0 8 8" className="crisp h-full w-full" aria-hidden="true" focusable="false">
      <rect x={2} y={1} width={4} height={6} fill="#eef2fb" />
      <rect x={1} y={2} width={6} height={4} fill="#eef2fb" />
      {/* The bite is punched in the track colour, so the crescent reads as a
          shape rather than a disc with a grey patch on it. */}
      <rect x={4} y={0} width={4} height={4} fill="var(--slate-mid)" />
      <rect x={5} y={1} width={3} height={4} fill="var(--slate-mid)" />
      {/* Craters */}
      <rect x={2} y={4} width={1} height={1} fill="#aab4cd" />
      <rect x={3} y={6} width={1} height={1} fill="#aab4cd" />
    </svg>
  );
}
