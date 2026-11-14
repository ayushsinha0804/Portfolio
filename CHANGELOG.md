# Update log

All notable changes to this portfolio, newest first.
Live site: https://ayushsinha0804.github.io/Portfolio/

---

## 2026-11-14 — Polish, performance and SEO

Commit `d6d3417`

### Added
- **Profile photo** on the About page, in an arch-shaped frame that wipes open on scroll, drifts with parallax and goes from tinted to full colour on hover.
- **Résumé download** (`public/Ayush_Sinha_Resume.pdf`) linked from the menu, the footer, About, Contact and the home page.
- **Home page intro**: "Full-stack developer", tech stack, and *View work* / *Résumé* buttons. Pinned to the top on phones.
- **Project screenshots**: the Electronic Point case study shows desktop and phone screenshots of the live site in device frames.
- **Link previews**: share images (1200×630) for the site and each project, so links show a card on LinkedIn, WhatsApp, X and similar.
- **SEO**:
  - Each route is prerendered to its own HTML file with its own title, description, Open Graph and Twitter tags, and canonical URL. Case-study links now return 200 instead of 404.
  - Added `sitemap.xml`, `robots.txt`, Person structured data (JSON-LD) and a `noindex` 404 page.
- **Favicon** (`public/favicon.svg`).

### Changed
- **Faster first load.** On a throttled phone, projects now appear after about 3.3 s instead of about 5.7 s.
  - The preloader follows real loading progress, with a 0.7 s minimum and a 2.4 s cap.
  - It only plays when a visitor lands on the home page, and only once per session.
  - Matter.js (preloader physics) and the inner pages are code-split and load on demand. The main bundle is down from 176 KB to 151 KB gzipped.
  - Page transitions wait under the cover panel until the next page's code has loaded.
- **Project content checked against the GitHub repos:**
  - Image Captioning now covers both the VGG16 + LSTM notebook and the BLIP + FastAPI web app.
  - Heart Disease Predictor corrected to Random Forest (82% accuracy) with a FastAPI + React app, dated 2023.
  - Repo links added for Electronic Point, Image Captioning, DDoS Detection and Heart Disease Predictor. GitHub links removed for Map Track and Real-Time Messaging, which have no public repos.
- **Accessibility:**
  - Text on every project colour now meets the WCAG AA contrast standard: the DDoS card colour is darker and the faded labels are fully opaque.
  - Arrow keys only scroll the project belt while it is focused.
  - The belt's auto-drift pauses on hover and when the tab is hidden.
- **Deploy:** GitHub Actions workflow updated to current action versions on Node 24.
- **README** rewritten with run, content-editing, deploy and structure notes.

### Removed
- The legacy `gh-pages` branch. The site now deploys from `master` through GitHub Actions.

---

## 2026-11-13 — New site

Commit `e382aee`

Replaced the previous Create React App portfolio with a new site built from scratch.

### Stack
- Vite + React 19 + TypeScript, React Router.
- GSAP (ScrollTrigger, SplitText, CustomEase), Lenis smooth scrolling, Matter.js.
- Fonts: Instrument Serif and Manrope.
- Palette: cream paper, ink green, cobalt and ochre.
- Served from GitHub Pages at the `/Portfolio/` base path.

### Pages
- **Home**: a horizontally drifting belt of projects, which can be dragged, scrolled or steered with the keyboard.
- **Work**: all projects, plus a case-study page for each one.
- **Experience**: roles at Electronic Point (Jamshedpur), EY and HighRadius, plus skills and education.
- **About**: a short bio. Location set to Delhi, India.
- **Contact**: email, socials and current status.
- **404 page.**

### Design and motion
- Physics preloader in which glyphs fall and pile up, followed by a cobalt panel sweep.
- Page transitions with a cover panel and a route label.
- Split-text reveals, rolling link text, a cursor label, pinned and stacked card sections, and parallax.
- **Project shapes**: each project has its own shape, made with CSS border-radius:

  | Project | Shape |
  |---|---|
  | Map Track | arch |
  | Electronic Point | wide rounded rectangle |
  | Real-Time Messaging | speech bubble |
  | Image Captioning | ellipse |
  | DDoS Detection | shield |
  | Heart Disease Predictor | blob |
  | Cipher Kit | leaf |

- Full-screen menu that shows local time.
- Responsive layouts for phones and tablets, tested on the iPhone simulator. Motion is reduced when the visitor's system asks for it.
