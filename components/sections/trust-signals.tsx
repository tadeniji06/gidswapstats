"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ShieldCheck } from "lucide-react";
import { stats, tooltipCopy } from "@/data/stats";
import { AnimatedCounter } from "@/components/primitives/animated-counter";
import { TiltCard } from "@/components/primitives/tilt-card";
import { InfoTooltip } from "@/components/primitives/info-tooltip";
import { ScrollEyebrow } from "@/components/primitives/scroll-eyebrow";
import {
  EASE_CINEMATIC,
  EASE_OUT_EXPO,
  sectionMaskUpVariants,
} from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * SECTION 6 — TRUST SIGNALS / SUCCESS METRICS
 * - Clean minimalist 2-card grid with 2px #0A0A0B borders, Brand Blue (#2563EB) accents, and tactile offset shadows.
 */
export function TrustSignalsSection() {
  const [checkComplete, setCheckComplete] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="trust-signals"
      aria-labelledby="trust-signals-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-40"
    >
      {/* Header */}
      <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <ScrollEyebrow index="05" label="RELIABILITY · SETTLEMENT FINALITY" />
          <div className="mt-4 overflow-hidden">
            <motion.h2
              id="trust-signals-heading"
              variants={sectionMaskUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="font-display text-3xl font-bold tracking-tight text-[#0A0A0B] sm:text-5xl"
            >
              Engineered for finality.
            </motion.h2>
          </div>
        </div>

        <p className="font-mono text-xs font-bold text-zinc-600">
          AUDITED CREATED → UPDATED TIMESTAMPS
        </p>
      </div>

      {/* 2 Clean High-Contrast Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Card 1: SETTLED (with SVG Self-Drawing Checkmark + Pulse Ring) */}
        <TiltCard className="p-8">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-[#2563EB] transition-transform duration-300 group-hover:rotate-[15deg]" />
                <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#0A0A0B]">
                  SETTLED ORDERS
                </span>
                <InfoTooltip
                  label="Settled"
                  content={tooltipCopy.settled}
                />
              </div>

              <span className="rounded-lg border-2 border-[#0A0A0B] bg-[#2563EB] px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">
                VERIFIED LEDGER
              </span>
            </div>

            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="text-5xl font-bold tracking-tight text-[#0A0A0B] sm:text-6xl">
                  <AnimatedCounter value={stats.settledTransactions} />
                </div>
                <p className="mt-3 font-sans text-sm font-medium text-zinc-600">
                  Completed payouts and direct swaps delivered out of{" "}
                  {stats.totalTransactions.toLocaleString()} initiated orders (
                  {stats.successRate}% settlement rate).
                </p>
              </div>

              {/* Self-Drawing Checkmark Badge + Pulse Ring */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-[#0A0A0B] bg-[#0A0A0B] shadow-[4px_4px_0px_0px_#2563EB]">
                {checkComplete && !reducedMotion && (
                  <motion.span
                    initial={{ scale: 0.85, opacity: 0.6 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#2563EB]"
                  />
                )}

                <svg
                  viewBox="0 0 52 52"
                  className="h-11 w-11 overflow-visible"
                  aria-hidden="true"
                >
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="22"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="2"
                    pathLength={1}
                    initial={{ pathLength: reducedMotion ? 1 : 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.1, ease: EASE_CINEMATIC }}
                  />
                  <motion.path
                    d="M16 26.5 L23 33.5 L36.5 19.5"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    initial={{ pathLength: reducedMotion ? 1 : 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      delay: 0.45,
                      duration: 0.9,
                      ease: EASE_OUT_EXPO,
                    }}
                    onAnimationComplete={() => setCheckComplete(true)}
                  />
                </svg>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Card 2: AVG PROCESSING TIME (Animated mm:ss Odometer Flip) */}
        <TiltCard className="p-8">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-[#2563EB] transition-transform duration-300 group-hover:rotate-[15deg]" />
                <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#0A0A0B]">
                  AVG PROCESSING TIME
                </span>
                <InfoTooltip
                  label="Average Processing Time"
                  content={tooltipCopy.averageProcessingTime}
                />
              </div>

              <span className="rounded-lg border-2 border-[#0A0A0B] bg-[#F3F2EE] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0A0A0B]">
                CREATED → UPDATED
              </span>
            </div>

            <div>
              <div
                aria-label="04 minutes 00 seconds median settlement time"
                className="flex items-baseline gap-1 font-mono text-5xl font-bold tracking-tight text-[#0A0A0B] sm:text-6xl"
              >
                <span className="text-zinc-400">0</span>
                <AnimatedCounter
                  value={stats.averageProcessingMinutes}
                  formatCommas={false}
                />
                <span className="mx-1 animate-pulse text-[#2563EB]">:</span>
                <span className="text-[#0A0A0B]">00</span>
                <span className="ml-3 rounded-md border border-[#0A0A0B] bg-[#F3F2EE] px-2 py-0.5 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#0A0A0B]">
                  MM:SS
                </span>
              </div>

              <p className="mt-4 font-sans text-sm font-medium text-zinc-600">
                Median settlement duration from quote creation to confirmed bank or
                wallet delivery across all 900 settled transactions.
              </p>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
