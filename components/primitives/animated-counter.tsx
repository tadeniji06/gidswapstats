"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  formatCommas?: boolean;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Odometer Roll-Flip Number Component.
 * Splits formatted numbers into individual vertical digit strips that roll to
 * their target digit over 1.8s with `EASE_OUT_EXPO` when scrolled into view.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className,
  formatCommas = true,
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasTriggered(true);
    }
  }, [isInView]);

  const formattedString = formatCommas
    ? new Intl.NumberFormat("en-US").format(value)
    : String(value);

  const chars = formattedString.split("");

  if (reducedMotion) {
    return (
      <span ref={containerRef} className={cn("font-mono tabular-nums", className)}>
        {prefix}
        {formattedString}
        {suffix}
      </span>
    );
  }

  return (
    <span
      ref={containerRef}
      aria-label={`${prefix}${formattedString}${suffix}`}
      className={cn(
        "inline-flex items-baseline font-mono tabular-nums leading-none",
        className
      )}
    >
      {prefix && <span className="mr-0.5">{prefix}</span>}

      <span aria-hidden="true" className="inline-flex items-baseline">
        {chars.map((char, index) => {
          const isNumeric = /[0-9]/.test(char);
          if (!isNumeric) {
            return (
              <span key={`sep-${index}`} className="inline-block px-[1px]">
                {char}
              </span>
            );
          }

          const targetDigit = parseInt(char, 10);

          return (
            <span
              key={`digit-${index}`}
              className="relative inline-block h-[1em] overflow-hidden align-baseline"
            >
              <motion.span
                initial={{ y: "0%" }}
                animate={{
                  y: hasTriggered ? `${-targetDigit * 10}%` : "0%",
                }}
                transition={{
                  duration: 1.8,
                  delay: index * 0.07,
                  ease: EASE_OUT_EXPO,
                }}
                className="flex flex-col leading-none will-change-transform"
              >
                {DIGITS.map((d) => (
                  <span
                    key={d}
                    className="flex h-[1em] items-center justify-center leading-none"
                  >
                    {d}
                  </span>
                ))}
              </motion.span>
            </span>
          );
        })}
      </span>

      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
}

