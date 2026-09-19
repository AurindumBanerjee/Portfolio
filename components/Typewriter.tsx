"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

export interface TypewriterProps {
  readonly text: string;
  /** Milliseconds before typing starts. */
  readonly delay?: number;
  /** Milliseconds per character. */
  readonly speed?: number;
}

/**
 * Types `text` out one character at a time.
 *
 * The full string is always present for assistive technology; only the
 * visible portion animates. With reduced motion the text simply appears.
 */
export function Typewriter({ text, delay = 0, speed = 32 }: TypewriterProps) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setStarted(true), delay);
    return () => window.clearTimeout(t);
  }, [delay, reduced]);

  useEffect(() => {
    if (reduced || !started || count >= text.length) return;
    const t = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(t);
  }, [started, count, text.length, speed, reduced]);

  if (reduced) return <span>{text}</span>;

  const done = count >= text.length;

  return (
    <>
      {/* The real string, for screen readers and for copy-paste. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={done ? undefined : "caret"}>
        {text.slice(0, count)}
      </span>
    </>
  );
}
