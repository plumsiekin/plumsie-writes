Update both the navbar and footer logos to "plumsie stories" with identical styling.

1. **Navbar** (`src/components/Navbar.tsx`): Change "plumsie's place" → "plumsie stories". Keep the existing two-span structure: "plumsie" in regular weight, "stories" in italic. All existing styling (font, size, color, tracking, hover) stays the same.

2. **Footer** (`src/components/Footer.tsx`): Replace "plumsiepie writes" with "plumsie stories", replicating the navbar logo's exact layout and typography:
   - Wrap in `flex items-baseline gap-2 group`
   - "plumsie": `font-cormorant font-semibold text-2xl tracking-tight` (adapted to `text-sand-50` for dark footer visibility, with matching hover)
   - "stories": `font-cormorant font-semibold text-2xl italic tracking-tight` (adapted to a muted dark-mode tone, with matching hover)
   - Retain the transition-colors and group-hover behavior