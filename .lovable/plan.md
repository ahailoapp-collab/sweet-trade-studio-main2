

## Bring back the cycling video hero & make it fit a phone screen

### Goal
Restore the looping video background that lived behind the hero (cycling between **detergent** and **bleach** videos with crossfade), and reshape the hero so the entire composition fits inside a single mobile screen — no scroll required to see headline + product + CTAs.

### Changes (all in `src/pages/Index.tsx` — single file edit)

**1. Add cycling video background**
- Import `useState`/`useEffect` and add a `heroSlides` array referencing the existing assets in `/public/videos/`:
  - Slide A → `detergent.mp4` + `detergent5l` image + "Dishwashing Liquid"
  - Slide B → `bleach.mp4` + `bleach5l` image + "Thick Bleach"
- `setInterval` swaps `currentSlide` every ~5.5s.
- Render both `<video>` elements absolutely positioned, `autoPlay muted loop playsInline`, with `opacity` toggled by active slide for a smooth 1s crossfade.
- Add a dark gradient overlay on top (`bg-gradient-to-b from-background/60 via-background/40 to-background`) so text stays legible.
- Keep the existing aurora glow blobs on top of the video for depth.

**2. Restructure hero to fit one phone screen**
- Container: `min-h-[100svh]` → `h-[100svh] max-h-[900px]`, switch from a 2-column grid on mobile to a **single stacked, compact layout** (image behind, copy in front).
- Compact mobile sizing:
  - Headline: `text-3xl sm:text-4xl md:text-6xl` (down from `text-4xl`)
  - Reduce paddings: `pt-20 pb-6 md:pt-28 md:pb-24`
  - Product image becomes a smaller centered visual (`max-w-[260px] sm:max-w-sm`) with floating spec cards repositioned tighter (`bottom-2 / top-2`, smaller padding).
  - "Trusted Brand / 8 SKUs" trust strip → `text-[10px]`, single line.
  - Buttons: `py-3 text-sm` on mobile, full-width stacked.
- Use `flex flex-col justify-center` so content vertically centers in the viewport instead of overflowing.
- Hide the floating spec cards on the smallest screens (`hidden sm:flex`) to remove clutter and prevent overflow at 360px width.

**3. Cycle the foreground product image too**
- The product image inside the glow ring swaps in sync with the video (`heroSlides[currentSlide].image`) using a fade+scale transition (`key={currentSlide}` triggers re-mount with `animate-fade-up`).
- Floating "Heavy Duty / Dishwashing" label updates to match the active product.

**4. No new dependencies, no other files touched**
- Reuses existing CSS utilities (`gradient-aurora`, `glass`, `animate-fade-up`, `animate-pulse-glow`).
- All other sections (Products preview, Features, CEO, CTA) untouched — preserves credits.

### Mobile-fit guarantee
At 375×812 (iPhone) and 360×800 (Android):
- Header (h-24) + hero content + CTAs all visible without vertical scroll.
- Video plays edge-to-edge as the backdrop.
- No horizontal overflow (already `overflow-x-hidden` on `<main>`).

### Files modified
- `src/pages/Index.tsx` — hero section only

