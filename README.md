# Ayush Sinha — Portfolio

Vite + React + TypeScript, animated with GSAP (ScrollTrigger, SplitText), Lenis smooth scroll and Matter.js (preloader physics).

## Run

```bash
npm install
npm run dev       # http://localhost:5173/Portfolio/
npm run build     # outputs dist/ (+ 404.html for GitHub Pages deep links)
npm run preview
```

## Edit content

All copy lives in `src/data/content.ts`: projects, experience, skills, education and contact links.
Each project's `bg`/`fg` colours drive its card, case-study page and home-belt object.

## Deploy (GitHub Pages)

`vite.config.ts` sets `base: '/Portfolio/'` to match `ayushsinha0804.github.io/Portfolio`.
`.github/workflows/deploy.yml` builds and deploys on every push to `master`.
In the repo settings, set **Pages → Source** to **GitHub Actions**.

## Structure

- `src/lib/site.tsx`: smooth scroll, preloader "ready" state, menu state, page transitions (`TLink`)
- `src/components/`: header, full-screen nav, cursor label, preloader, page hero, reveals, cards, sliders, …
- `src/pages/`: Home (3D project belt), Work, Project (case study), Experience, About, Contact
- `src/styles/`: `tokens.css` (palette, type scale, easing), `base.css`, `components.css`, `pages.css`

All motion respects `prefers-reduced-motion`. Hover-only effects are limited to fine pointers.
