# Design system: Palm-leaf and morning light

Status: **proposal, awaiting approval**. Live version: run the web app and open `/design`
(`cd web && npm run dev -- -p 3100`, then http://localhost:3100/design).
Screenshots: `design/screenshots/design-390.jpg`, `design-820.jpg`, `design-1440.jpg`.

## Tokens
| Token | Value | Use | Contrast (computed with `tools/contrast.mjs`) |
|---|---|---|---|
| `--paper` | #F4ECDD | main background | ink on it 11.4 |
| `--paper-2` | #E9DEC8 | alternate sections, placeholders | ink on it 10.0 |
| `--ink` | #1D3428 | all text, dark sections | paper on it 11.4 |
| `--moss` | #3D5A40 | secondary text, numerals | on paper 6.5 |
| `--sage` | #A9B89A | fills, plaques; lines on dark | on paper 1.8 (never text); on ink 6.4 |
| `--turmeric` | #D4962E | the one accent: primary button fill | on paper 2.2 (never text); ink on it 5.2 |
| `--clay` | #A5563A | rare, one mark per page | on paper 4.48 (large type and graphics only) |
| `--rule` | ink at 15% | hairlines | |

Rules found by computing, not assuming: turmeric and sage are never text on paper; clay is just under AA so it is limited to 24px+ and graphics.
No white, no black, no gradients, no glass, no blur, no shadows. Paper grain is a 500-byte tiled SVG. Fibre lines are an SVG image, not a gradient.

## Type
- Display: **Cormorant Garamond** or **Instrument Serif** (both live on `/design`); recommendation: Instrument Serif.
- Body: **Hanken Grotesk** or **DM Sans**; recommendation: Hanken Grotesk.
- Tamil: Noto Serif Tamil (display), Noto Sans Tamil (body). Tamil display is set at about 55% of the Latin scale (tested: 70% overflowed).
- Scale: hero `clamp(3.4rem, 12.5vw, 9rem)`, H1 `clamp(2.9rem, 8.5vw, 6.5rem)`, H2 `clamp(2.2rem, 5.6vw, 4.25rem)`, H3 `clamp(1.55rem, 3vw, 2.25rem)`, body 17px / 1.75.

## Components built
Section number + rule, labels, squared buttons (ink fill slides up on hover), underlined link, numbered treatments index with photo reveal (hover on desktop, tap on touch), palm-leaf plaque, product jars on a shelf, labelled photo placeholders, five botanical line drawings (tulsi, neem, turmeric, ashwagandha, lotus) plus a kolam divider, photo-grade demo, motion demo (mask line reveal, clip-path image reveal).

## Motion
Easing `cubic-bezier(0.22, 1, 0.36, 1)`; reveals 600-1000 ms, hovers 200-320 ms; transform / opacity / clip-path only. Lenis and GSAP ScrollTrigger will be added (locally, `npm install` in `web/`) after approval and loaded after first paint. Reduced motion: fades only; low-end phones: no smooth scroll, no parallax. Hero photo is never animated.

## Self-critique against the brief's checklist
- Template feel: the system page reads editorial (asymmetry, hairlines, huge serif, labels). The real test is the built home page, not yet built.
- Gradients / glass / equal card rows: code scan finds none (only comments and prose). The first product shelf was three equal jars; reworked to different sizes on one shelf.
- Type large and confident: yes at 1440 and 820. At 390 the hero is 54px; Tamil is smaller by necessity.
- Real photography: used only as provisional. The supplied photos are the weakest part (neon colours, ad graphics, low resolution). A warm grade helps; a half-day shoot would help most.
- Bugs found while reviewing: Tamil display overflowed its column (fixed with a separate Tamil scale); one Tailwind palette change needed a dev-server restart.
