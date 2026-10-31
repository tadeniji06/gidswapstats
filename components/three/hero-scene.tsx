"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Icosahedron } from "@/components/three/icosahedron";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface HeroSceneProps {
  className?: string;
  scale?: number;
}

/**
 * Lazy-loaded React Three Fiber Canvas for the Hero and Footer scenes.
 * Automatically degrades to a static minimalist geometric circle if reduced-motion is enabled.
 */
export default function HeroScene({ className, scale = 1 }: HeroSceneProps) {
  const reducedMotion = useReducedMotion();
  const { normalizedX, normalizedY } = useMousePosition();
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  if (reducedMotion || !webGLSupported) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none flex items-center justify-center",
          className
        )}
      >
        <div className="h-72 w-72 rounded-full border border-[#E4E4E7] bg-[#FAFAFA]" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={cn("h-full w-full", className)}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Icosahedron
            scale={scale}
            mouseNormalized={{ x: normalizedX, y: normalizedY }}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
