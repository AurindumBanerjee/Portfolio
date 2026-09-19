"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRichInteraction } from "@/lib/hooks";
import { clamp } from "@/lib/utils";

export interface MagneticButtonProps {
  readonly children: ReactNode;
  /** Maximum pull toward the cursor, in pixels. Kept small on purpose. */
  readonly strength?: number;
  readonly className?: string;
}

/**
 * Leans its child toward the pointer while the pointer is over it.
 *
 * Wraps rather than replaces the control, so the child stays a real <a> or
 * <button> with its own focus and keyboard behaviour intact. With reduced
 * motion or a coarse pointer, nothing moves.
 */
export function MagneticButton({ children, strength = 6, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichInteraction();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!rich || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(clamp((dx / rect.width) * strength * 2, -strength, strength));
    y.set(clamp((dy / rect.height) * strength * 2, -strength, strength));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
