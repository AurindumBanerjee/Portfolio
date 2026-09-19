import type { Config } from "tailwindcss";

/**
 * The palette is the world: a cold obsidian night, lit by two sources only —
 * a warm lantern (amber) and a cold signal (cyan). Everything else is stone.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /**
       * Every colour resolves through a CSS variable rather than a literal,
       * which is what lets the whole world switch between night and day by
       * redefining the variables on <html>. The `rgb(... / <alpha-value>)`
       * form keeps Tailwind's opacity modifiers (`bg-void/85`) working.
       *
       * Names stay semantic, not literal: `lantern` is "the warm key light",
       * which is amber at night and a deeper blue by day.
       */
      colors: {
        void: "rgb(var(--c-void) / <alpha-value>)",
        obsidian: "rgb(var(--c-obsidian) / <alpha-value>)",
        slate: {
          deep: "rgb(var(--c-slate-deep) / <alpha-value>)",
          mid: "rgb(var(--c-slate-mid) / <alpha-value>)",
          soft: "rgb(var(--c-slate-soft) / <alpha-value>)",
          edge: "rgb(var(--c-slate-edge) / <alpha-value>)",
        },
        stone: {
          dim: "rgb(var(--c-stone-dim) / <alpha-value>)",
          mid: "rgb(var(--c-stone-mid) / <alpha-value>)",
          bright: "rgb(var(--c-stone-bright) / <alpha-value>)",
        },
        lantern: {
          DEFAULT: "rgb(var(--c-lantern) / <alpha-value>)",
          bright: "rgb(var(--c-lantern-bright) / <alpha-value>)",
          deep: "rgb(var(--c-lantern-deep) / <alpha-value>)",
        },
        signal: {
          DEFAULT: "rgb(var(--c-signal) / <alpha-value>)",
          bright: "rgb(var(--c-signal-bright) / <alpha-value>)",
          deep: "rgb(var(--c-signal-deep) / <alpha-value>)",
        },
        ember: "rgb(var(--c-ember) / <alpha-value>)",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "pixel-xs": ["0.5rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
        "pixel-sm": ["0.625rem", { lineHeight: "1.2rem", letterSpacing: "0.08em" }],
        "pixel-base": ["0.75rem", { lineHeight: "1.5rem", letterSpacing: "0.06em" }],
        "pixel-lg": ["1rem", { lineHeight: "1.8rem", letterSpacing: "0.04em" }],
        "pixel-xl": ["1.5rem", { lineHeight: "2.2rem", letterSpacing: "0.02em" }],
        "pixel-2xl": ["2rem", { lineHeight: "2.6rem", letterSpacing: "0.01em" }],
      },
      spacing: {
        // 4px pixel grid multiples, so panels always snap to the world's scale
        px2: "2px",
        px4: "4px",
        px6: "6px",
        px8: "8px",
        px12: "12px",
        px16: "16px",
      },
      animation: {
        flicker: "flicker 4s steps(3, end) infinite",
        drift: "drift 18s linear infinite",
        "drift-slow": "drift 32s linear infinite",
        bob: "bob 5s ease-in-out infinite",
        "bob-slow": "bob 8s ease-in-out infinite",
        scan: "scan 9s linear infinite",
        blink: "blink 1.1s steps(2, end) infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.92" },
          "50%": { opacity: "0.78" },
          "55%": { opacity: "0.95" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
