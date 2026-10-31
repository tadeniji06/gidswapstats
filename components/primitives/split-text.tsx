"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  heroLetterVariants,
  footerLetterVariants,
  wordMaskVariants,
  charFlipYVariants,
  reducedMotionFadeVariants,
} from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export type SplitTextMode =
  | "hero-letters"
  | "footer-letters"
  | "words-mask"
  | "chars-flip-y";

export interface SplitTextProps {
  text: string;
  mode?: SplitTextMode;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  highlightWords?: string[];
  once?: boolean;
}

/**
 * Reusable SplitText component for:
 * 1. `hero-letters`: Dramatic 3D jump entrance from behind + continuous staggered jump wave + interactive spring jump on hover
 * 2. `footer-letters`: Reversed 3D jump entrance from above
 * 3. `words-mask`: Word-by-word bottom clip-mask reveal (`y: 100% -> 0`)
 * 4. `chars-flip-y`: Split-character 3D Y-axis flip (`rotateY: -90deg -> 0`)
 */
export function SplitText({
  text,
  mode = "hero-letters",
  className,
  wordClassName,
  charClassName,
  highlightWords = [],
  once = true,
}: SplitTextProps) {
  const reducedMotion = useReducedMotion();
  const [waveTick, setWaveTick] = useState(0);

  // Trigger a periodic dramatic jump wave across hero letters so the headline feels alive and cinematic
  useEffect(() => {
    if (reducedMotion || mode !== "hero-letters") return;
    const interval = window.setInterval(() => {
      setWaveTick((prev) => prev + 1);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [reducedMotion, mode]);

  if (reducedMotion) {
    return (
      <motion.span
        variants={reducedMotionFadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        className={cn("inline-block", className)}
      >
        {text}
      </motion.span>
    );
  }

  const words = text.split(" ");

  if (mode === "words-mask") {
    return (
      <span aria-label={text} className={cn("inline-flex flex-wrap gap-x-[0.28em]", className)}>
        {words.map((word, wordIdx) => {
          const cleanWord = word.replace(/[^a-zA-Z0-9$]/g, "");
          const isHighlighted = highlightWords.includes(cleanWord) || highlightWords.includes(word);
          return (
            <span
              key={`word-${wordIdx}`}
              aria-hidden="true"
              className={cn("inline-block overflow-hidden py-0.5", wordClassName)}
            >
              <motion.span
                custom={wordIdx}
                variants={wordMaskVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once, amount: 0.3 }}
                className={cn(
                  "inline-block will-change-transform",
                  isHighlighted && "font-bold text-[#2563EB]"
                )}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    );
  }

  const activeVariant =
    mode === "footer-letters"
      ? footerLetterVariants
      : mode === "chars-flip-y"
      ? charFlipYVariants
      : heroLetterVariants;

  let globalCharIndex = 0;

  return (
    <span
      aria-label={text}
      className={cn(
        "inline-flex flex-wrap justify-center gap-x-[0.26em] gap-y-2 [perspective:1000px]",
        className
      )}
    >
      {words.map((word, wordIdx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
        const isHighlighted = highlightWords.includes(cleanWord) || highlightWords.includes(word);

        return (
          <span
            key={`word-${wordIdx}`}
            aria-hidden="true"
            className={cn(
              "inline-flex whitespace-nowrap [transform-style:preserve-3d]",
              isHighlighted &&
                "rounded-xl border-2 border-[#0A0A0B] bg-[#2563EB] px-3 py-0.5 text-white shadow-[4px_4px_0px_0px_#0A0A0B]",
              wordClassName
            )}
          >
            {word.split("").map((char, charIdx) => {
              const currentIndex = globalCharIndex++;
              return (
                <motion.span
                  key={`char-${wordIdx}-${charIdx}`}
                  custom={currentIndex}
                  variants={activeVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once, amount: 0.2 }}
                  whileHover={
                    mode === "hero-letters" || mode === "footer-letters"
                      ? {
                          y: -22,
                          scale: 1.22,
                          rotateZ: currentIndex % 2 === 0 ? -6 : 6,
                          color: isHighlighted ? "#FFFFFF" : "#2563EB",
                          transition: {
                            type: "spring",
                            stiffness: 480,
                            damping: 12,
                          },
                        }
                      : undefined
                  }
                  className={cn(
                    "inline-block origin-bottom cursor-default will-change-transform [transform-style:preserve-3d]",
                    charClassName
                  )}
                >
                  <motion.span
                    key={`wave-${waveTick}`}
                    animate={
                      mode === "hero-letters" && waveTick > 0
                        ? {
                            y: [0, -24, 5, -7, 0],
                            scale: [1, 1.18, 0.95, 1.04, 1],
                            rotateX: [0, 24, -8, 0, 0],
                          }
                        : undefined
                    }
                    transition={
                      mode === "hero-letters" && waveTick > 0
                        ? {
                            delay: currentIndex * 0.028,
                            duration: 0.72,
                            ease: [0.22, 1, 0.36, 1],
                          }
                        : undefined
                    }
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
