"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * Interactive 3D Tilt Card with Bold Borders & Tactile Offset Shadow:
 * - Solid #FFFFFF surface over #F3F2EE stone canvas
 * - 2px #0A0A0B border + crisp `shadow-[5px_5px_0px_0px_#0A0A0B]`
 * - Zero gradients.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 4,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 24 });

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / (rect.width || 1));
    mouseY.set(y / (rect.height || 1));
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        reducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }
      }
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "group relative rounded-2xl border-2 border-[#0A0A0B] bg-white shadow-[5px_5px_0px_0px_#0A0A0B] transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#0A0A0B]",
        className
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
