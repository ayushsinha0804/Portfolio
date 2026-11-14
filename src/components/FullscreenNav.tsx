import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from '../lib/gsap'
import { TLink, useSite } from '../lib/site'
import { person } from '../data/content'
import RollText from './RollText'
import { resumeHref } from '../lib/assets'

const primary = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/experience', label: 'Experience' },
  { to: '/about', label: 'About' },
]

function useLocalTime(tz: string) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = window.setInterval(() => setT(fmt()), 15000)
    return () => window.clearInterval(id)
  })
  return t
}
export { useLocalTime }

export default function FullscreenNav() {
  const { menuOpen, setMenuOpen } = useSite()
  const { pathname } = useLocation()
  const root = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  const time = useLocalTime(person.timezone)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const items = el.querySelectorAll('.fp-nav__inner-mask > *')
    const fades = el.querySelectorAll('.fp-nav__fade')
    if (first.current) {
      first.current = false
      gsap.set(el, { clipPath: 'inset(0% 0% 100% 0%)', autoAlpha: 0 })
      return
    }
    const tl = gsap.timeline()
    if (menuOpen) {
      tl.set(el, { autoAlpha: 1 })
        .fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'premium' })
        .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo', stagger: 0.06 }, 0.35)
        .fromTo(fades, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 }, 0.6)
        .add(() => el.querySelector<HTMLElement>('a')?.focus({ preventScroll: true }))
    } else {
      tl.to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: 'premium' })
        .set(el, { autoAlpha: 0 })
    }
    return () => { tl.kill() }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, setMenuOpen])

  return (
    <div className="fp-nav" id="site-nav" ref={root} inert={!menuOpen} aria-hidden={!menuOpen}>
      <nav className="fp-nav__primary" aria-label="Main">
        <ul style={{ '--n': primary.length - 1 } as CSSProperties}>
          {primary.map((l, i) => {
            const active = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)
            return (
              <li key={l.to} className={`fp-nav__item${active ? ' is-active' : ''}`} style={{ '--i': i } as CSSProperties}>
                <span className="fp-nav__inner-mask">
                  <TLink to={l.to} className="fp-nav__link" aria-current={active ? 'page' : undefined}>
                    <span className="fp-nav__index">0{i + 1}</span>
                    <RollText text={l.label} />
                  </TLink>
                </span>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="fp-nav__footer">
        <ul className="fp-nav__secondary">
          <li className="fp-nav__fade"><TLink to="/contact" className="fp-nav__small"><RollText text="Contact" /></TLink></li>
          <li className="fp-nav__fade"><a className="fp-nav__small" href={resumeHref} target="_blank" rel="noreferrer"><RollText text="Résumé" /></a></li>
          {person.socials.map((s) => (
            <li className="fp-nav__fade" key={s.label}>
              <a className="fp-nav__small" href={s.href} target="_blank" rel="noreferrer"><RollText text={s.label} /></a>
            </li>
          ))}
        </ul>
        <p className="fp-nav__meta fp-nav__fade">
          <a href={`mailto:${person.email}`}>{person.email}</a>
          <span>{person.location} · {time} IST</span>
        </p>
      </div>
    </div>
  )
}
