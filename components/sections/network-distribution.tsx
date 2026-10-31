"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { stats, tooltipCopy } from "@/data/stats";
import { SplitText } from "@/components/primitives/split-text";
import { AnimatedCounter } from "@/components/primitives/animated-counter";
import { InfoTooltip } from "@/components/primitives/info-tooltip";
import { ScrollEyebrow } from "@/components/primitives/scroll-eyebrow";
import { NetworkLogo } from "@/components/primitives/network-logo";
import { EASE_CINEMATIC, EASE_OUT_EXPO } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * SECTION 4 — NETWORK DISTRIBUTION (MORPHING BAR CHART)
 * - Crisp white capsules with 2px #0A0A0B borders, official Network Logos, and solid Brand Blue progress pipelines.
 */
export function NetworkDistributionSection() {
  const [hoveredNetwork, setHoveredNetwork] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="network-distribution"
      aria-labelledby="network-distribution-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-40"
    >
      {/* Header with Split-Character 3D Flip */}
      <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <ScrollEyebrow index="03" label="SETTLEMENT TOPOLOGY · CHAIN SHARE" />
          <h2
            id="network-distribution-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0A0A0B] sm:text-5xl"
          >
            <SplitText
              text="MULTI-CHAIN SETTLEMENT PIPELINES"
              mode="chars-flip-y"
              className="justify-start"
            />
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-600">
          <span>PRIMARY THROUGHPUT: BNB SMART CHAIN (85%)</span>
          <InfoTooltip
            label="Networks"
            content={tooltipCopy.networks}
            align="right"
          />
        </div>
      </div>

      {/* Horizontal Capsule Pipelines */}
      <div className="space-y-4">
        {stats.networks.map((network, idx) => {
          const isHovered = hoveredNetwork === network.name;

          return (
            <motion.div
              key={network.name}
              initial={
                reducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, x: -40 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: idx * 0.15,
                duration: 0.75,
                ease: EASE_OUT_EXPO,
              }}
              onMouseEnter={() => setHoveredNetwork(network.name)}
              onMouseLeave={() => setHoveredNetwork(null)}
              onFocus={() => setHoveredNetwork(network.name)}
              onBlur={() => setHoveredNetwork(null)}
              tabIndex={0}
              role="group"
              aria-label={`${network.name}: ${network.percentage}% of volume, ${network.transactions} transactions`}
              className="group relative rounded-2xl border-2 border-[#0A0A0B] bg-white px-6 py-5 shadow-[4px_4px_0px_0px_#0A0A0B] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_#2563EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              {/* Morphing Floating Tooltip ("X transactions") */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, filter: "blur(8px)", y: 6 }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, filter: "blur(6px)", y: 4 }}
                    transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                    className="pointer-events-none absolute -top-12 right-8 z-30 flex items-center gap-2.5 rounded-xl border-2 border-[#0A0A0B] bg-[#0A0A0B] px-4 py-1.5 text-white shadow-[3px_3px_0px_0px_#2563EB]"
                  >
                    <NetworkLogo name={network.name} className="h-5 w-5 rounded-md border border-white/30 shadow-none" />
                    <span className="font-mono text-xs font-bold text-white">
                      {network.transactions.toLocaleString()} transactions
                    </span>
                    <span className="font-mono text-[10px] text-[#60A5FA]">
                      ({network.percentage}% share)
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Capsule Content Row */}
              <motion.div
                animate={{
                  paddingTop: isHovered && !reducedMotion ? 4 : 0,
                  paddingBottom: isHovered && !reducedMotion ? 4 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
              >
                {/* Network Logo + Label */}
                <div className="flex w-52 shrink-0 items-center gap-3.5">
                  <NetworkLogo name={network.name} />
                  <span className="font-sans text-sm font-bold text-[#0A0A0B]">
                    {network.name}
                  </span>
                </div>

                {/* SVG Stroke-Dashoffset Pipeline Bar (Brand Blue & Solid Black, Zero Gradients) */}
                <div className="relative flex-1">
                  <svg
                    viewBox="0 0 1000 16"
                    preserveAspectRatio="none"
                    className="h-3.5 w-full overflow-visible rounded-full"
                  >
                    {/* Track */}
                    <line
                      x1="0"
                      y1="8"
                      x2="1000"
                      y2="8"
                      stroke="#E4E4E7"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Animated Solid Brand Blue Draw Line */}
                    <motion.line
                      x1="0"
                      y1="8"
                      x2={Math.max(network.percentage * 10, 18)}
                      y2="8"
                      stroke={isHovered ? "#2563EB" : idx === 0 ? "#2563EB" : "#0A0A0B"}
                      strokeWidth={isHovered ? "14" : "10"}
                      strokeLinecap="round"
                      pathLength={1}
                      initial={{ pathLength: reducedMotion ? 1 : 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        delay: idx * 0.15 + 0.1,
                        duration: 2,
                        ease: EASE_CINEMATIC,
                      }}
                    />
                  </svg>
                </div>

                {/* Counting Percentage */}
                <div className="flex w-20 shrink-0 justify-end">
                  <AnimatedCounter
                    value={network.percentage}
                    suffix="%"
                    formatCommas={false}
                    className="text-lg font-bold text-[#0A0A0B]"
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
