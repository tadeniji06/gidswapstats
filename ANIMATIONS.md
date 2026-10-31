# 🎬 GidSwap Animation Architecture (`ANIMATIONS.md`)

This document catalogs every motion system, easing curve, scroll trigger, and 3D interaction in `gidswapstats` so engineers and designers can tune timings cleanly.

---

## 1. Shared Named Easing Constants (`/lib/animations.ts`)

All Framer Motion transitions import from `/lib/animations.ts`:

```ts
export const EASE_OUT_EXPO: [number, number, number, number]    = [0.16, 1, 0.3, 1];
export const EASE_CINEMATIC: [number, number, number, number]   = [0.65, 0, 0.35, 1];
export const EASE_BOUNCE: [number, number, number, number]      = [0.34, 1.56, 0.64, 1];
export const EASE_HERO_LETTER: [number, number, number, number] = [0.22, 1, 0.36, 1];
```

---

## 2. Global Motion Layer

| Feature | File | Implementation & Tuning |
| :--- | :--- | :--- |
| **Lenis Smooth Scroll** | `/components/providers/lenis-provider.tsx` | Configured with `lerp: 0.08`, `duration: 1.2`. Synced to `ScrollTrigger.update` and driven by `gsap.ticker.add(...)` with `lagSmoothing(0)`. Disabled automatically when `prefers-reduced-motion: reduce` is active. |
| **Custom Magnetic Cursor** | `/components/providers/cursor-provider.tsx` | Spring-damped (`stiffness: 420, damping: 32, mass: 0.4`) `#C6F94D` dot. Scales `2.4x` on interactive targets and pulls 25% toward `[data-magnetic]` buttons within an `80px` radius. |
| **Scroll Progress Bar** | `/components/primitives/scroll-progress.tsx` | Fixed `2px` lime line at top of viewport driven by `useScroll()` + `useSpring()`. |
| **Ambient Gradient Mesh** | `/components/providers/cursor-provider.tsx` & `/app/globals.css` | Two radial blobs (`28s` and `36s` infinite drift loops) with a `±10px` cursor-reactive spring offset. |
| **SVG Grain Overlay** | `/app/layout.tsx` | Fixed `feTurbulence` (`baseFrequency="0.82"`, `numOctaves="3"`) at `3%` opacity with `mix-blend-mode: overlay`. |

---

## 3. Section-by-Section Choreography

### A. Hero Scene (`/components/sections/hero.tsx`)
- **GSAP Pin**: Pinned for `+=85%` viewport scroll (`pin: true, scrub: 1`).
- **3D Centerpiece (`/components/three/icosahedron.tsx`)**:
  - Outer wireframe icosahedron + secondary cage + inner orbital torus knot.
  - Auto-rotates at `0.15 rad/s` on Y axis; interpolates mouse position to `±15°` (`0.26 rad`) tilt on X/Z axes.
  - On scroll exit: scales `1 → 0.4` and translates `Y: +160px`.
- **Headline (`SplitText` mode `"hero-letters"`)**:
  - `initial: { opacity: 0, y: 80, rotateX: -90, filter: "blur(12px)" }`
  - `animate: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }`
  - `40ms` per-character stagger, `1.2s` duration, `EASE_HERO_LETTER`.
  - On scroll exit: flies upward (`y: -140, opacity: 0, filter: 'blur(14px)'`).
- **Subheadline (`SplitText` mode `"words-mask"`)**:
  - Word-by-word bottom clip-mask reveal (`y: "110%" → "0%"`, `60ms` stagger).
- **Magnetic Button (`/components/primitives/magnetic-button.tsx`)**:
  - Circular `clip-path` background sweep (`circle(0% at 50% 100%) → circle(140% at 50% 100%)`), vertical text swap (`-115%` / `+115%`), click ripple, and cursor burst.

### B. Stats Grid & Odometer Counters (`/components/sections/stats-grid.tsx`)
- **Odometer (`/components/primitives/animated-counter.tsx`)**:
  - Each digit renders a vertical strip `[0..9]` and animates `y` to `${-digit * 10}%` over `1.8s` using `EASE_OUT_EXPO` when `useInView({ once: true, amount: 0.4 })` triggers.
- **3D Tilt Card (`/components/primitives/tilt-card.tsx`)**:
  - `±4°` spring-damped perspective tilt + radial `360px` lime spotlight tracking cursor coordinates via `useMotionTemplate`.
- **Label Expansion**:
  - `letterSpacing` expands from `2px → 4px` on scroll-into-view.

### C. Volume Breakdown Pinned Convergence (`/components/sections/volume-breakdown.tsx`)
- **GSAP ScrollTrigger Pin**: Pinned for `+=140%` scroll distance (`scrub: 1`).
- **Phase 1 (`0 → 0.55`)**: Left panel (`ONRAMP / OFFRAMP VOLUME`) and Right panel (`CRYPTO-TO-CRYPTO VOLUME`) slide inward from `±35%` X offset while their dollar figures count up live.
- **Phase 2 (`0.55 → 1.0`)**: Panels converge behind the central `CONVERGED TOTAL VOLUME` card, which pops in with `back.out(1.6)` easing and floats on a `4s` `±6px` Y loop.
- **3D Card Flip**: Hovering or clicking flips the merged card `180deg` along the Y axis (`[transform-style:preserve-3d]`, `[backface-visibility:hidden]`) to reveal the breakdown by source and USDT/USDC share.

### D. Network Distribution Morphing Pipelines (`/components/sections/network-distribution.tsx`)
- **Title**: Split-character 3D Y-axis flip (`rotateY: -90deg → 0`, `30ms` stagger).
- **Pipelines**: Stagger in from left (`150ms` apart). SVG `<motion.line>` animates `pathLength` from `0 → 1` over `2.0s` (`EASE_CINEMATIC`).
- **Hover Morph**: Capsule height expands by `8px` (`paddingTop/Bottom: +4px`), stroke thickens, and a floating pill tooltip morphs in (`scale: 0.9 → 1`, `blur(8px) → blur(0px)`) displaying `"X transactions"`.

### E. Transaction Flow Narrative (`/components/sections/transaction-flow.tsx`)
- **Directional Node Entrances**:
  - `[CRYPTO IN]`: Slides from left (`x: -70 → 0`, `blur(10px) → 0`).
  - `[GIDSWAP]`: Scales from center with 3D Y flip (`scale: 0.78 → 1`, `rotateY: -90 → 0`).
  - `[FIAT OUT]`: Slides from right (`x: 70 → 0`, `blur(10px) → 0`).
- **SVG Data Packet**: Connecting path draws on view while a `<motion.circle>` packet travels from `cx: 0 → 140` on a `3s` infinite loop.
- **Marquee Ticker (`/components/primitives/marquee.tsx`)**: CSS `34s` linear marquee with edge gradient fade mask (`linear-gradient(to right, transparent, black 12%, black 88%, transparent)`), pausing on hover.

### F. Supported Institutions Cascade Grid (`/components/sections/institutions.tsx`)
- **13 Pill Cards**: Enter with `opacity: 0 → 1, y: 24 → 0, scale: 0.9 → 1, blur(6px) → 0` at `60ms` stagger using `EASE_BOUNCE` (`[0.34, 1.56, 0.64, 1]`).
- **Hover**: Lifts `-4px`, border turns `#C6F94D`, bottom `2px` lime bar sweeps left-to-right (`scale-x-0 → scale-x-100`).

### G. Trust Signals (`/components/sections/trust-signals.tsx`)
- **Self-Drawing Checkmark**: SVG circle (`1.1s`) + checkmark path (`0.9s`, delayed `0.45s`) draw via `pathLength: 0 → 1`, triggering an infinite expanding pulse ring on completion.
- **Processing Time**: Formatted `04:00` (`MM:SS`) odometer roll-flip.
- **Unique Recipients**: 30 sample recipient initial chips scatter in from deterministic `x/y/rotate` offsets and settle into a clean grid with `EASE_BOUNCE`.

### H. Footer CTA (`/components/sections/footer-cta.tsx`)
- **Reversed 3D Headline (`SplitText` mode `"footer-letters"`)**: Letters drop from above (`y: -80 → 0, rotateX: 90 → 0, filter: 'blur(12px)' → 'blur(0px)'`).
- **Visual Loop Closure**: Re-mounts the lazy-loaded 3D wireframe icosahedron (`scale={0.78}`) centered behind the headline.

