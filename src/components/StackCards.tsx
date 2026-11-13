import { useRef, type CSSProperties } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import { experience } from '../data/content'

// Numbered cards that stick and pile up; each one recedes as the next slides over it.
export default function StackCards() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || window.matchMedia('(max-width: 1024px)').matches) return
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card')
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card.querySelector('.stack-card__inner'), {
          scale: 0.92,
          filter: 'brightness(0.88)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 30%', scrub: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <div className="stack-cards container" ref={root}>
      {experience.map((job, i) => (
        <article key={job.company} className="stack-card" style={{ '--i': i } as CSSProperties}>
          <div className="stack-card__inner grain" style={{ background: job.bg, color: job.fg }}>
            <div className="stack-card__head">
              <p className="stack-card__number">0{i + 1}.</p>
              <h3 className="stack-card__title">{job.company}</h3>
              <p className="stack-card__role">{job.role}</p>
            </div>
            <dl className="stack-card__rows">
              <div><dt>Period</dt><dd>{job.period}</dd></div>
              <div><dt>Location</dt><dd>{job.location}</dd></div>
              <div><dt>Focus</dt><dd>{job.focus}</dd></div>
              <div className="stack-card__wide">
                <dt>What I did</dt>
                <dd>
                  <ul>{job.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                </dd>
              </div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  )
}
