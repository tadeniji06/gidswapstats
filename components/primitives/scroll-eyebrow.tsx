"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface ScrollEyebrowProps {
  index: string;
  label: string;
  className?: string;
}

/**
 * Scroll-linked Section Eyebrow Label:
 * Transitions smoothly from muted zinc (#71717A) to crisp ink black (#0A0A0B)
 * with a bold bordered index tag. Zero gradients.
 */
export function ScrollEyebrow({ index, label, className }: ScrollEyebrowProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.45"],
  });

  const color = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgb(113, 113, 122)", "rgb(10, 10, 11)"]
  );

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase",
        className
      )}
    >
      <span className="rounded-md border-2 border-[#0A0A0B] bg-white px-2.5 py-0.5 text-[11px] font-bold text-[#0A0A0B] shadow-[2px_2px_0px_0px_#0A0A0B]">
        {index}
      </span>
      <span className="h-[2px] w-6 bg-[#0A0A0B]" />
      <motion.span
        style={reducedMotion ? { color: "#0A0A0B" } : { color }}
        className="font-bold"
      >
        {label}
      </motion.span>
    </div>
  );
}
