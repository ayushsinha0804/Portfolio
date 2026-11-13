import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import Glyph from './Glyph'
import Reveal from './Reveal'

// A coloured box with a giant word behind and illustrations in front that move
// at a different rate, creating depth.
export default function DepthTitle({ word, children }: { word: string; children: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      gsap.fromTo('.depth__word', { yPercent: 18 }, { yPercent: -18, ease: 'none', scrollTrigger: st })
      gsap.fromTo('.depth__front', { yPercent: 14 }, { yPercent: -22, ease: 'none', scrollTrigger: st })
    },
    { scope: root },
  )
  return (
    <section className="depth container" ref={root}>
      <div className="depth__box grain">
        <p className="depth__word" aria-hidden="true">{word}</p>
        <div className="depth__front" aria-hidden="true">
          <span className="depth__piece depth__piece--a"><Glyph name="cloud" /></span>
          <span className="depth__piece depth__piece--b"><Glyph name="branch" /></span>
          <span className="depth__piece depth__piece--c"><Glyph name="gear" /></span>
        </div>
        <h2 className="visually-hidden">{word}</h2>
        <Reveal as="p" className="depth__subtitle">{children}</Reveal>
      </div>
    </section>
  )
}
