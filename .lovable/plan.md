## Add corner sepia vignette to hero

Add a third overlay layer to the hero in `src/routes/index.tsx` and a matching utility in `src/styles.css`.

### `src/styles.css`
Add a new `.cover-vignette` class using a radial gradient anchored to the center, transparent through most of the frame and easing into a dark sepia (warm brown-black) only near the corners:

```css
.cover-vignette {
  background: radial-gradient(
    ellipse 90% 75% at 50% 50%,
    transparent 55%,
    rgba(40, 22, 10, 0.25) 85%,
    rgba(28, 14, 6, 0.55) 100%
  );
}
```

- Sepia tone (warm brown `rgb(40,22,10)`) instead of neutral gray.
- Transparent through the middle 55% so the image stays bright.
- Stronger pull at the very edges, with the ellipse shape concentrating darkness in the four corners more than the top/bottom midpoints.

### `src/routes/index.tsx`
Add one absolutely-positioned overlay div above the existing two gradient layers:

```tsx
<div className="cover-vignette absolute inset-0 pointer-events-none" />
```

Stacks on top of `.cover-gradient` and `.cover-gradient-side` without altering them.

### Out of scope
No changes to existing gradients, hero copy, image, or other routes.