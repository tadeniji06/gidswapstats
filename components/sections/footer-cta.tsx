"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/primitives/split-text";
import { MagneticButton } from "@/components/primitives/magnetic-button";
import { EASE_OUT_EXPO } from "@/lib/animations";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
});

const FOOTER_LINKS = [
  { label: "Start Swapping", href: "https://gidswap.com", external: true },
  { label: "Start Trading", href: "https://gidswap.com", external: true },
  { label: "Volume Metrics", href: "#stats-grid", external: false },
  { label: "Networks", href: "#network-distribution", external: false },
  { label: "Execution Flow", href: "#transaction-flow", external: false },
  { label: "X / Twitter", href: "https://x.com/cryptopaddyng", external: true },
  { label: "Telegram", href: "https://t.me/gidswap", external: true },
];

/**
 * SECTION 7 — FOOTER CTA (FINAL SCENE)
 * - Framed inside a bold high-contrast card with 2px #0A0A0B border & Brand Blue (#2563EB) tactile offset shadow.
 * - Massive headline: "START SWAPPING. START TRADING."
 * - Bigger official GidSwap Light-Mode logo (`/images/Gidswaplogo.png`).
 * - Dominant CTA button with strong visual priority.
 */
export function FooterCtaSection() {
  return (
    <footer
      aria-labelledby="footer-cta-heading"
      className="relative z-10 overflow-hidden bg-[#F3F2EE] px-6 pt-20 pb-16 md:pt-32"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border-2 border-[#0A0A0B] bg-white px-6 py-20 shadow-[8px_8px_0px_0px_#2563EB] sm:px-12 md:py-28">
        {/* Returning 3D Brand Blue Icosahedron Centerpiece (centered behind text) */}
        <div
          aria-hidden="true"
          className="pointer-events-auto absolute top-1/2 left-1/2 z-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 opacity-75"
        >
          <HeroScene scale={0.78} />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Bigger Official GidSwap Light Mode Logo */}
          <Link
            href="https://gidswap.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 inline-flex items-center gap-3 rounded-2xl border-2 border-[#0A0A0B] bg-[#F3F2EE] px-6 py-3 shadow-[4px_4px_0px_0px_#0A0A0B] transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/images/Gidswaplogo.png"
              alt="GidSwap Logo"
              width={190}
              height={60}
              className="h-11 w-auto object-contain sm:h-12"
            />
          </Link>

          <span className="mb-6 rounded-xl border-2 border-[#0A0A0B] bg-[#2563EB] px-4 py-1.5 font-mono text-xs font-bold tracking-[0.2em] uppercase text-white shadow-[3px_3px_0px_0px_#0A0A0B]">
            06 // READY TO SWAP & TRADE
          </span>

          {/* Reversed 3D Letter Entrance Headline */}
          <h2
            id="footer-cta-heading"
            className="font-display text-4xl leading-[1.1] font-bold tracking-tight text-[#0A0A0B] sm:text-6xl md:text-7xl"
          >
            <SplitText
              text="START SWAPPING. START TRADING."
              mode="footer-letters"
              highlightWords={["SWAPPING.", "TRADING."]}
            />
          </h2>

          <p className="mt-6 max-w-xl font-sans text-base font-medium text-zinc-700 sm:text-lg">
            Instant crypto-to-fiat cashouts, fiat onramps, and direct crypto-to-crypto
            swaps in seconds.
          </p>

          {/* High-Priority CTA Buttons linking directly to gidswap.com */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <MagneticButton
              primaryText="START SWAPPING NOW"
              hoverText="START TRADING ON GIDSWAP →"
              href="https://gidswap.com"
              target="_blank"
              icon={<ArrowUpRight className="h-4 w-4" />}
            />

            <a
              href="https://gidswap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#0A0A0B] bg-[#F3F2EE] px-8 py-5 font-mono text-sm font-bold tracking-[0.16em] uppercase text-[#0A0A0B] shadow-[5px_5px_0px_0px_#0A0A0B] transition-all hover:-translate-y-0.5 hover:bg-[#0A0A0B] hover:text-white"
            >
              <span>START TRADING</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="mx-auto mt-12 max-w-6xl">
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-b-2 border-[#0A0A0B]/15 pb-8"
        >
          {FOOTER_LINKS.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.08,
                duration: 0.6,
                ease: EASE_OUT_EXPO,
              }}
              className="group relative py-1 font-mono text-xs font-bold tracking-[0.16em] uppercase text-zinc-700 transition-colors hover:text-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#2563EB] transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </motion.a>
          ))}
        </nav>

        <div className="mt-8 flex w-full flex-col items-center justify-between gap-4 text-xs text-zinc-600 sm:flex-row">
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#0A0A0B]">
            © 2024–2026 GIDSWAP
          </span>
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#0A0A0B]">
            $85,560 VERIFIED VOLUME · 1,500 TRANSACTIONS
          </span>
        </div>
      </div>
    </footer>
  );
}
