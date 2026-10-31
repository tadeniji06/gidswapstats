# GidSwap — Proof of Work & Settlement Telemetry (`gidswapstats`)

A minimalist, cinematically animated proof-of-work stats showcase for **GidSwap**, engineered in the **"Obsidian Laboratory"** aesthetic (`#0A0A0B` canvas, `#111113` 1px-bordered surfaces, `#C6F94D` electric lime & `#7DD3FC` ghost cyan accents, Instrument Serif + Geist Sans + JetBrains Mono).

---

## 🛠 Tech Stack

- **Framework**: Next.js (App Router) + TypeScript (`strict: true`)
- **Styling**: Tailwind CSS v4 + `tw-animate-css`
- **Primary Motion Engine**: Framer Motion (`framer-motion` v12)
- **Pinned Scroll Scenes**: GSAP (`gsap` v3.13) + `ScrollTrigger`
- **Smooth Scroll**: Lenis (`@studio-freight/lenis`) wired into `gsap.ticker`
- **3D Centerpiece**: React Three Fiber (`@react-three/fiber`) + `@react-three/drei` (lazy-loaded with `ssr: false`)
- **Icons**: `lucide-react`

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 3. Production Build & Verification

```bash
npm run build
npm run start
```

---

## 📐 Project Structure

```text
/app
  /layout.tsx         → Next/Font loader (Instrument Serif, Geist, JetBrains Mono), Lenis, Cursor, Grain overlay
  /page.tsx           → Assembles the 8 narrative scenes + SectionCurtain transitions
  /globals.css        → Obsidian Laboratory tokens, ambient blob keyframes, reduced-motion rules
/components
  /sections
    /hero.tsx                 → 100dvh pinned hero, 3D icosahedron, 3D letter-by-letter entrance
    /stats-grid.tsx           → 4 odometer roll-flip counters + 3D tilt cards
    /volume-breakdown.tsx     → GSAP pinned split-screen convergence + 3D card flip
    /network-distribution.tsx → Morphing capsule pipelines + SVG stroke-draw + floating tooltip
    /transaction-flow.tsx     → 3-node routing narrative + traveling SVG packet + marquee ticker
    /institutions.tsx         → 13-institution cascade pill grid with bounce overshoot
    /trust-signals.tsx        → Self-drawing SVG checkmark + mm:ss odometer + scattering recipient chips
    /footer-cta.tsx           → Reversed 3D letter entrance + returning 3D icosahedron
  /primitives
    /animated-counter.tsx     → Vertical digit-strip odometer roll-flip
    /split-text.tsx           → Letter/word 3D splitter (hero, footer, word-mask, char-flip-y)
    /magnetic-button.tsx      → Magnetic pull, clip-path sweep, vertical text swap, click ripple
    /tilt-card.tsx            → 4° spring-damped 3D tilt + cursor radial lime spotlight
    /info-tooltip.tsx         → Accessible 3D tilt tooltip with methodology copy
    /marquee.tsx              → Infinite settled transaction stream with edge gradient mask
    /draw-line.tsx            → Expanding lime SectionCurtain transition
    /scroll-eyebrow.tsx       → Scroll-linked gray-500 → lime eyebrow label
    /scroll-progress.tsx      → Top viewport scroll progress bar
  /three
    /hero-scene.tsx           → Lazy-loaded R3F Canvas with WebGL & reduced-motion fallback
    /icosahedron.tsx          → Wireframe icosahedron + inner orbital torus knot
  /providers
    /lenis-provider.tsx       → Lenis smooth scroll wired into GSAP ticker & ScrollTrigger
    /cursor-provider.tsx      → Custom lime dot cursor with 80px magnetic pull + ambient mesh
/data
  /stats.ts                   → Hardcoded audited telemetry & mandatory tooltip copy
/lib
  /animations.ts              → Shared named easing constants & Framer Motion variants
  /utils.ts                   → Classname & number formatting helpers
/hooks
  /use-reduced-motion.ts      → OS prefers-reduced-motion media query hook
  /use-mouse-position.ts      → RAF-throttled viewport & normalized mouse coordinates
```

---

## ♿ Accessibility & Performance Notes

- **Reduced Motion**: Every component checks `useReducedMotion()` and CSS `@media (prefers-reduced-motion: reduce)` to disable 3D canvas rotation, letter flying, marquee scrolling, and Lenis hijacking when requested by the user.
- **Keyboard Navigation**: Skip-to-content link at top of page, `2px` `#C6F94D` focus outlines on all interactive controls, and keyboard-accessible tooltips (`onFocus`/`onBlur` + `Escape`).

