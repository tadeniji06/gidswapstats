import type { Variants } from "framer-motion";

/**
 * Shared Named Easing Constants
 * All Framer Motion animations across the page import from this file to
 * maintain consistent cinematic timing.
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_CINEMATIC: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const EASE_BOUNCE: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
export const EASE_HERO_LETTER: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Hero headline letter-by-letter dramatic 3D jump entrance:
 * Letters leap up from deep below with high arc overshoot, 3D flip, and elastic settle.
 */
export const heroLetterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 110,
    scale: 0.35,
    rotateX: -95,
    rotateZ: -10,
    filter: "blur(12px)",
  },
  visible: (i: number) => ({
    opacity: [0, 1, 1, 1, 1],
    y: [110, -34, 8, -12, 0],
    scale: [0.35, 1.24, 0.93, 1.06, 1],
    rotateX: [-95, 22, -8, 4, 0],
    rotateZ: [-10, 5, -2, 0, 0],
    filter: ["blur(12px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"],
    transition: {
      delay: i * 0.038,
      duration: 1.25,
      times: [0, 0.45, 0.68, 0.85, 1],
      ease: EASE_HERO_LETTER,
    },
  }),
};

/**
 * Footer headline letter-by-letter 3D jump entrance reversed (dropping & bouncing from above).
 */
export const footerLetterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -90,
    scale: 0.5,
    rotateX: 90,
    filter: "blur(12px)",
  },
  visible: (i: number) => ({
    opacity: [0, 1, 1, 1],
    y: [-90, 18, -8, 0],
    scale: [0.5, 1.15, 0.96, 1],
    rotateX: [90, -14, 5, 0],
    filter: ["blur(12px)", "blur(0px)", "blur(0px)", "blur(0px)"],
    transition: {
      delay: i * 0.035,
      duration: 1.1,
      times: [0, 0.5, 0.78, 1],
      ease: EASE_HERO_LETTER,
    },
  }),
};

/**
 * Word-by-word bottom clip-mask reveal for subheadlines.
 */
export const wordMaskVariants: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: 0.4 + i * 0.06,
      duration: 0.85,
      ease: EASE_OUT_EXPO,
    },
  }),
};

/**
 * Split-character 3D Y-axis flip used on section titles (e.g. Network Distribution).
 */
export const charFlipYVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -90,
    y: 24,
  },
  visible: (i: number) => ({
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.75,
      ease: EASE_OUT_EXPO,
    },
  }),
};

/**
 * Section title mask-up clip-path reveal on scroll into view.
 */
export const sectionMaskUpVariants: Variants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
    y: 24,
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: EASE_OUT_EXPO,
    },
  },
};

/**
 * Cascade pill reveal (60ms stagger, EASE_BOUNCE).
 */
export const institutionPillVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.9,
    filter: "blur(6px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.06,
      duration: 0.65,
      ease: EASE_BOUNCE,
    },
  }),
};

/**
 * Staggered 3D card entrance for stats counters.
 */
export const statCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    rotateX: -12,
    scale: 0.96,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.9,
      ease: EASE_OUT_EXPO,
    },
  }),
};

/**
 * Tooltip entrance with subtle 3D tilt and scale.
 */
export const tooltipVariants: Variants = {
  hidden: {
    scale: 0.92,
    opacity: 0,
    y: 6,
    rotateX: -10,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.2,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    scale: 0.94,
    opacity: 0,
    y: 4,
    transition: {
      duration: 0.15,
      ease: EASE_CINEMATIC,
    },
  },
};

/**
 * Reduced motion simple fade fallback variant.
 */
export const reducedMotionFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};
