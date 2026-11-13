import type { Project } from '../data/content'
import { TLink } from '../lib/site'
import Glyph from './Glyph'
import { projectVars } from './shapeStyle'

const decor = ['diamond', 'braces', 'database'] as const

// Each card is a slot holding the project's own silhouette. Rest: neutral
// shape, glyph in project colour. Hover/focus: shape floods with the project
// colour, tilts and shrinks, the glyph grows, decor pieces float in.
export default function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <article className="project-card" style={projectVars(p)}>
      <div className="project-card__shape">
        <div className="project-card__decor" aria-hidden="true">
          {decor.map((g, i) => (
            <span key={g} className={`project-card__decor-piece project-card__decor-piece--${i}`}><Glyph name={g} /></span>
          ))}
        </div>
        <div className="project-card__body">
          <div className="project-card__top">
            <span>{String(index + 1).padStart(2, '0')}.</span>
            <span>{p.year ?? p.category}</span>
          </div>
          <figure className="project-card__art" aria-hidden="true"><Glyph name={p.glyph} /></figure>
          <div className="project-card__bottom">
            <h3 className="project-card__title">{p.title}</h3>
            <p className="project-card__kicker">{p.kicker}</p>
          </div>
        </div>
      </div>
      <TLink to={`/work/${p.slug}`} className="project-card__link" data-cursor="View case" aria-label={`${p.title} — case study`}>
        <span className="visually-hidden">Open case study</span>
      </TLink>
    </article>
  )
}
