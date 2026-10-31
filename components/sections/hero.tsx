"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/primitives/split-text";
import { MagneticButton } from "@/components/primitives/magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center"
    >
      <div className="h-64 w-64 rounded-full border-2 border-[#2563EB]/25" />
    </div>
  ),
});

/**
 * SECTION 1 — CINEMATIC HERO SCENE
 * - Warm Stone Canvas (#F3F2EE) with crisp white elevated header & badges, 2px borders, and tactile shadows.
 * - Brand Blue (#2563EB) accents + Brand Blue 3D Wireframe Icosahedron in background.
 * - Dramatic 3D Jumping Headline ("REAL TRANSACTIONS. REAL VOLUME. REAL PROOF.").
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneWrapRef = useRef<HTMLDivElement | null>(null);
  const headlineWrapRef = useRef<HTMLDivElement | null>(null);
  const subWrapRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleFirstScroll = () => {
      if (window.scrollY > 24) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleFirstScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleFirstScroll);
  }, []);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=85%",
          pin: true,
          scrub: 1,
        },
      });

      if (sceneWrapRef.current) {
        tl.to(
          sceneWrapRef.current,
          {
            scale: 0.4,
            y: 160,
            opacity: 0.25,
            ease: "power2.inOut",
          },
          0
        );
      }

      if (headlineWrapRef.current) {
        tl.to(
          headlineWrapRef.current,
          {
            y: -140,
            opacity: 0,
            filter: "blur(14px)",
            ease: "power2.in",
          },
          0
        );
      }

      if (subWrapRef.current) {
        tl.to(
          subWrapRef.current,
          {
            y: -80,
            opacity: 0,
            ease: "power2.in",
          },
          0.08
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#F3F2EE] px-6 py-28"
    >
      {/* Top Tactile Header with Bigger Official GidSwap Logo & Brand Blue CTA */}
      <header className="absolute top-6 right-6 left-6 z-20 mx-auto flex max-w-6xl items-center justify-between rounded-2xl border-2 border-[#0A0A0B] bg-white px-6 py-4 shadow-[5px_5px_0px_0px_#0A0A0B]">
        <Link
          href="https://gidswap.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/images/Gidswaplogo.png"
            alt="GidSwap Logo"
            width={185}
            height={58}
            priority
            className="h-11 w-auto select-none object-contain sm:h-12"
          />
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-xl border-2 border-[#0A0A0B] bg-[#F3F2EE] px-4 py-2 md:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
            <span className="font-mono text-xs font-bold tracking-[0.14em] uppercase text-[#0A0A0B]">
              $85,560 VERIFIED VOLUME
            </span>
          </div>

          <a
            href="https://gidswap.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0A0A0B] bg-[#2563EB] px-5 py-2.5 font-mono text-xs font-bold tracking-[0.14em] uppercase text-white shadow-[3px_3px_0px_0px_#0A0A0B] transition-all hover:-translate-y-0.5 hover:bg-[#0A0A0B] hover:text-white"
          >
            <span>START SWAPPING</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Layer 1: 3D Centerpiece in Brand Blue (React Three Fiber) */}
      <div
        ref={sceneWrapRef}
        className="pointer-events-auto absolute inset-0 z-0 mx-auto flex h-full w-full max-w-4xl items-center justify-center opacity-85 will-change-transform"
      >
        <HeroScene />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto mt-14 flex max-w-5xl flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 inline-flex items-center gap-3 rounded-xl border-2 border-[#0A0A0B] bg-white px-4 py-2 shadow-[3px_3px_0px_0px_#0A0A0B]"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#0A0A0B]">
            PROOF OF WORK · JAN 2024 – OCT 2026
          </span>
        </motion.div>

        {/* Layer 2: Headline (Dramatic 3D letter-by-letter jump + wave + hover jump) */}
        <div ref={headlineWrapRef} className="will-change-transform">
          <h1
            id="hero-heading"
            className="font-display text-4xl leading-[1.1] font-bold tracking-tight text-[#0A0A0B] sm:text-6xl md:text-7xl lg:text-[4.8rem]"
          >
            <SplitText
              text="REAL TRANSACTIONS. REAL VOLUME. REAL PROOF."
              mode="hero-letters"
              highlightWords={["PROOF."]}
            />
          </h1>
        </div>

        {/* Layer 3: Subheadline (word-by-word mask reveal) */}
        <div ref={subWrapRef} className="mt-7 max-w-2xl will-change-transform">
          <p className="font-sans text-base leading-relaxed font-medium text-zinc-700 sm:text-lg">
            <SplitText
              text="Buy, Sell & Swap Crypto in seconds. $85,560 in verified volume across $45,560 Onramp & Offramp settlements and $40,000 in direct Crypto-to-Crypto swaps."
              mode="words-mask"
              highlightWords={["$85,560", "$45,560", "$40,000"]}
            />
          </p>
        </div>

        {/* Clean Solid Volume Pills with Borders & Brand Blue Shadows */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 rounded-xl border-2 border-[#0A0A0B] bg-white px-4 py-2 font-mono text-xs font-bold text-[#0A0A0B] shadow-[3px_3px_0px_0px_#0A0A0B]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
            <span>ONRAMP / OFFRAMP:</span>
            <strong>$45,560</strong>
          </div>
          <div className="flex items-center gap-2 rounded-xl border-2 border-[#0A0A0B] bg-[#0A0A0B] px-4 py-2 font-mono text-xs font-bold text-white shadow-[3px_3px_0px_0px_#2563EB]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
            <span>CRYPTO-TO-CRYPTO:</span>
            <strong>$40,000</strong>
          </div>
        </motion.div>

        {/* Layer 4: High-Priority Primary & Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            primaryText="START SWAPPING NOW"
            hoverText="START TRADING ON GIDSWAP →"
            href="https://gidswap.com"
            target="_blank"
            icon={<ArrowUpRight className="h-4 w-4" />}
          />

          <a
            href="#stats-grid"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#0A0A0B] bg-white px-7 py-5 font-mono text-sm font-bold tracking-[0.16em] uppercase text-[#0A0A0B] shadow-[5px_5px_0px_0px_#0A0A0B] transition-all hover:-translate-y-0.5 hover:bg-[#0A0A0B] hover:text-white"
          >
            <span>VIEW PROOF</span>
            <ArrowDownRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Layer 5: Scroll Hint (fades out after first scroll) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] font-bold tracking-[0.28em] uppercase text-zinc-600">
          scroll
        </span>
        <div className="relative h-10 w-[2px] overflow-hidden bg-[#0A0A0B]/20">
          <motion.div
            animate={
              reducedMotion
                ? undefined
                : {
                    y: ["-100%", "200%"],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1/2 w-full bg-[#2563EB]"
          />
        </div>
      </motion.div>
    </section>
  );
}
