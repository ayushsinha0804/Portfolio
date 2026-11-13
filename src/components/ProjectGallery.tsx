import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import type { Project } from '../data/content'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

// Real screenshots in light device frames (browser window / phone). Frames
// rise in on scroll and drift at different speeds.
export default function ProjectGallery({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.gallery__item').forEach((el, i) => {
        gsap.from(el, { y: 80, autoAlpha: 0, duration: 1.3, ease: 'expo', delay: i * 0.1, scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
        gsap.fromTo(el.querySelector('.gallery__device'), { yPercent: i % 2 ? 6 : 2 }, {
          yPercent: i % 2 ? -6 : -2, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: root },
  )
  if (!project.images?.length) return null
  return (
    <section className="gallery container" ref={root} aria-label={`${project.title} screenshots`}>
      {project.images.map((img) => (
        <figure key={img.src} className={`gallery__item gallery__item--${img.frame}`}>
          <div className={`gallery__device gallery__device--${img.frame}`}>
            {img.frame === 'desktop' && (
              <div className="gallery__chrome" aria-hidden="true"><span /><span /><span /></div>
            )}
            <img src={asset(img.src)} alt={img.alt} loading="lazy" decoding="async" />
          </div>
          <figcaption className="gallery__caption"><span className="rhombus" aria-hidden="true" />{img.caption}</figcaption>
        </figure>
      ))}
    </section>
  )
}
