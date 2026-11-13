import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import type { GlyphName } from '../data/content'
import Glyph from './Glyph'
import Reveal from './Reveal'

const pieces: { glyph: GlyphName; cls: string; color: string; travel: number; spin: number }[] = [
  { glyph: 'shield', cls: 'a', color: 'var(--accent)', travel: 70, spin: -25 },
  { glyph: 'braces', cls: 'b', color: 'var(--ochre)', travel: 110, spin: 30 },
  { glyph: 'database', cls: 'c', color: 'var(--ink)', travel: 90, spin: -15 },
  { glyph: 'terminal', cls: 'd', color: '#c94f2c', travel: 140, spin: 20 },
]

// A tall section whose stage sticks to the viewport while illustrations drift
// past a centred statement at different speeds.
export default function PinnedPause({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.pause__piece').forEach((p) => {
        gsap.fromTo(
          p,
          { yPercent: Number(p.dataset.travel), rotate: 0 },
          {
            yPercent: -Number(p.dataset.travel),
            rotate: Number(p.dataset.spin),
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    { scope: root },
  )
  return (
    <section className="pause" ref={root}>
      <div className="pause__stage">
        {pieces.map((p) => (
          <div key={p.cls} className={`pause__piece pause__piece--${p.cls}`} data-travel={p.travel} data-spin={p.spin} style={{ color: p.color }} aria-hidden="true">
            <Glyph name={p.glyph} />
          </div>
        ))}
        <Reveal as="p" className="pause__title" mode="lines">{children}</Reveal>
      </div>
    </section>
  )
}
