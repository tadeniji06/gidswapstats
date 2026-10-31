"use client";

import React from "react";
import { motion } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface SectionCurtainProps {
  className?: string;
}

/**
 * Page-level Section Curtain transition:
 * A crisp 2px solid horizontal rule (#0A0A0B/15) that expands from center (`scaleX: 0 -> 1`).
 */
export function SectionCurtain({ className }: SectionCurtainProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={cn("mx-auto h-[2px] w-full max-w-6xl bg-[#0A0A0B]/15", className)}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("mx-auto w-full max-w-6xl overflow-hidden py-2", className)}
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 1.1, ease: EASE_CINEMATIC }}
        className="h-[2px] w-full origin-center bg-[#0A0A0B]/20"
      />
    </div>
  );
}
