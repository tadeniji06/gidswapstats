"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Global Top Scroll Progress Indicator:
 * Solid crisp 3px Brand Blue line (#2563EB) at top of viewport (zero gradients).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
      className="pointer-events-none fixed top-0 right-0 left-0 z-[90] h-[3px] origin-left bg-[#2563EB]"
    />
  );
}
