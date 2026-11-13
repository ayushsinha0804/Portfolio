import PageHero, { type CoverPiece } from '../components/PageHero'
import PageIntro from '../components/PageIntro'
import PinnedPause from '../components/PinnedPause'
import DepthTitle from '../components/DepthTitle'
import SpecTable from '../components/SpecTable'
import Footer from '../components/Footer'
import { education, skills } from '../data/content'
import { useDocumentTitle } from '../lib/title'

const pieces: CoverPiece[] = [
  { glyph: 'eye', color: 'var(--paper)', x: 8, y: 14, size: 14, rotate: -8, speed: 1.1 },
  { glyph: 'key', color: 'var(--ink)', x: 70, y: 18, size: 18, rotate: 18, speed: 0.6 },
  { glyph: 'diamond', color: 'var(--ochre)', x: 60, y: 64, size: 12, rotate: 0, speed: 1.5 },
  { glyph: 'chat', color: '#b9c9f0', x: 18, y: 64, size: 16, rotate: 6, speed: 0.9 },
]

export default function About() {
  useDocumentTitle('About — Ayush Sinha')
  return (
    <main id="main">
      <PageHero title="About" coverTitle={<>From the logs<br />to production</>} coverBg="var(--accent)" pieces={pieces} />
      <PageIntro after={<>B.Tech in Computer Science & Engineering, <strong>Siksha ‘O’ Anusandhan University</strong>, 2020 — 2024.</>}>
        I’m a full-stack developer from Delhi, India. I build across the backend, the frontend and the deployment in between — Node.js, TypeScript, PostgreSQL, React and Flutter — and I follow the work into production after it ships.
      </PageIntro>

      <PinnedPause>
        Treat the agent’s<br />output as untrusted.<br />Ship what you’ve verified.
      </PinnedPause>

      <PageIntro>
        I build primarily with AI coding agents, and I read what they write. On my first client release that habit caught an exposed API key and dead code before either reached production. I’m comfortable debugging across logs, DNS, databases and third-party APIs.
      </PageIntro>

      <DepthTitle word="Ship">
        Following the work into production — and staying for what happens after.
      </DepthTitle>

      <section className="container about-tables">
        <SpecTable title="Toolkit" columns={['Area', 'Tools']} rows={skills} />
        <SpecTable title="Education & recognition" columns={['Type', 'Detail']} rows={education} />
      </section>
      <Footer />
    </main>
  )
}
