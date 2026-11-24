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

---
## Update: decisions and first build (home + Panchakarma)

**Decided:** Instrument Serif (display) + Hanken Grotesk (body); Noto Serif/Sans Tamil. The unused faces (Cormorant, DM Sans) and the `/design` route were removed so production ships two Latin faces. The `/design` page remains in git history; its screenshots are `design/screenshots/system-*.jpg`.

**Built:** shared shell (header, mobile menu overlay, footer with giant wordmark, phone action bar), full home page (hero, pinned story, treatments index, how-it-works with drawn line, people, masonry gallery with lightbox, product shelf strip, voices placeholder, FAQ) and `/panchakarma`, each in English and Tamil (`/ta`, `/ta/panchakarma`). Screenshots: `design/screenshots/built-*.jpg`.

**Measured (lab, 4x CPU slowdown, ~1.6 Mbps / 150 ms):** LCP 1.3 s (home), 1.9 s (Tamil home), 0.9 s (Panchakarma); CLS 0; 350-500 KB transferred; GSAP/Lenis are not requested on phones. Real Lighthouse runs in the QA phase.

**Motion implementation notes:** pinning uses CSS `position: sticky` (more robust than script pinning) with an IntersectionObserver swapping the image; GSAP ScrollTrigger drives parallax (max 8%) and the scrubbed line, Lenis smooth scroll, all loaded after first paint and only on desktop-class devices (fine pointer, >= 1024px, >= 6 cores, >= 4 GB, no save-data, no reduced motion).

**Fixes made while reviewing:** headline covered faces (crop moved); portrait cutouts had colour fringes (now on ink green); Tamil overflowed on phones (header title, menu words, hero scale, buttons, product labels, footer columns, header breakpoint); Tamil has no italic (colour only); hero caption hidden behind the phone action bar (clearance added). Horizontal overflow is 0 from 360 to 1440 px on all four pages (`tools/overflow.mjs`).

**Self-critique, still open:**
- The hero photo is a 980 px square stretched full-bleed: soft on large screens. A new landscape photograph of the entrance or the doctor is the single biggest upgrade available.
- The supplied photos are saturated and uneven even after a warm grade.
- Three photos show patients being treated; the portrait of the Managing Director in the story is an illustrated backdrop shot. All need consent/replacement.
- Nav links to pages not yet built (About, Treatments, Offerings, Products, Gallery, Contact) 404 until those pages exist.

---
## Mood board: "The Gazette on palm leaf" (hybrid), awaiting approval
Live at `/moodboard` (isolated route group `web/src/app/(board)`, its own layout and CSS; no live page was changed). Screenshots: `design/moodboard/moodboard-1440.jpg`, `moodboard-390.jpg`.
Palette is vintage light greens (newsprint #E9E6CF, celadon #D3DDC0, sage #B4C3A0, palm leaf #D4CF9C, ink green #2A3E30, stamp red-brown #94402C). Contrast computed with `tools/contrast2.mjs`; moss deepened to 5.4:1; turmeric limited to tiny fills; all buttons ink green.
Photo treatments are baked with `tools/halftone.mjs` (duotone and 45-degree halftone). Halftone files are 270-390 KB: over budget, production versions must be coarser and under 150 KB.
No overflow from 360 to 1440 px (`tools/overflow.mjs`).

---
## Gazette restyle (branch `feature/gazette-design`), applied to the real site
Applied from the approved mood board to the home page, header/footer shell, product cards and product pages, cart drawer, the talk-to-the-doctor sheet, FAQ, forms and the phone bottom bar. All cart, request, tracking and doctor-desk logic is unchanged; only the visual layer moved.

**What changed**
- Tokens: newsprint, aged newsprint, celadon, sage, pistachio, palm leaf, faded ink green, stamp red-brown (`web/src/app/globals.css`, `tailwind.config.ts`). Corners are 2-3 px, shadows are flat 2/3 px offsets, no blur, no gradients, no glow.
- Type: Old Standard TT headlines, Newsreader text, Special Elite typewriter for labels and buttons, Caveat for rare margin notes; Tamil uses Tiro Tamil (display) and Noto Serif Tamil (text).
- Section tags are palm-leaf strips; treatments are leaves strung on one cord; the front page has a dateline, torn "Stop press" slip, tape, rubber stamp and a classifieds box for "What is troubling you?".
- Photographs: every photo is baked to a green duotone (`tools/treat.mjs`); photos of 900 px or more also get a halftone twin under 150 KB (`*.ht.webp`). Halftone is used for close-up shots; the group hero uses the smooth duotone because halftone would lose faces.
- Products: the old posters carry health-claim text, so only the clean soap packshot is shown as a photo; every other product is a drawn apothecary jar with a paper label (`web/src/components/shop/ProductArt.tsx`).
- Removed from the home page: the stat tiles ("18+ years of practice" etc.), the "Free consultation call" badge, the glowing blob, floating cards, and "Shop herbal remedies" wording.

**Checks**
- `tools/sweep.mjs`: 16 routes x 6 widths (360-1440 px), English and Tamil: 0 horizontal-overflow problems.
- `tools/perf.mjs` (slow 4G, 4x CPU slowdown, production build): LCP 0.9-1.8 s, CLS < 0.01, 520-610 KB, no motion libraries on phones.
- `tools/states.mjs` screenshots the sheet, cart drawer, product and Tamil states. Screenshots: `design/gazette/`.
