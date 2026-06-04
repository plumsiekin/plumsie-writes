## Adjust logo word spacing

In both `src/components/Navbar.tsx` and `src/components/Footer.tsx`, the logo consists of two `<span>` elements inside a flex container with `gap-2` (0.5rem / 8px). The spacing feels too wide.

**Change:** Replace `gap-2` with `gap-1` (0.25rem) on the logo link in both files. This moves "plumsie" and "stories" closer together to roughly the width of a single space character at the `text-2xl` font size.