import type { Metadata } from "next";
import { Quantico } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { CursorProvider } from "@/components/providers/cursor-provider";
import { ScrollProgress } from "@/components/primitives/scroll-progress";

const quantico = Quantico({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quantico",
});

export const metadata: Metadata = {
  title: "GidSwap — Proof of Work & Volume Telemetry ($95,000+)",
  description:
    "GidSwap proof-of-work showcase: $95,000+ settled volume ($55,000 Onramp/Offramp + $40,000 Crypto-to-Crypto Swaps), 1,500 transactions, and 5 networks.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quantico.variable}>
      <body className="min-h-screen bg-[#F3F2EE] font-sans text-[#0A0A0B] antialiased">
        {/* Accessibility Skip-to-Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:border-2 focus:border-[#0A0A0B] focus:bg-white focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-[#0A0A0B] focus:shadow-[4px_4px_0px_#0A0A0B] focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Top Scroll Progress Bar */}
        <ScrollProgress />

        {/* Fixed 2.5% Opacity Subtle Paper Grain Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[80] opacity-[0.025] mix-blend-multiply"
        >
          <svg className="h-full w-full">
            <filter id="paper-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#paper-grain)" />
          </svg>
        </div>

        <LenisProvider>
          <CursorProvider>{children}</CursorProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
