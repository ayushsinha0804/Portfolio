import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import { useSite } from '../lib/site'
import type { GlyphName } from '../data/content'
import Glyph from './Glyph'
import Reveal from './Reveal'

export type CoverPiece = { glyph: GlyphName; color: string; x: number; y: number; size: number; rotate: number; speed: number }

type Props = {
  title: string
  coverTitle: ReactNode
  coverBg?: string
  coverFg?: string
  pieces?: CoverPiece[]
}

// Giant display title → full-bleed cover that opens from an inset rounded
// frame to edge-to-edge as you scroll, with parallax pieces inside.
export default function PageHero({ title, coverTitle, coverBg = 'var(--ink)', coverFg = 'var(--paper)', pieces = [] }: Props) {
  const root = useRef<HTMLElement>(null)
  const { ready } = useSite()

  useGSAP(
    () => {
      const el = root.current
      if (!el || !ready) return
      el.querySelector('.page-hero__cover')?.classList.add('is-revealed')
      if (prefersReducedMotion()) return
      const cover = el.querySelector('.page-hero__cover')
      const mq = gsap.matchMedia()
      mq.add({ desktop: '(min-width: 1025px)', mobile: '(max-width: 1024px)' }, (c) => {
        const m = c.conditions?.desktop ? 40 : 20
        gsap.fromTo(
          cover,
          { clipPath: `inset(0px ${m}px 0px ${m}px round 15px)` },
          {
            clipPath: 'inset(0px 0px 0px 0px round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: cover, start: 'top 85%', end: 'top 10%', scrub: true },
          },
        )
      })
      gsap.fromTo(el.querySelector('.page-hero__media'), { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: cover, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      el.querySelectorAll<HTMLElement>('.page-hero__piece').forEach((p) => {
        gsap.to(p, {
          yPercent: -60 * Number(p.dataset.speed ?? 1), ease: 'none',
          scrollTrigger: { trigger: cover, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
      return () => mq.revert()
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <section className="page-hero" ref={root}>
      <Reveal as="h1" className="page-hero__title display" mode="chars" trigger="mount" delay={0.15}>
        {title}
      </Reveal>
      <div className="page-hero__cover grain" style={{ background: coverBg, color: coverFg }}>
        <div className="page-hero__media" aria-hidden="true">
          {pieces.map((p, i) => (
            <div
              key={i}
              className="page-hero__piece"
              data-speed={p.speed}
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}vw`, color: p.color, rotate: `${p.rotate}deg` }}
            >
              <Glyph name={p.glyph} />
            </div>
          ))}
        </div>
        <div className="page-hero__cover-content">
          <Reveal as="h2" className="page-hero__cover-title" mode="lines">
            {coverTitle}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
