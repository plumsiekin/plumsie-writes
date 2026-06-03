## Goal

Your real site (the Astro "plumsiepie writes" blog + SimLit stories) lives in `src/pages/*.astro`, but Lovable's preview runs TanStack Start, which only serves `src/routes/`. I'll port the Astro site to TanStack Start so the preview shows your actual content, then remove the Astro scaffolding.

## What gets ported

**Pages → TanStack routes (`src/routes/`)**
- `index.astro` → `index.tsx` (home)
- `about.astro` → `about.tsx`
- `stories.astro` → `stories.tsx`
- `blog/index.astro` → `blog/index.tsx`
- `blog/[id].astro` → `blog/$id.tsx` (individual post)
- `blog/category/[category].astro` → `blog/category/$category.tsx`
- `story/[storyId]/index.astro` → `story/$storyId/index.tsx`
- `story/[storyId]/characters.astro` → `story/$storyId/characters.tsx`
- `story/[storyId]/chapter/[number].astro` → `story/$storyId/chapter/$number.tsx`
- `tag/[tag].astro` → `tag/$tag.tsx`
- `blog/rss.xml.ts` → `routes/api/public/rss.xml.ts` (server route)

**Components → React (`.astro` → `.tsx`)**
Navbar, Footer, BaseHead-equivalent (head() in routes), Ornament, StoryCard, ChapterList, ContentWarning, AuthorByline, RelatedContent, Accordion, ScrollProgressBar, ReadingProgress.

**Content & data**
- `src/data/stories.ts` — already TS, used as-is.
- `src/content/blog/*.md` — Astro content collection. I'll move these to `src/content/blog/` and read them via a small Vite glob import (`import.meta.glob`) so blog routes can list and render posts with frontmatter + markdown body.

**Styling**
- `src/styles/global.css` — port the sand palette, Cormorant/Karla fonts, dark-mode tokens, and ornament styles into `src/styles.css` as semantic design tokens (oklch) per Lovable conventions. No raw color classes in components.

**Theme toggle**
- The inline `localStorage` theme script is browser-only. I'll move it into a client-only `ThemeProvider` that runs after hydration (no SSR access to `window`/`localStorage`).

## Accessibility (per your project rules)

- Keep semantic elements (`<nav>`, `<main>`, `<article>`, `<button>`, `<dialog>` where applicable).
- Preserve heading hierarchy (one `<h1>` per page).
- Keep alt text on all images; decorative ornaments get `alt=""`.
- Filter buttons keep `aria-pressed` state; category chips remain real `<a>` links.
- Maintain `:focus-visible` styles when porting CSS.

## What gets removed (after port verified)

- `astro.config.mjs`, `src/pages/`, `src/layouts/`, `src/components/*.astro`, `src/content.config.ts`, `tailwind.config.js` (TanStack template uses CSS-first Tailwind v4 via `src/styles.css`).
- `astro` and related deps from `package.json`.

## Out of scope

- No content changes — every page renders the same copy and images.
- No new features.
- No backend/Cloud (not needed; content is static).

## Technical notes

- Markdown rendering: `import.meta.glob('/src/content/blog/*.md', { eager: true, query: '?raw', import: 'default' })` to get raw bodies, then render with `marked` + `gray-matter` (small, Worker-safe). Adds 2 deps.
- RSS endpoint becomes a `createFileRoute('/api/public/rss.xml')` server route returning `text/xml`.
- Route metadata (`<title>`, `description`, `og:*`) goes in each route's `head()` — distinct per page, no reuse of the home metadata.
- `src/routes/__root.tsx` keeps `<Outlet />`; Navbar + Footer move into it so every route gets the shell.

## Verification

After build:
1. `/` shows the plumsiepie home, not the placeholder.
2. `/blog`, `/stories`, `/about`, a sample `/blog/[slug]`, and a sample `/story/tales-of-berrinmoore/chapter/1` all render.
3. Dark-mode toggle works without SSR hydration errors.
4. Build passes with no unresolved imports.
