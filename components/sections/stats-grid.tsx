"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, ArrowLeftRight, Landmark, Repeat } from "lucide-react";
import { stats, tooltipCopy } from "@/data/stats";
import { AnimatedCounter } from "@/components/primitives/animated-counter";
import { TiltCard } from "@/components/primitives/tilt-card";
import { InfoTooltip } from "@/components/primitives/info-tooltip";
import { ScrollEyebrow } from "@/components/primitives/scroll-eyebrow";
import {
  EASE_OUT_EXPO,
  sectionMaskUpVariants,
  statCardVariants,
} from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface StatCardItem {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  subtext: string;
  badgeText: string;
  inverted?: boolean;
  tooltipLabel: string;
  tooltipContent: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STAT_CARDS: StatCardItem[] = [
  {
    id: "total-volume",
    label: "TOTAL VOLUME",
    value: stats.totalVolume,
    prefix: "$",
    subtext: "$45.5K Fiat + $40K Crypto Swaps",
    badgeText: "ALL RAILS COMBINED",
    inverted: true,
    tooltipLabel: "Total Volume",
    tooltipContent: tooltipCopy.totalVolume,
    icon: Activity,
  },
  {
    id: "fiat-volume",
    label: "ONRAMP / OFFRAMP",
    value: stats.onrampOfframpVolume,
    prefix: "$",
    subtext: "Direct fiat-to-crypto & cashouts",
    badgeText: "53.2% OF VOLUME",
    tooltipLabel: "Onramp/Offramp Volume",
    tooltipContent: tooltipCopy.onrampOfframpVolume,
    icon: Landmark,
  },
  {
    id: "crypto-swap-volume",
    label: "CRYPTO-TO-CRYPTO",
    value: stats.cryptoToCryptoVolume,
    prefix: "$",
    subtext: "Direct instant token swaps",
    badgeText: "46.8% OF VOLUME",
    tooltipLabel: "Crypto-to-Crypto Volume",
    tooltipContent: tooltipCopy.cryptoToCryptoVolume,
    icon: Repeat,
  },
  {
    id: "transactions",
    label: "TRANSACTIONS",
    value: stats.totalTransactions,
    subtext: "900 settled · 60% success rate",
    badgeText: "5 NETWORKS",
    tooltipLabel: "Settled",
    tooltipContent: tooltipCopy.settled,
    icon: ArrowLeftRight,
  },
];

/**
 * SECTION 2 — STATS COUNTERS SECTION (ODO-METER NUMBERS)
 * - Crisp white cards with 2px #0A0A0B borders and tactile offset shadows on #F3F2EE stone canvas.
 * - Brand Blue (#2563EB) accents. Zero gradients.
 */
export function StatsGridSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="stats-grid"
      aria-labelledby="stats-grid-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-40"
    >
      {/* Header */}
      <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <ScrollEyebrow index="01" label="KEY METRICS · VERIFIED OUTPUT" />
          <div className="mt-4 overflow-hidden">
            <motion.h2
              id="stats-grid-heading"
              variants={sectionMaskUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="font-display text-3xl font-bold tracking-tight text-[#0A0A0B] sm:text-5xl"
            >
              Quantified execution across every rail.
            </motion.h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-[#0A0A0B]">
          <span className="rounded-xl border-2 border-[#0A0A0B] bg-white px-3.5 py-1.5 shadow-[3px_3px_0px_0px_#0A0A0B]">
            SUCCESS RATE: <strong>{stats.successRate}%</strong>
          </span>
          <span className="rounded-xl border-2 border-[#0A0A0B] bg-white px-3.5 py-1.5 shadow-[3px_3px_0px_0px_#2563EB]">
            NETWORKS: <strong>{stats.networks.length} CHAINS</strong>
          </span>
          <InfoTooltip
            label="Success Rate"
            content={tooltipCopy.successRate}
            align="right"
          />
        </div>
      </div>

      {/* 4 Odometer Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 [perspective:1200px]">
        {STAT_CARDS.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.id}
              custom={index}
              variants={statCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="h-full"
            >
              <TiltCard
                className={
                  card.inverted
                    ? "h-full border-2 border-[#0A0A0B] bg-[#0A0A0B] p-7 text-white shadow-[5px_5px_0px_0px_#2563EB] hover:bg-[#0A0A0B] hover:shadow-[8px_8px_0px_0px_#2563EB]"
                    : "h-full p-7"
                }
              >
                <div className="flex h-full flex-col justify-between gap-9">
                  {/* Top Row: Expanding Label + Tooltip + Spring Icon */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        initial={{ letterSpacing: "1.5px" }}
                        whileInView={{
                          letterSpacing: reducedMotion ? "1.5px" : "3px",
                        }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
                        className={`font-mono text-[11px] font-bold uppercase ${
                          card.inverted ? "text-zinc-300" : "text-zinc-600"
                        }`}
                      >
                        {card.label}
                      </motion.span>
                      <InfoTooltip
                        label={card.tooltipLabel}
                        content={card.tooltipContent}
                      />
                    </div>

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 transition-transform duration-300 group-hover:rotate-[15deg] ${
                        card.inverted
                          ? "border-zinc-700 bg-zinc-900 text-[#60A5FA]"
                          : "border-[#0A0A0B] bg-[#F3F2EE] text-[#2563EB]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Odometer Number */}
                  <div>
                    <span
                      className={`mb-2.5 inline-block rounded-lg border border-[#0A0A0B] px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase ${
                        card.inverted
                          ? "bg-[#2563EB] text-white"
                          : "bg-[#F3F2EE] text-[#0A0A0B]"
                      }`}
                    >
                      {card.badgeText}
                    </span>
                    <div
                      className={`text-4xl font-bold tracking-tight sm:text-[2.6rem] ${
                        card.inverted ? "text-white" : "text-[#0A0A0B]"
                      }`}
                    >
                      <AnimatedCounter
                        value={card.value}
                        prefix={card.prefix}
                        suffix={card.suffix}
                      />
                    </div>
                    <p
                      className={`mt-3 font-mono text-xs font-medium ${
                        card.inverted ? "text-zinc-300" : "text-zinc-600"
                      }`}
                    >
                      {card.subtext}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
