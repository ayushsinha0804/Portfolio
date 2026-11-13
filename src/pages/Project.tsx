import { useParams } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { projects } from '../data/content'
import Glyph from '../components/Glyph'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import SpecTable from '../components/SpecTable'
import CardSlider from '../components/CardSlider'
import ProjectCard from '../components/ProjectCard'
import ProjectGallery from '../components/ProjectGallery'
import Footer from '../components/Footer'
import RollText from '../components/RollText'
import { TLink } from '../lib/site'
import NotFound from './NotFound'

export default function Project() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const p = projects[index]
  if (!p) return <NotFound />
  const next = projects[(index + 1) % projects.length]

  return (
    <main key={p.slug} id="main" className="project" style={{ '--card-bg': p.bg, '--card-fg': p.fg } as CSSProperties}>
      <section className="project-hero container">
        <div className="project-hero__meta">
          <TLink to="/work" className="pill" data-cursor="All work"><RollText text={p.category} /></TLink>
          <p className="project-hero__meta-right">{p.year ?? 'Project'}<br />{p.role}</p>
        </div>
        <Reveal as="h1" className="project-hero__title display" mode="chars" trigger="mount" delay={0.2}>{p.title}</Reveal>
        <div className="project-hero__object grain">
          <div className="project-hero__object-art"><Glyph name={p.glyph} /></div>
          <p className="project-hero__object-kicker">{p.kicker}</p>
        </div>
      </section>

      <PageIntro after={p.summary}>{p.intro}</PageIntro>

      <section className="project-stats container" aria-label="Key numbers">
        {p.stats.map((s) => (
          <div key={s.label} className="project-stats__item">
            <Reveal as="p" className="project-stats__value" mode="chars">{s.value}</Reveal>
            <p className="project-stats__label">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="project-meta container">
        <div className="project-meta__grid">
          <div>
            <p className="project-meta__label">Role</p>
            <p className="project-meta__value">{p.role}</p>
          </div>
          <div>
            <p className="project-meta__label">Stack</p>
            <ul className="project-meta__pills">{p.stack.map((s) => <li key={s} className="pill">{s}</li>)}</ul>
          </div>
          {p.links && (
            <div>
              <p className="project-meta__label">Links</p>
              <ul className="project-meta__links">
                {p.links.map((l) => (
                  <li key={l.href}><a href={l.href} target="_blank" rel="noreferrer" data-cursor="Open"><RollText text={`${l.label} ↗`} /></a></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <ProjectGallery project={p} />

      <section className="container project-highlights">
        <SpecTable
          title="What I did"
          columns={['#', 'Detail']}
          rows={p.highlights.map((h, i) => ({ label: String(i + 1).padStart(2, '0'), value: h }))}
        />
      </section>

      <TLink to={`/work/${next.slug}`} className="next-project" data-cursor="Next case" style={{ '--card-bg': next.bg, '--card-fg': next.fg } as CSSProperties}>
        <span className="next-project__label">Next project</span>
        <span className="next-project__title display">{next.title}</span>
        <span className="next-project__art" aria-hidden="true"><Glyph name={next.glyph} /></span>
      </TLink>

      <section className="other-projects">
        <h2 className="other-projects__title container">Other projects</h2>
        <CardSlider label="Other projects">
          {projects.map((o, i) => (o.slug === p.slug ? null : <ProjectCard key={o.slug} project={o} index={i} />))}
        </CardSlider>
      </section>
      <Footer />
    </main>
  )
}
