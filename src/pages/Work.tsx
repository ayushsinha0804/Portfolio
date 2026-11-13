import PageHero, { type CoverPiece } from '../components/PageHero'
import PageIntro from '../components/PageIntro'
import ProjectCard from '../components/ProjectCard'
import CardSlider from '../components/CardSlider'
import FloatingNav from '../components/FloatingNav'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import { projects } from '../data/content'

const groups = [
  {
    id: 'full-stack',
    label: 'Full-stack',
    title: 'Full-stack & Web',
    text: 'APIs, clients and the plumbing between them — authentication, databases, real-time transport and the deployment that puts it all in front of people.',
    tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'React', 'Flutter'],
  },
  {
    id: 'ml-security',
    label: 'ML & Security',
    title: 'Machine Learning & Security',
    text: 'Models that classify, detect and describe — from network traffic to images — and the cryptography I built during my traineeship at EY.',
    tags: ['Python', 'TensorFlow', 'Scikit-Learn', 'OpenCV'],
  },
] as const

const navItems = groups.map((g) => ({ id: g.id, label: g.label }))

const pieces: CoverPiece[] = [
  { glyph: 'braces', color: 'var(--ochre)', x: 6, y: 12, size: 16, rotate: -12, speed: 1.2 },
  { glyph: 'database', color: 'var(--accent)', x: 74, y: 8, size: 14, rotate: 10, speed: 0.7 },
  { glyph: 'terminal', color: '#c94f2c', x: 66, y: 60, size: 20, rotate: -6, speed: 1.6 },
  { glyph: 'pin', color: '#b9c9f0', x: 14, y: 62, size: 12, rotate: 14, speed: 0.9 },
]

export default function Work() {
  let n = 0
  return (
    <main id="main">
      <PageHero title="Work" coverTitle={<>Built, tested,<br />shipped</>} pieces={pieces} />
      <PageIntro after={<><strong>{projects.length} projects</strong> across full-stack engineering, machine learning and security.</>}>
        I build across the backend, the frontend and the deployment in between — and I treat every line an AI agent writes as something to verify before it ships.
      </PageIntro>

      <div id="work-groups">
        {groups.map((g) => {
          const list = projects.filter((p) => (g.id === 'full-stack' ? p.category === 'Full-stack' : p.category === 'ML & Security'))
          return (
            <section key={g.id} id={g.id} className="category container">
              <div className="category__head">
                <Reveal as="h2" className="category__title" mode="chars">{g.title}</Reveal>
                <div className="category__aside">
                  <Reveal as="p" className="category__text">{g.text}</Reveal>
                  <p className="category__tags-label">Built with</p>
                  <ul className="category__tags">
                    {g.tags.map((t) => <li key={t} className="pill">{t}</li>)}
                  </ul>
                </div>
              </div>
              <CardSlider label={`${g.title} projects`}>
                {list.map((p) => <ProjectCard key={p.slug} project={p} index={n++} />)}
              </CardSlider>
            </section>
          )
        })}
      </div>
      <FloatingNav wrapperId="work-groups" items={navItems} />
      <Footer />
    </main>
  )
}
