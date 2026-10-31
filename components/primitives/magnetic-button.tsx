"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/components/providers/cursor-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps {
  primaryText: string;
  hoverText: string;
  href?: string;
  target?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * High-Priority Tactile Magnetic CTA Button:
 * - Bold 2px solid #0A0A0B border + crisp offset shadow (`shadow-[6px_6px_0px_0px_#0A0A0B]`)
 * - Vibrant GidSwap Brand Blue (`#2563EB`) surface that sweeps to solid `#0A0A0B` on hover
 * - Zero gradients
 */
export function MagneticButton({
  primaryText,
  hoverText,
  href,
  target,
  onClick,
  className,
  icon,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);
  const { triggerBurst } = useCursor();
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now(),
      });
    }
    triggerBurst();
    onClick?.();
  };

  const content = (
    <>
      {/* Solid Clip-path background sweep layer (Solid Obsidian sweep over solid Brand Blue button) */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          clipPath: isHovered
            ? "circle(140% at 50% 100%)"
            : "circle(0% at 50% 100%)",
        }}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        className="pointer-events-none absolute inset-0 bg-[#0A0A0B]"
      />

      {/* Click ripple effect */}
      {ripple && (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ left: ripple.x, top: ripple.y }}
          className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />
      )}

      {/* Vertical Text Swap Container */}
      <span className="relative z-10 flex items-center gap-3.5 overflow-hidden py-0.5">
        <span className="relative inline-flex h-6 flex-col overflow-hidden leading-6">
          {/* Primary text slides up & out on hover */}
          <motion.span
            initial={false}
            animate={{
              y: isHovered && !reducedMotion ? "-115%" : "0%",
            }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="inline-block font-mono text-sm font-bold tracking-[0.18em] uppercase text-white"
          >
            {primaryText}
          </motion.span>

          {/* Secondary text slides down-in from above */}
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{
              y: isHovered && !reducedMotion ? "0%" : "115%",
            }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="absolute inset-0 inline-block font-mono text-sm font-bold tracking-[0.18em] uppercase text-white"
          >
            {hoverText}
          </motion.span>
        </span>

        {icon && (
          <motion.span
            animate={{
              rotate: isHovered && !reducedMotion ? 15 : 0,
              x: isHovered && !reducedMotion ? 3 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border border-[#0A0A0B] transition-colors duration-300",
              isHovered
                ? "bg-[#2563EB] text-white"
                : "bg-white text-[#0A0A0B]"
            )}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </>
  );

  const sharedClasses = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border-2 border-[#0A0A0B] bg-[#2563EB] px-10 py-5 shadow-[6px_6px_0px_0px_#0A0A0B] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#2563EB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]",
    className
  );

  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        data-magnetic="true"
        style={reducedMotion ? undefined : { x: springX, y: springY }}
        whileTap={{ scale: 0.97 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={sharedClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type="button"
      data-magnetic="true"
      style={reducedMotion ? undefined : { x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={sharedClasses}
    >
      {content}
    </motion.button>
  );
}
