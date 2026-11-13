// Runs after `vite build` (Node ≥ 22.18 strips the types natively).
// GitHub Pages has no rewrites, so write a real HTML file per route — each with
// its own <title>, description, share image and canonical URL — plus a
// sitemap, robots.txt and a noindex 404.html fallback for unknown paths.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pages, SITE_URL, type PageMeta } from '../src/data/meta.ts'
import { person } from '../src/data/content.ts'

const DIST = 'dist'
const template = readFileSync(join(DIST, 'index.html'), 'utf8')

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const urlFor = (path: string) => `${SITE_URL}${path === '/' ? '/' : `${path}/`}`

function setTag(html: string, pattern: RegExp, value: string, label: string) {
  if (!pattern.test(html)) throw new Error(`postbuild: ${label} not found in index.html`)
  return html.replace(pattern, (_m, a: string, b: string) => `${a}${esc(value)}${b}`)
}

function render(m: Omit<PageMeta, 'path'> & { path: string | null }, extraHead = '') {
  const image = `${SITE_URL}/${m.image}`
  let h = setTag(template, /(<title>)[^<]*(<\/title>)/, m.title, 'title')
  h = setTag(h, /(<meta name="description" content=")[^"]*(")/, m.description, 'description')
  for (const [key, value] of [
    ['og:title', m.title], ['og:description', m.description], ['og:image', image],
  ] as const) h = setTag(h, new RegExp(`(<meta property="${key}" content=")[^"]*(")`), value, key)
  for (const [key, value] of [
    ['twitter:title', m.title], ['twitter:description', m.description], ['twitter:image', image],
  ] as const) h = setTag(h, new RegExp(`(<meta name="${key}" content=")[^"]*(")`), value, key)
  if (m.path) {
    h = setTag(h, /(<meta property="og:url" content=")[^"]*(")/, urlFor(m.path), 'og:url')
    h = setTag(h, /(<link rel="canonical" href=")[^"]*(")/, urlFor(m.path), 'canonical')
  } else {
    h = h.replace(/\s*<link rel="canonical"[^>]*>/, '')
  }
  return h.replace('</head>', `${extraHead}</head>`)
}

const personLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  jobTitle: person.role,
  url: `${SITE_URL}/`,
  email: `mailto:${person.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Delhi', addressCountry: 'IN' },
  sameAs: person.socials.map((s) => s.href),
})

let written = 0
for (const m of pages) {
  if (!existsSync(join('public', m.image))) console.warn(`postbuild: missing share image public/${m.image}`)
  const file = m.path === '/' ? join(DIST, 'index.html') : join(DIST, m.path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  const extra = m.path === '/' ? `  <script type="application/ld+json">${personLd}</script>\n  ` : ''
  writeFileSync(file, render(m, extra))
  written++
}

writeFileSync(
  join(DIST, '404.html'),
  render(
    { path: null, title: 'Page not found — Ayush Sinha', description: 'This page could not be found.', image: 'og/default.png' },
    '  <meta name="robots" content="noindex" />\n  ',
  ),
)

const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((m) => `  <url><loc>${urlFor(m.path)}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
)
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
writeFileSync(join(DIST, '.nojekyll'), '')
console.log(`postbuild: wrote ${written} route pages, 404.html, sitemap.xml, robots.txt`)
