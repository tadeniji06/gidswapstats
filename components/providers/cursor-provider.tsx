"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface CursorContextValue {
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  triggerBurst: () => void;
}

const CursorContext = createContext<CursorContextValue>({
  isHovered: false,
  setIsHovered: () => {},
  triggerBurst: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}

export interface CursorProviderProps {
  children: React.ReactNode;
}

/**
 * Global Custom Cursor on Pure White Canvas:
 * - Crisp solid obsidian dot (#0A0A0B) that scales on interactive targets and
 *   applies magnetic pull within 80px radius of `[data-magnetic]` buttons.
 * - Zero gradients.
 */
export function CursorProvider({ children }: CursorProviderProps) {
  const reducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isBursting, setIsBursting] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 420, damping: 32, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(hasCoarsePointer);

    if (hasCoarsePointer || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      const magneticElements = document.querySelectorAll<HTMLElement>("[data-magnetic]");
      let foundMagnetic = false;

      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < 80) {
          targetX = e.clientX + (centerX - e.clientX) * 0.25;
          targetY = e.clientY + (centerY - e.clientY) * 0.25;
          foundMagnetic = true;
        }
      });

      cursorX.set(targetX);
      cursorY.set(targetY);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role='button'], [data-cursor-hover], input, select, textarea"
      );
      setIsHovered(Boolean(interactive) || foundMagnetic);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorX, cursorY, reducedMotion]);

  const triggerBurst = () => {
    setIsBursting(true);
    window.setTimeout(() => setIsBursting(false), 380);
  };

  return (
    <CursorContext.Provider value={{ isHovered, setIsHovered, triggerBurst }}>
      {/* Custom Minimalist Solid Black Dot Cursor */}
      {!isTouch && !reducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{
            x: springX,
            y: springY,
          }}
          className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{
              scale: isBursting ? 3.2 : isHovered ? 2.2 : 1,
              opacity: isBursting ? 0.25 : isHovered ? 0.85 : 1,
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="h-2.5 w-2.5 rounded-full bg-[#0A0A0B]"
          />
          {isHovered && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1.7, opacity: 0.35 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="absolute inset-0 -m-2 rounded-full border border-[#0A0A0B]"
            />
          )}
        </motion.div>
      )}

      {children}
    </CursorContext.Provider>
  );
}
