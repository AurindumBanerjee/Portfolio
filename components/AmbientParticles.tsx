"use client";

import { useEffect, useRef } from "react";
import { useRichInteraction } from "@/lib/hooks";

/**
 * Drifting motes of dust, lit faintly, that ease away from the cursor.
 *
 * Deliberately cheap: 34 particles, one canvas, no physics beyond a linear
 * drift and a radial push. Mounts only when the device has a fine pointer and
 * motion is allowed, and pauses entirely when the tab is hidden.
 */

const COUNT = 34;

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  warm: boolean;
}

export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rich = useRichInteraction();

  useEffect(() => {
    if (!rich) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    // Cap the backing store at 1.5x: these are 2-4px squares, so more
    // resolution buys nothing and costs fill rate.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    resize();

    const motes: Mote[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.14,
      vy: -0.05 - Math.random() * 0.14,
      size: Math.random() > 0.72 ? 3 : 2,
      alpha: 0.12 + Math.random() * 0.3,
      warm: Math.random() > 0.35,
    }));

    // Canvas cannot resolve CSS variables, so the current palette is read
    // once here and refreshed whenever the theme attribute changes.
    let warmColour = "#e8a33d";
    let coolColour = "#4ecfc0";
    const readPalette = () => {
      const styles = getComputedStyle(document.documentElement);
      warmColour = styles.getPropertyValue("--lantern").trim() || warmColour;
      coolColour = styles.getPropertyValue("--signal").trim() || coolColour;
    };
    readPalette();

    const themeObserver = new MutationObserver(readPalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const pointer = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    let frame = 0;
    let running = true;

    const onVisibility = () => {
      running = !document.hidden;
      if (running && !frame) frame = window.requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const tick = () => {
      frame = 0;
      if (!running) return;

      ctx.clearRect(0, 0, width, height);

      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;

        // Gentle repulsion within 110px of the pointer.
        const dx = m.x - pointer.x;
        const dy = m.y - pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 12100 && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const push = (1 - dist / 110) * 0.5;
          m.x += (dx / dist) * push;
          m.y += (dy / dist) * push;
        }

        // Wrap rather than respawn, so density stays constant.
        if (m.y < -10) {
          m.y = height + 10;
          m.x = Math.random() * width;
        }
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        // Snap to the pixel grid: a mote is a square, not a blur.
        ctx.globalAlpha = m.alpha;
        ctx.fillStyle = m.warm ? warmColour : coolColour;
        ctx.fillRect(
          Math.round(m.x / 2) * 2,
          Math.round(m.y / 2) * 2,
          m.size,
          m.size,
        );
      }
      ctx.globalAlpha = 1;

      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [rich]);

  if (!rich) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
}
