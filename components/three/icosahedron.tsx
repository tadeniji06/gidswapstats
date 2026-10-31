"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

export interface IcosahedronProps {
  scale?: number;
  mouseNormalized?: { x: number; y: number };
}

/**
 * 3D Wireframe Icosahedron Centerpiece in GidSwap Brand Blue:
 * - Royal blue wireframe edges (#2563EB, #1D4ED8, #3B82F6)
 * - Auto-rotates at 0.15 rad/s
 * - Subtle mouse parallax (±15° / ±0.26 rad rotation)
 */
export function Icosahedron({
  scale = 1,
  mouseNormalized = { x: 0, y: 0 },
}: IcosahedronProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const innerRingRef = useRef<THREE.Mesh | null>(null);
  const [hovered, setHovered] = useState(false);

  const maxTiltRad = THREE.MathUtils.degToRad(15);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.15;
    const targetRotX = mouseNormalized.y * maxTiltRad;
    const targetRotZ = -mouseNormalized.x * maxTiltRad;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.06
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ,
      0.06
    );

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= delta * 0.22;
      innerRingRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer Icosahedron with Brand Blue Edges */}
      <mesh>
        <icosahedronGeometry args={[1.95, 1]} />
        <meshBasicMaterial
          color="#DBEAFE"
          transparent
          opacity={0.14}
          wireframe={false}
        />
        <Edges
          scale={1.003}
          threshold={12}
          color={hovered ? "#1D4ED8" : "#2563EB"}
        />
      </mesh>

      {/* Secondary Outer Wireframe Cage in Brand Blue */}
      <mesh scale={1.15}>
        <icosahedronGeometry args={[1.95, 0]} />
        <meshBasicMaterial
          color="#2563EB"
          wireframe
          transparent
          opacity={hovered ? 0.55 : 0.32}
        />
      </mesh>

      {/* Inner Orbital Torus Ring in Electric Brand Blue */}
      <mesh ref={innerRingRef} scale={0.72}>
        <torusKnotGeometry args={[1.2, 0.028, 128, 16, 2, 3]} />
        <meshBasicMaterial
          color={hovered ? "#1D4ED8" : "#3B82F6"}
          wireframe
          transparent
          opacity={hovered ? 0.65 : 0.38}
        />
      </mesh>
    </group>
  );
}
