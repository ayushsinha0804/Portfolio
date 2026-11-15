import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import { experience, person } from '../data/content'
import portrait from '../assets/portrait.jpg'
import Glyph from './Glyph'
import Reveal from './Reveal'
import RollText from './RollText'
import { resumeHref } from '../lib/assets'

// Arch-framed photo: wipes open on scroll, drifts inside its frame, and shows
// as an ink/cobalt duotone until hovered (full colour on touch devices).
export default function Portrait() {
  const root = useRef<HTMLElement>(null)
  const current = experience[0]

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const frame = root.current?.querySelector('.portrait__frame')
      if (!frame) return
      gsap.fromTo(
        frame,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo', scrollTrigger: { trigger: frame, start: 'top 85%', once: true } },
      )
      gsap.fromTo('.portrait__media', { yPercent: -7 }, {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.utils.toArray<HTMLElement>('.portrait__piece').forEach((p, i) => {
        gsap.fromTo(p, { yPercent: 60 + i * 40 }, {
          yPercent: -(60 + i * 40), rotate: i % 2 ? 25 : -20, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="portrait container" ref={root}>
      <div className="portrait__visual">
        <span className="portrait__piece portrait__piece--a" aria-hidden="true"><Glyph name="diamond" /></span>
        <span className="portrait__piece portrait__piece--b" aria-hidden="true"><Glyph name="braces" /></span>
        <figure className="portrait__frame" data-cursor="Hello">
          <div className="portrait__media">
            <img src={portrait} alt="Ayush Sinha holding a white cat" width={720} height={1280} loading="lazy" decoding="async" />
          </div>
          <span className="portrait__tint" aria-hidden="true" />
        </figure>
      </div>
      <div className="portrait__text">
        <Reveal as="h2" className="portrait__title" mode="chars">Hi, I’m Ayush.</Reveal>
        <Reveal as="p" className="portrait__lead">
          I enjoy creating things that live on the internet — and making sure they keep working once they’re out there.
        </Reveal>
        <dl className="portrait__meta">
          <div><dt>Based in</dt><dd>{person.location}</dd></div>
          <div><dt>Currently</dt><dd>{current.role}, {current.company}</dd></div>
          <div><dt>Status</dt><dd>{person.status}</dd></div>
        </dl>
        <a className="pill portrait__resume" href={resumeHref} target="_blank" rel="noreferrer"><RollText text="Download resume ↗" /></a>
      </div>
    </section>
  )
}
