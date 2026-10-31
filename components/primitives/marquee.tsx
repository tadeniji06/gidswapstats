"use client";

import React from "react";
import { recentTransactions, type FakeTransaction } from "@/data/stats";
import { NetworkLogo } from "@/components/primitives/network-logo";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  items?: readonly FakeTransaction[];
  className?: string;
}

/**
 * Infinite Scrolling Transaction Ticker with Network Logos, bold borders & tactile offset shadows.
 */
export function Marquee({ items = recentTransactions, className }: MarqueeProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        aria-label="Recent settled transactions"
        className={cn(
          "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {items.slice(0, 6).map((tx) => (
          <TickerCard key={tx.id} tx={tx} />
        ))}
      </div>
    );
  }

  const doubledItems = [...items, ...items];

  return (
    <div
      aria-label="Live settled transaction feed"
      className={cn("relative w-full overflow-hidden py-3", className)}
    >
      <div className="animate-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
        {doubledItems.map((tx, idx) => (
          <TickerCard key={`${tx.id}-${idx}`} tx={tx} />
        ))}
      </div>
    </div>
  );
}

function TickerCard({ tx }: { tx: FakeTransaction }) {
  const isSwap = tx.type === "SWAP";
  return (
    <div className="flex shrink-0 items-center gap-3.5 rounded-xl border-2 border-[#0A0A0B] bg-white px-4 py-2.5 text-xs shadow-[3px_3px_0px_0px_#0A0A0B] transition-transform hover:-translate-y-0.5">
      <NetworkLogo name={tx.network} className="h-6 w-6 rounded-md shadow-none" />

      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#0A0A0B]">
        {tx.id}
      </span>

      <span
        className={cn(
          "rounded-md border border-[#0A0A0B] px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider uppercase",
          isSwap
            ? "bg-[#0A0A0B] text-white"
            : "bg-[#2563EB] text-white"
        )}
      >
        {tx.type}
      </span>

      <span className="font-mono font-bold text-[#0A0A0B]">{tx.pair}</span>
      <span className="font-mono font-bold text-[#2563EB]">{tx.amount}</span>
      <span className="rounded-md border border-[#0A0A0B]/20 bg-[#F3F2EE] px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-700">
        {tx.network} · {tx.duration}
      </span>
    </div>
  );
}
