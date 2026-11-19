// Per-page <title>, description and share image. Used by the app at runtime
// and by scripts/postbuild.ts to write a real HTML file per route.
import { projects } from './content.ts'

export const SITE_URL = 'https://ayushsinha0804.github.io/Portfolio'

export type PageMeta = { path: string; title: string; description: string; image: string }

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'ayush sinha — Full-stack developer',
    description:
      'ayush sinha is a full-stack developer from Delhi, India, shipping across backend, frontend and deployment with Node.js, TypeScript, PostgreSQL, React and Flutter.',
    image: 'og/default.png',
  },
  {
    path: '/work',
    title: 'Work — ayush sinha',
    description:
      'Projects by ayush sinha across full-stack engineering, machine learning and security — from a group-travel API with 750 tests to an image-captioning web app.',
    image: 'og/default.png',
  },
  {
    path: '/experience',
    title: 'Experience — ayush sinha',
    description:
      'Web developer intern at Electronic Point, cyber security trainee at Ernst & Young and intern at HighRadius.',
    image: 'og/default.png',
  },
  {
    path: '/about',
    title: 'About — ayush sinha',
    description:
      'Full-stack developer from Delhi who verifies everything before it ships. Toolkit, education and certifications.',
    image: 'og/default.png',
  },
  {
    path: '/contact',
    title: 'Contact — ayush sinha',
    description: 'Open to full-stack and backend roles. Email, GitHub, LinkedIn and resume.',
    image: 'og/default.png',
  },
  ...projects.map((p) => ({
    path: `/work/${p.slug}`,
    title: `${p.title} — ayush sinha`,
    description: p.summary,
    image: `og/${p.slug}.png`,
  })),
]

export const metaFor = (path: string): PageMeta | undefined =>
  pages.find((m) => m.path === (path.replace(/\/+$/, '') || '/'))
