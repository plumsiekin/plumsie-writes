## What's wrong

Two regressions, both in `src/styles.css`, introduced during the Astro → TanStack port:

### 1. Wordmark "place" lost its accent color
`src/styles.css` line 296–297 has a blanket override:
```css
#navbar a, #navbar button, #navbar .group span { color: var(--color-sand-900); }
html.dark #navbar a, html.dark #navbar button, html.dark #navbar .group span { color: var(--color-sand-50); }
```
That rule wins over the Tailwind `text-sand-400` on the `place` span in `src/components/Navbar.tsx`, so both words render in the same color (sand-900 in light mode, sand-50 in dark mode). Previously `place` was a warmer accent tone (ember/sand-400 italic).

### 2. Hero image is invisible behind overlays
The hero in `src/routes/index.tsx` stacks two overlays from `src/styles.css` (lines 282–283):
```css
.cover-gradient { background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 35%, transparent 70%); }
.cover-gradient-side { background: linear-gradient(to right, rgba(46,26,8,0.7) 0%, transparent 60%); }
```
In dark mode the deep-brown side gradient (`rgba(46,26,8,0.7)`) plus the top gradient and dark page background swallow the `berrinmoore-cover.jpg` image almost entirely. The `<img>` is loading; it's just been overlaid into oblivion.

## Fix

**Edit only `src/styles.css`** — no component changes needed.

1. **Wordmark** — narrow the navbar color override so it doesn't touch the wordmark spans, and let the existing Tailwind `text-sand-400`/italic on `place` take effect. Change:
   - `#navbar .group span` → drop `.group span` from both the light and dark rules (keep `#navbar a, #navbar button` only). The brand link's two spans then keep their `text-sand-900` and `text-sand-400 italic` classes from `Navbar.tsx`. In dark mode `text-sand-900` on the first span will be too dark, so add a targeted dark-mode rule that lightens only the *first* wordmark span (e.g. `html.dark #navbar a.group > span:first-child`) while leaving the accent `place` span at `sand-400`.

2. **Hero overlays** — soften both gradients so the cover image shows through while the headline stays readable:
   - `.cover-gradient`: reduce opacities (e.g. `rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 45%, transparent 80%`) — keeps a darker band behind the title at the bottom, transparent up top.
   - `.cover-gradient-side`: drop the side opacity (e.g. `rgba(0,0,0,0.45) 0%, transparent 55%`) and switch from the brown tint to neutral black so it stops looking like a solid brown panel.

## Verification

- Refresh `/` in dark mode: `Tales of Berrinmoore` cover image is clearly visible, headline + status pills remain legible against the bottom-left vignette.
- Navbar shows `plumsie's` in the neutral wordmark color and `place` in the lighter italic accent, in both light and dark modes.
- No other routes change appearance (only `.cover-gradient*` and `#navbar` rules touched).

## Out of scope

- No changes to `Navbar.tsx`, `index.tsx`, story data, or images.
- No new tokens or assets; just CSS rule adjustments.
