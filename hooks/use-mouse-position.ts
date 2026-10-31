"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

/**
 * Tracks viewport cursor coordinates and normalized (-1 to 1) values
 * for subtle 3D parallax and ambient mesh drift.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const { clientX, clientY } = event;
        const width = window.innerWidth || 1;
        const height = window.innerHeight || 1;
        setPosition({
          x: clientX,
          y: clientY,
          normalizedX: (clientX / width) * 2 - 1,
          normalizedY: (clientY / height) * 2 - 1,
        });
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return position;
}

