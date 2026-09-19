"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "pixelportfolio-theme";

interface ThemeContextValue {
  readonly theme: Theme;
  readonly toggleTheme: () => void;
  /** False until the stored/system preference has been read on the client. */
  readonly ready: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  ready: false,
});

/**
 * Runs before first paint, inlined into <head>.
 *
 * Without this the page would render with the default (night) palette and
 * then snap to the stored preference once React hydrated - a visible flash.
 * Reading localStorage synchronously here avoids that entirely.
 *
 * Kept as a plain string because it must execute before the bundle loads.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export function ThemeProvider({ children }: { readonly children: ReactNode }) {
  // Always start at the SSR default; the real value is adopted in an effect,
  // so server and client markup agree and hydration stays clean.
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
    setReady(true);
  }, []);

  // Follow the OS preference, but only while the visitor has not chosen.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* storage unavailable; fall through to following the system */
      }
      if (stored === "light" || stored === "dark") return;
      setTheme(event.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Push the theme onto <html> and remember it.
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable; the theme still applies for this session */
    }
  }, [theme, ready]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Ease the big surfaces only for this switch, then drop the class so it
    // never interferes with hover or scroll transitions afterwards.
    if (!reduced) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 400);
    }

    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, ready }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
