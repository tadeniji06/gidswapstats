"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightLeft, Landmark, Orbit, RotateCw } from "lucide-react";
import { stats, tooltipCopy } from "@/data/stats";
import { InfoTooltip } from "@/components/primitives/info-tooltip";
import { ScrollEyebrow } from "@/components/primitives/scroll-eyebrow";
import { sectionMaskUpVariants } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { formatCurrency } from "@/lib/utils";

/**
 * SECTION 3 — VOLUME BREAKDOWN (PINNED SCENE TRANSITION)
 * - Warm stone background (#F3F2EE) with crisp white cards, 2px borders, and solid Brand Blue (#2563EB) accents.
 * - Left panel ("ONRAMP / OFFRAMP VOLUME" — $55,000) and Right panel ("CRYPTO-TO-CRYPTO VOLUME" — $40,000)
 *   slide horizontally toward each other and converge into the central "TOTAL VOLUME" ($95,000) card.
 */
export function VolumeBreakdownSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const mergedCardRef = useRef<HTMLDivElement | null>(null);

  const [onrampCount, setOnrampCount] = useState<number>(stats.onrampOfframpVolume);
  const [cryptoCount, setCryptoCount] = useState<number>(stats.cryptoToCryptoVolume);
  const [totalCount, setTotalCount] = useState<number>(stats.totalVolume);
  const [isFlipped, setIsFlipped] = useState(false);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      setOnrampCount(stats.onrampOfframpVolume);
      setCryptoCount(stats.cryptoToCryptoVolume);
      setTotalCount(stats.totalVolume);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const counterState = {
      onramp: 0,
      crypto: 0,
      total: 55000,
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        leftPanelRef.current,
        { xPercent: -35, opacity: 0.25, scale: 0.94 },
        { xPercent: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        0
      );

      tl.fromTo(
        rightPanelRef.current,
        { xPercent: 35, opacity: 0.25, scale: 0.94 },
        { xPercent: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        0
      );

      tl.to(
        counterState,
        {
          onramp: stats.onrampOfframpVolume,
          crypto: stats.cryptoToCryptoVolume,
          duration: 0.5,
          ease: "power1.out",
          onUpdate: () => {
            setOnrampCount(Math.round(counterState.onramp));
            setCryptoCount(Math.round(counterState.crypto));
          },
        },
        0
      );

      tl.to(
        leftPanelRef.current,
        {
          xPercent: 28,
          scale: 0.86,
          opacity: 0.2,
          duration: 0.45,
          ease: "power2.inOut",
        },
        0.55
      );

      tl.to(
        rightPanelRef.current,
        {
          xPercent: -28,
          scale: 0.86,
          opacity: 0.2,
          duration: 0.45,
          ease: "power2.inOut",
        },
        0.55
      );

      tl.fromTo(
        mergedCardRef.current,
        { scale: 0.78, opacity: 0, y: 24 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "back.out(1.6)",
        },
        0.58
      );

      tl.to(
        counterState,
        {
          total: stats.totalVolume,
          duration: 0.42,
          ease: "power2.out",
          onUpdate: () => {
            setTotalCount(Math.round(counterState.total));
          },
        },
        0.58
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="volume-breakdown-heading"
      className="relative z-10 flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-[#F3F2EE] px-6 py-24 md:py-40"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <ScrollEyebrow index="02" label="VOLUME BREAKDOWN · DUAL ENGINE" />
            <div className="mt-4 overflow-hidden">
              <motion.h2
                id="volume-breakdown-heading"
                variants={sectionMaskUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="font-display text-3xl font-bold tracking-tight text-[#0A0A0B] sm:text-5xl"
              >
                Onramp, Offramp & $40K Crypto Swaps.
              </motion.h2>
            </div>
          </div>

          <p className="font-mono text-xs font-bold text-zinc-600">
            SCROLL TO CONVERGE · HOVER CENTER CARD TO FLIP
          </p>
        </div>

        {/* Stage Container */}
        <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-6 lg:min-h-[450px]">
          {/* Split Panels */}
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Panel: Onramp / Offramp */}
            <div
              ref={leftPanelRef}
              className="rounded-3xl border-2 border-[#0A0A0B] bg-white p-8 shadow-[6px_6px_0px_0px_#0A0A0B] will-change-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Landmark className="h-5 w-5 text-[#2563EB]" />
                  <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#0A0A0B]">
                    ONRAMP / OFFRAMP VOLUME
                  </span>
                </div>
                <InfoTooltip
                  label="Onramp/Offramp Volume"
                  content={tooltipCopy.onrampOfframpVolume}
                  pulse
                  align="right"
                />
              </div>

              <div className="mt-7 font-mono text-4xl font-bold tracking-tight text-[#0A0A0B] sm:text-5xl">
                {formatCurrency(onrampCount)}
              </div>

              <p className="mt-2 font-sans text-xs font-medium text-zinc-600">
                Instant fiat-to-crypto purchases and direct crypto-to-cash bank settlements.
              </p>

              <div className="mt-6 flex items-center justify-between border-t-2 border-[#0A0A0B]/10 pt-4 font-mono text-xs font-bold text-zinc-600">
                <span>SHARE OF VOLUME</span>
                <span className="rounded-md border border-[#0A0A0B] bg-[#2563EB] px-2.5 py-0.5 text-white">
                  57.9% · FIAT RAILS
                </span>
              </div>
            </div>

            {/* Right Panel: Crypto-to-Crypto Swaps ($40,000) */}
            <div
              ref={rightPanelRef}
              className="rounded-3xl border-2 border-[#0A0A0B] bg-white p-8 shadow-[6px_6px_0px_0px_#0A0A0B] will-change-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ArrowRightLeft className="h-5 w-5 text-[#2563EB]" />
                  <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[#0A0A0B]">
                    CRYPTO-TO-CRYPTO VOLUME
                  </span>
                </div>
                <InfoTooltip
                  label="Crypto-to-Crypto Volume"
                  content={tooltipCopy.cryptoToCryptoVolume}
                  pulse
                  align="right"
                />
              </div>

              <div className="mt-7 font-mono text-4xl font-bold tracking-tight text-[#0A0A0B] sm:text-5xl">
                {formatCurrency(cryptoCount)}
              </div>

              <p className="mt-2 font-sans text-xs font-medium text-zinc-600">
                Direct cross-chain token swaps across BTC, ETH, USDT, and USDC.
              </p>

              <div className="mt-6 flex items-center justify-between border-t-2 border-[#0A0A0B]/10 pt-4 font-mono text-xs font-bold text-zinc-600">
                <span>SHARE OF VOLUME</span>
                <span className="rounded-md border border-[#0A0A0B] bg-[#0A0A0B] px-2.5 py-0.5 text-white">
                  42.1% · DIRECT SWAPS
                </span>
              </div>
            </div>
          </div>

          {/* Merged Center Card (Floats ±6px Y on 4s loop + 3D Card Flip on hover/click) */}
          <div
            ref={mergedCardRef}
            className="w-full max-w-xl lg:absolute lg:top-1/2 lg:left-1/2 lg:z-20 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <motion.div
              animate={
                reducedMotion
                  ? undefined
                  : {
                      y: [-6, 6, -6],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
              onClick={() => setIsFlipped((prev) => !prev)}
              role="button"
              tabIndex={0}
              aria-label="Merged Total Volume Card. Hover or press Enter to flip for breakdown by source."
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsFlipped((prev) => !prev);
                }
              }}
              className="group cursor-pointer [perspective:1200px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative min-h-[290px] w-full [transform-style:preserve-3d]"
              >
                {/* FRONT FACE: Solid Black High-Contrast Card ($95,000) with Brand Blue Shadow */}
                <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border-2 border-[#0A0A0B] bg-[#0A0A0B] p-8 text-white shadow-[8px_8px_0px_0px_#2563EB] [backface-visibility:hidden]">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1">
                      <Orbit className="h-3.5 w-3.5 text-[#60A5FA]" />
                      <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-white">
                        TOTAL VOLUME
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <InfoTooltip
                        label="Total Volume"
                        content={tooltipCopy.totalVolume}
                        pulse
                        align="right"
                      />
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-wider uppercase text-zinc-300">
                        <RotateCw className="h-3 w-3 text-[#60A5FA]" />
                        FLIP
                      </span>
                    </div>
                  </div>

                  <div className="my-3">
                    <div className="font-mono text-5xl font-bold tracking-tight text-white sm:text-6xl">
                      {formatCurrency(totalCount)}
                    </div>
                    <p className="mt-2 font-sans text-xs text-zinc-300">
                      Combined settled throughput across Onramp/Offramp ($55,000) and Crypto-to-Crypto Swaps ($40,000).
                    </p>
                  </div>

                  {/* Proportional split bar (Solid Brand Blue + Solid White, Zero Gradients) */}
                  <div>
                    <div className="flex h-3 w-full overflow-hidden rounded-full border border-zinc-700 bg-zinc-800">
                      <div
                        style={{ width: "57.9%" }}
                        className="h-full bg-[#2563EB]"
                      />
                      <div
                        style={{ width: "42.1%" }}
                        className="h-full bg-white"
                      />
                    </div>
                    <div className="mt-2.5 flex justify-between font-mono text-[11px] font-bold text-zinc-300">
                      <span className="text-[#60A5FA]">ON/OFFRAMP: $55,000 (58%)</span>
                      <span className="text-white">CRYPTO SWAPS: $40,000 (42%)</span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE: Crisp White Card with 2px Black Border & Shadow */}
                <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border-2 border-[#0A0A0B] bg-white p-8 text-[#0A0A0B] shadow-[8px_8px_0px_0px_#0A0A0B] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#0A0A0B]">
                      BREAKDOWN BY SOURCE & ASSET
                    </span>
                    <span className="font-mono text-[11px] font-bold text-zinc-500">
                      JAN 2024 – OCT 2026
                    </span>
                  </div>

                  <div className="my-2 space-y-2.5">
                    <div className="flex items-center justify-between rounded-xl border-2 border-[#0A0A0B] bg-[#F3F2EE] px-4 py-2.5">
                      <span className="font-sans text-xs font-bold text-[#0A0A0B]">
                        Fiat Onramp / Offramp
                      </span>
                      <span className="font-mono text-sm font-bold text-[#2563EB]">
                        $55,000 (57.9%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border-2 border-[#0A0A0B] bg-[#0A0A0B] px-4 py-2.5 text-white">
                      <span className="font-sans text-xs font-bold">
                        Crypto-to-Crypto Swaps
                      </span>
                      <span className="font-mono text-sm font-bold text-[#60A5FA]">
                        $40,000 (42.1%)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="flex items-center justify-between rounded-xl border-2 border-[#0A0A0B] bg-white px-3.5 py-2">
                        <span className="font-mono text-xs font-bold text-zinc-600">USDT SHARE</span>
                        <span className="font-mono text-xs font-bold text-[#0A0A0B]">65%</span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border-2 border-[#0A0A0B] bg-white px-3.5 py-2">
                        <span className="font-mono text-xs font-bold text-zinc-600">USDC / BTC / ETH</span>
                        <span className="font-mono text-xs font-bold text-[#0A0A0B]">35%</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-mono text-[10px] font-bold tracking-wider uppercase text-zinc-500">
                    AUDITED GIDSWAP TELEMETRY · ZERO CUSTODIAL FLOAT
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
