"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, type ReactNode, type RefObject } from "react";
import { useRichInteraction, usePointerVector } from "@/lib/hooks";

export interface ParallaxLayerProps {
  readonly children: ReactNode;
  /**
   * How far the layer drifts over the scroll of its container, in pixels.
   * Negative moves against the scroll (far layers), positive with it (near).
   */
  readonly scrollShift?: number;
  /** How far the layer leans toward the pointer, in pixels. */
  readonly pointerShift?: number;
  readonly className?: string;
  /**
   * The scrolling section this layer belongs to. Required for the scroll
   * drift: it is what progress is measured against.
   */
  readonly container: RefObject<HTMLElement | null>;
}

/**
 * One depth slice of a scene. Layers are stacked with different shifts to
 * build parallax; all movement is transform-only so it stays on the compositor.
 *
 * With reduced motion or a coarse pointer, this degrades to a plain div —
 * the layer still renders, it simply does not move.
 */
export function ParallaxLayer({
  children,
  scrollShift = -40,
  pointerShift = 0,
  className,
  container,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichInteraction();
  const pointer = usePointerVector();

  // Progress is measured against the section that owns the scene, supplied by
  // the parent. Measuring against the layer itself does not work: layers are
  // absolutely positioned and inset to zero, which gives Framer Motion no
  // usable offset and makes it warn about a statically positioned container.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
    // The parent's ref is attached during its own render pass, so defer
    // measurement rather than reading it during layout.
    layoutEffect: false,
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, scrollShift]);
  const smoothScrollY = useSpring(scrollY, { stiffness: 80, damping: 30, mass: 0.6 });

  const pointerX = useSpring(rich ? pointer.x * pointerShift : 0, {
    stiffness: 60,
    damping: 24,
  });
  const pointerYRaw = useSpring(rich ? pointer.y * pointerShift * 0.5 : 0, {
    stiffness: 60,
    damping: 24,
  });

  // Scroll drift and pointer lean both act on Y, so they are summed into a
  // single transform rather than fighting over the `y` channel.
  const y = useTransform(
    [smoothScrollY, pointerYRaw],
    ([scroll, lean]: number[]) => (scroll ?? 0) + (lean ?? 0),
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, x: pointerX, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
