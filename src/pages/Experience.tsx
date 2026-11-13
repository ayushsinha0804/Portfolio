import PageHero, { type CoverPiece } from '../components/PageHero'
import PageIntro from '../components/PageIntro'
import StackCards from '../components/StackCards'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import { useDocumentTitle } from '../lib/title'

const pieces: CoverPiece[] = [
  { glyph: 'branch', color: 'var(--accent)', x: 8, y: 10, size: 15, rotate: -10, speed: 1.3 },
  { glyph: 'shield', color: 'var(--paper)', x: 72, y: 12, size: 14, rotate: 12, speed: 0.8 },
  { glyph: 'gear', color: 'var(--ink)', x: 64, y: 62, size: 18, rotate: 0, speed: 1.6 },
  { glyph: 'cloud', color: '#b9c9f0', x: 12, y: 66, size: 17, rotate: -4, speed: 1 },
]

export default function Experience() {
  useDocumentTitle('Experience — Ayush Sinha')
  return (
    <main id="main">
      <PageHero title="Experience" coverTitle={<>Where I’ve<br />shipped</>} coverBg="var(--ochre)" coverFg="var(--ink)" pieces={pieces} />
      <PageIntro after="Production web work, security and machine learning — across three teams.">
        From rebuilding a live business website to training anomaly-detection models, my work has always ended in the same place: something running, verified and owned.
      </PageIntro>
      <section className="experience">
        <Reveal as="h2" className="experience__title container" mode="lines">
          Roles &<br />responsibilities
        </Reveal>
        <StackCards />
      </section>
      <Footer />
    </main>
  )
}
