"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface NetworkLogoProps {
  name: string;
  className?: string;
}

/**
 * Official Vector Brand Logos for GidSwap's 5 Supported Settlement Networks:
 * - BNB Smart Chain (#F0B90B)
 * - Polygon (#8247E5)
 * - Ethereum (#627EEA)
 * - Base (#0052FF)
 * - Arbitrum (#28A0F0)
 */
export function NetworkLogo({ name, className }: NetworkLogoProps) {
  const normalized = name.toLowerCase();

  if (normalized.includes("bnb") || normalized.includes("binance")) {
    return (
      <span
        title="BNB Smart Chain"
        className={cn(
          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#0A0A0B] bg-[#F0B90B] shadow-[2px_2px_0px_0px_#0A0A0B]",
          className
        )}
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5 fill-[#0A0A0B]" aria-hidden="true">
          <path d="M16 6l3.09 3.09-6.28 6.28-3.09-3.09L16 6zm6.28 6.28L25.37 15.37 16 24.74l-3.09-3.09 9.37-9.37zM9.72 18.46l3.09 3.09-3.09 3.09-3.09-3.09 3.09-3.09zM16 12.18l3.09 3.09-3.09 3.09-3.09-3.09L16 12.18zm-9.37.09l3.09 3.09-3.09 3.09L3.54 15.36l3.09-3.09zm18.74 0l3.09 3.09-3.09 3.09-3.09-3.09 3.09-3.09zM16 18.46l3.09 3.09L16 24.64l-3.09-3.09L16 18.46z" />
        </svg>
      </span>
    );
  }

  if (normalized.includes("polygon") || normalized.includes("matic")) {
    return (
      <span
        title="Polygon"
        className={cn(
          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#0A0A0B] bg-[#8247E5] shadow-[2px_2px_0px_0px_#0A0A0B]",
          className
        )}
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white" aria-hidden="true">
          <path d="M21.2 12.2c-.5-.3-1.2-.3-1.7 0l-3.8 2.2-2.6 1.5-3.8 2.2c-.5.3-1.2.3-1.7 0l-3-1.8c-.5-.3-.8-.9-.8-1.5v-3.5c0-.6.3-1.2.8-1.5l3-1.7c.5-.3 1.2-.3 1.7 0l3 1.7c.5.3.8.9.8 1.5v2.2l2.6-1.5v-2.2c0-.6-.3-1.2-.8-1.5l-5.5-3.2c-.5-.3-1.2-.3-1.7 0L4 8.3c-.5.3-.8.9-.8 1.5v6.4c0 .6.3 1.2.8 1.5l5.6 3.2c.5.3 1.2.3 1.7 0l3.8-2.2 2.6-1.5 3.8-2.2c.5-.3 1.2-.3 1.7 0l3 1.7c.5.3.8.9.8 1.5v3.5c0 .6-.3 1.2-.8 1.5l-3 1.8c-.5.3-1.2.3-1.7 0l-3-1.7c-.5-.3-.8-.9-.8-1.5v-2.2l-2.6 1.5v2.2c0 .6.3 1.2.8 1.5l5.6 3.2c.5.3 1.2.3 1.7 0l5.6-3.2c.5-.3.8-.9.8-1.5v-6.4c0-.6-.3-1.2-.8-1.5l-5.6-3.2z" />
        </svg>
      </span>
    );
  }

  if (normalized.includes("ethereum") || normalized.includes("eth")) {
    return (
      <span
        title="Ethereum"
        className={cn(
          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#0A0A0B] bg-[#627EEA] shadow-[2px_2px_0px_0px_#0A0A0B]",
          className
        )}
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white" aria-hidden="true">
          <path d="M16 4l-7.5 12.2L16 20.6l7.5-4.4L16 4zm0 18.1l-7.5-4.4L16 28l7.5-10.3-7.5 4.4z" />
        </svg>
      </span>
    );
  }

  if (normalized.includes("base")) {
    return (
      <span
        title="Base"
        className={cn(
          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#0A0A0B] bg-[#0052FF] shadow-[2px_2px_0px_0px_#0A0A0B]",
          className
        )}
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white" aria-hidden="true">
          <path d="M16 5C9.925 5 5 9.925 5 16c0 5.65 4.26 10.305 9.74 10.93v-9.43H8.5v-3h6.24V5.07A11.05 11.05 0 0 1 16 5c6.075 0 11 4.925 11 11s-4.925 11-11 11v-2.5a8.5 8.5 0 1 0 0-17V5z" />
        </svg>
      </span>
    );
  }

  // Arbitrum
  return (
    <span
      title="Arbitrum"
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#0A0A0B] bg-[#28A0F0] shadow-[2px_2px_0px_0px_#0A0A0B]",
        className
      )}
    >
      <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white" aria-hidden="true">
        <path d="M16 4L6 9.8v12.4L16 28l10-5.8V9.8L16 4zm2.9 17.6l-1.9-3.3-2.9 5-2.1-1.2 5-8.6 1.9 3.2 2.4-4.1 2.1 1.2-4.5 7.8zm-6.8-3.8l-2.1-1.2 4.8-8.3 2.1 1.2-4.8 8.3z" />
      </svg>
    </span>
  );
}

