import React from "react";
import { HeroSection } from "@/components/sections/hero";
import { StatsGridSection } from "@/components/sections/stats-grid";
import { VolumeBreakdownSection } from "@/components/sections/volume-breakdown";
import { NetworkDistributionSection } from "@/components/sections/network-distribution";
import { TransactionFlowSection } from "@/components/sections/transaction-flow";
import { TrustSignalsSection } from "@/components/sections/trust-signals";
import { FooterCtaSection } from "@/components/sections/footer-cta";
import { SectionCurtain } from "@/components/primitives/draw-line";

/**
 * GidSwap Proof-of-Work Minimalist Stats Landing Page
 * Warm stone background (#F3F2EE), bold borders & tactile shadows, Quantico typography, zero gradients.
 */
export default function Page() {
  return (
    <main id="main-content" className="relative z-10 w-full overflow-x-hidden bg-[#F3F2EE]">
      {/* 1. HERO — 100dvh pinned 3D icosahedron + letter-by-letter 3D entrance */}
      <HeroSection />

      <SectionCurtain />

      {/* 2. STATS GRID — 4 odometer roll-flip counters + 3D tilt cards */}
      <StatsGridSection />

      <SectionCurtain />

      {/* 3. VOLUME BREAKDOWN — GSAP pinned split-scene convergence + 3D card flip */}
      <VolumeBreakdownSection />

      <SectionCurtain />

      {/* 4. NETWORK DISTRIBUTION — Morphing capsule pipelines + SVG stroke-draw */}
      <NetworkDistributionSection />

      <SectionCurtain />

      {/* 5. TRANSACTION FLOW — 3-node routing diagram + traveling packet dot + ticker */}
      <TransactionFlowSection />

      <SectionCurtain />

      {/* 6. TRUST SIGNALS — Self-drawing checkmark + mm:ss processing time odometer */}
      <TrustSignalsSection />

      <SectionCurtain />

      {/* 7. FOOTER CTA — Reversed 3D letter drop ("START SWAPPING. START TRADING.") + 3D icosahedron */}
      <FooterCtaSection />
    </main>
  );
}
