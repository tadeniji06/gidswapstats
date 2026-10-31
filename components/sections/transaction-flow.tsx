"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Banknote, Wallet } from "lucide-react";
import { stats, tooltipCopy } from "@/data/stats";
import { InfoTooltip } from "@/components/primitives/info-tooltip";
import { Marquee } from "@/components/primitives/marquee";
import { ScrollEyebrow } from "@/components/primitives/scroll-eyebrow";
import { NetworkLogo } from "@/components/primitives/network-logo";
import {
  EASE_CINEMATIC,
  EASE_OUT_EXPO,
  sectionMaskUpVariants,
} from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * SECTION 5 — TRANSACTION FLOW DIAGRAM (THE HERO NARRATIVE)
 * - Clean 3-node diagram with 2px borders, Network Logos, and Brand Blue (#2563EB) accents over #F3F2EE stone background.
 */
export function TransactionFlowSection() {
  const [hoveredNode, setHoveredNode] = useState<"in" | "core" | "out" | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="transaction-flow"
      aria-labelledby="transaction-flow-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-40"
    >
      {/* Header */}
      <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <ScrollEyebrow index="04" label="EXECUTION FLOW · ATOMIC ROUTING" />
          <div className="mt-4 overflow-hidden">
            <motion.h2
              id="transaction-flow-heading"
              variants={sectionMaskUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="font-display text-3xl font-bold tracking-tight text-[#0A0A0B] sm:text-5xl"
            >
              Seamless execution from start to finish.
            </motion.h2>
          </div>
        </div>

        <p className="max-w-xs font-mono text-xs font-bold text-zinc-600">
          ONRAMP · OFFRAMP · DIRECT CRYPTO SWAPS
        </p>
      </div>

      {/* 3-Node Diagram + Connecting Animated SVG Path */}
      <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_130px_1.15fr_130px_1fr] lg:gap-0">
        {/* NODE 1: CRYPTO / FIAT IN */}
        <motion.div
          initial={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 0, x: -70, filter: "blur(10px)" }
          }
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
          whileHover={reducedMotion ? undefined : { y: -6 }}
          onMouseEnter={() => setHoveredNode("in")}
          onMouseLeave={() => setHoveredNode(null)}
          className={cn(
            "group relative z-10 rounded-3xl border-2 border-[#0A0A0B] bg-white p-7 shadow-[5px_5px_0px_0px_#0A0A0B] transition-all duration-300",
            hoveredNode === "in" && "shadow-[8px_8px_0px_0px_#2563EB]"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
              STAGE 01 // INPUT
            </span>
            <InfoTooltip
              label="Networks"
              content={tooltipCopy.networks}
              align="right"
            />
          </div>

          <div className="mt-5 flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#0A0A0B] bg-[#F3F2EE] text-[#2563EB] transition-transform duration-300 group-hover:rotate-[15deg]">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold tracking-wider text-[#0A0A0B]">
                [CRYPTO / FIAT IN]
              </h3>
              <p className="font-sans text-xs font-medium text-zinc-600">
                USDT · USDC · BTC · ETH · NGN
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t-2 border-[#0A0A0B]/10 pt-4">
            <div className="flex items-center -space-x-1.5">
              {stats.networks.map((net) => (
                <NetworkLogo
                  key={net.name}
                  name={net.name}
                  className="h-6 w-6 rounded-full border border-[#0A0A0B] shadow-none ring-2 ring-white"
                />
              ))}
            </div>
            <span className="font-mono text-[10px] font-bold text-[#2563EB]">
              5 NETWORKS
            </span>
          </div>
        </motion.div>

        {/* CONNECTOR 1 */}
        <FlowConnector active={hoveredNode === "in" || hoveredNode === "core"} />

        {/* NODE 2: GIDSWAP CORE (Solid Black Centerpiece Card with Brand Blue Shadow) */}
        <motion.div
          initial={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 0, scale: 0.78, rotateY: -90 }
          }
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.18, duration: 0.95, ease: EASE_OUT_EXPO }}
          whileHover={reducedMotion ? undefined : { y: -6 }}
          onMouseEnter={() => setHoveredNode("core")}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ transformPerspective: 1000 }}
          className="group relative z-10 rounded-3xl border-2 border-[#0A0A0B] bg-[#0A0A0B] p-7 text-white shadow-[7px_7px_0px_0px_#2563EB] transition-all duration-300"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#60A5FA]">
                STAGE 02 // ENGINE
              </span>
              <InfoTooltip
                label="Average Processing Time"
                content={tooltipCopy.averageProcessingTime}
                pulse
                align="right"
              />
            </div>

            <div className="mt-5 flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 p-2 transition-transform duration-300 group-hover:rotate-[15deg]">
                <Image
                  src="/images/gidswap-icon.png"
                  alt="GidSwap Icon"
                  width={34}
                  height={34}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="font-mono text-lg font-bold tracking-wider text-white">
                  [GIDSWAP]
                </h3>
                <p className="font-sans text-xs text-zinc-300">
                  Instant Quote & Liquidity Engine
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4 font-mono text-[11px] font-bold text-[#60A5FA]">
              <span>NON-CUSTODIAL</span>
              <span>~04:00 MEDIAN</span>
            </div>
          </div>
        </motion.div>

        {/* CONNECTOR 2 */}
        <FlowConnector active={hoveredNode === "core" || hoveredNode === "out"} delay={1.5} />

        {/* NODE 3: FIAT / CRYPTO OUT */}
        <motion.div
          initial={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 0, x: 70, filter: "blur(10px)" }
          }
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.34, duration: 0.85, ease: EASE_OUT_EXPO }}
          whileHover={reducedMotion ? undefined : { y: -6 }}
          onMouseEnter={() => setHoveredNode("out")}
          onMouseLeave={() => setHoveredNode(null)}
          className={cn(
            "group relative z-10 rounded-3xl border-2 border-[#0A0A0B] bg-white p-7 shadow-[5px_5px_0px_0px_#0A0A0B] transition-all duration-300",
            hoveredNode === "out" && "shadow-[8px_8px_0px_0px_#2563EB]"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
              STAGE 03 // OUTPUT
            </span>
            <InfoTooltip
              label="Settled"
              content={tooltipCopy.settled}
              align="right"
            />
          </div>

          <div className="mt-5 flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#0A0A0B] bg-[#F3F2EE] text-[#2563EB] transition-transform duration-300 group-hover:rotate-[15deg]">
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold tracking-wider text-[#0A0A0B]">
                [FIAT / CRYPTO OUT]
              </h3>
              <p className="font-sans text-xs font-medium text-zinc-600">
                Direct Bank & Wallet Payouts
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t-2 border-[#0A0A0B]/10 pt-4 font-mono text-[10px] font-bold text-[#0A0A0B]">
            <span className="text-[#2563EB]">$45.5K FIAT</span>
            <span>$40K SWAPS</span>
          </div>
        </motion.div>
      </div>

      {/* Live Settled Transaction Ticker */}
      <div className="mt-16">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600">
          <span>RECENT SETTLED TRANSACTIONS</span>
          <span>HOVER TO PAUSE</span>
        </div>
        <Marquee />
      </div>
    </section>
  );
}

function FlowConnector({
  active,
  delay = 0,
}: {
  active: boolean;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative flex h-12 w-full items-center justify-center lg:h-full"
    >
      {/* Desktop Horizontal SVG Path */}
      <svg
        viewBox="0 0 130 32"
        className="hidden h-8 w-full overflow-visible lg:block"
      >
        <line
          x1="0"
          y1="16"
          x2="130"
          y2="16"
          stroke="#D4D4D8"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <motion.line
          x1="0"
          y1="16"
          x2="130"
          y2="16"
          stroke={active ? "#2563EB" : "#0A0A0B"}
          strokeWidth={active ? "3" : "2"}
          pathLength={1}
          initial={{ pathLength: reducedMotion ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
        />

        {/* Traveling Packet Dot on 3s loop */}
        {!reducedMotion && (
          <motion.circle
            r="5"
            cy="16"
            fill="#2563EB"
            stroke="#0A0A0B"
            strokeWidth="1.5"
            initial={{ cx: 0, opacity: 0 }}
            animate={{
              cx: [0, 130],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>

      {/* Mobile Vertical SVG Path */}
      <svg
        viewBox="0 0 32 48"
        className="block h-12 w-8 overflow-visible lg:hidden"
      >
        <line
          x1="16"
          y1="0"
          x2="16"
          y2="48"
          stroke="#2563EB"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
      </svg>
    </div>
  );
}
