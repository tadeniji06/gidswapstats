"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import { tooltipVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface InfoTooltipProps {
  label: string;
  content: string;
  pulse?: boolean;
  align?: "center" | "left" | "right";
  className?: string;
}

/**
 * Accessible InfoTooltip Component:
 * Clean solid white surface (#FFFFFF) with crisp border (#0A0A0B) and Brand Blue indicator dot (#2563EB).
 */
export function InfoTooltip({
  label,
  content,
  pulse = false,
  align = "center",
  className,
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  const alignmentClasses =
    align === "left"
      ? "left-0"
      : align === "right"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  const arrowAlignmentClasses =
    align === "left"
      ? "left-3"
      : align === "right"
      ? "right-3"
      : "left-1/2 -translate-x-1/2";

  return (
    <span
      className={cn("relative inline-flex items-center align-middle", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={`Methodology: ${label}`}
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className="group/tip relative inline-flex h-5 w-5 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
      >
        {pulse && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-[#2563EB] opacity-50"
          />
        )}
        <Info className="h-3.5 w-3.5 transition-transform duration-300 group-hover/tip:rotate-12" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformPerspective: 700 }}
            className={cn(
              "pointer-events-none absolute bottom-full z-50 mb-3 w-[265px] max-w-[280px] rounded-xl border-2 border-[#0A0A0B] bg-white p-3.5 text-left shadow-[4px_4px_0px_0px_#0A0A0B]",
              alignmentClasses
            )}
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-[#0A0A0B]">
                {label}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
            </div>
            <p className="font-sans text-xs leading-relaxed text-zinc-600">
              {content}
            </p>

            {/* 3D Arrow */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute -bottom-1.5 h-3 w-3 rotate-45 border-r-2 border-b-2 border-[#0A0A0B] bg-white",
                arrowAlignmentClasses
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
