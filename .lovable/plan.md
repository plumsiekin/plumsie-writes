## Goal
Make the corner blur actually visible without touching the existing dark sepia vignette, layout, text, or positioning.

## Why the current blur is invisible
`.cover-blur` uses `backdrop-filter: blur(8px)`. The hero `<img>` sits inside a wrapper with a `scale` animation (`transform`), which creates its own stacking context. In several browsers this prevents a sibling overlay's `backdrop-filter` from sampling the image, so the blur has nothing to act on and the result looks identical to before.

## Fix
Replace the `backdrop-filter` approach with a duplicated, pre-blurred image layer masked to the corners. The dark vignette stays exactly as it is and sits on top.

### `src/routes/index.tsx` (hero overlay stack)
Add one new div that renders the same hero image, just above the original image and below the gradients/vignette:

```tsx
<div className="cover-blur-layer absolute inset-0 pointer-events-none"
     style={{ backgroundImage: `url(${featured.coverImage})` }} />
```

Stacking order (unchanged except for the new layer):
1. hero image (existing)
2. **cover-blur-layer (new)** — blurred copy, masked to corners
3. cover-gradient (existing)
4. cover-gradient-side (existing)
5. cover-vignette (existing dark sepia — unchanged)

Remove the now-unused `<div className="cover-blur ..." />`.

### `src/styles.css`
- Delete the `.cover-blur` rule (the `backdrop-filter` one that isn't working).
- Add:

```css
.cover-blur-layer {
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  transform: scale(1.05); /* hide blur edge bleed */
  -webkit-mask-image: radial-gradient(ellipse 65% 55% at 50% 50%,
                       transparent 50%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,1) 100%);
          mask-image: radial-gradient(ellipse 65% 55% at 50% 50%,
                       transparent 50%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,1) 100%);
}
```

The mask matches the existing vignette ellipse so the blurred area lines up perfectly with the darkened area: center crisp, corners both blurred and darkened.

## Out of scope
No changes to vignette colors, gradients, hero copy, image source, layout, or any other route.