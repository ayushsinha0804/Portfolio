import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import { TLink, useSite } from '../lib/site'
import { projects } from '../data/content'
import Glyph from './Glyph'
import ContributionCalendar from './ContributionCalendar'
import RollText from './RollText'
import { resumeHref } from '../lib/assets'
import { projectVars } from './shapeStyle'

const wrap = (v: number, m: number) => ((v % m) + m) % m
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

// An endless, tilted belt of project "objects". Wheel, drag, touch and arrow
// keys push a target offset; the rendered offset chases it with easing, and
// each item bends around a virtual cylinder (rotateY / translateZ) and skews
// with velocity.
export default function ProjectBelt() {
  const { ready } = useSite()
  const root = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const state = useRef({ target: 0, current: 0, skew: 0, spacing: 1, total: 1, half: 1, dragging: false, moved: false, hovering: false, lastInput: 0 })
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  // ---- Layout + render loop -------------------------------------------------
  useEffect(() => {
    const el = root.current
    const railEl = rail.current
    if (!el || !railEl) return
    const items = Array.from(railEl.querySelectorAll<HTMLElement>('.belt__item'))
    const s = state.current
    const reduced = prefersReducedMotion()

    const measure = () => {
      const w = items[0]?.offsetWidth ?? 300
      const gap = Math.max(18, window.innerWidth * 0.028)
      s.spacing = w + gap
      s.total = s.spacing * items.length
      s.half = window.innerWidth / 2
    }
    measure()
    window.addEventListener('resize', measure)

    const tick = () => {
      // idle drift: paused while hovered, dragged, recently used or in a hidden tab
      if (!reduced && !s.dragging && !s.hovering && !document.hidden && performance.now() - s.lastInput > 2200) s.target -= 0.35
      const prev = s.current
      s.current += (s.target - s.current) * (reduced ? 1 : 0.085)
      const vel = s.current - prev
      s.skew += (clamp(vel * -0.22, -9, 9) - s.skew) * 0.15
      let best = 0
      let bestD = Infinity
      items.forEach((item, i) => {
        const x = wrap(i * s.spacing + s.current + s.total / 2, s.total) - s.total / 2
        const d = x / s.half
        const ad = Math.abs(d)
        if (ad < bestD) { bestD = ad; best = i }
        item.style.transform =
          `translate3d(${x}px,0,${-ad * 220}px) rotateY(${clamp(d, -1.6, 1.6) * -26}deg) ` +
          `scale(${1 - Math.min(ad, 1.5) * 0.1}) skewX(${reduced ? 0 : s.skew}deg)`
        item.style.opacity = String(clamp(1.9 - ad, 0, 1))
        item.style.zIndex = String(100 - Math.round(ad * 10))
      })
      if (best !== activeRef.current) {
        activeRef.current = best
        setActive(best)
      }
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('resize', measure)
    }
  }, [])

  // ---- Input -----------------------------------------------------------------
  useEffect(() => {
    const el = root.current
    if (!el) return
    const s = state.current
    let startX = 0
    let startTarget = 0
    let lastX = 0
    let lastT = 0
    let vx = 0

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      s.target -= (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 0.9
      s.lastInput = performance.now()
    }
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      s.dragging = true
      s.moved = false
      startX = lastX = e.clientX
      lastT = performance.now()
      startTarget = s.target
      vx = 0
    }
    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return
      const dx = e.clientX - startX
      if (!s.moved && Math.abs(dx) > 6) {
        s.moved = true
        el.classList.add('is-dragging')
      }
      const now = performance.now()
      vx = (e.clientX - lastX) / Math.max(now - lastT, 1)
      lastX = e.clientX
      lastT = now
      s.target = startTarget + dx * 1.3
      s.lastInput = now
    }
    const onUp = () => {
      if (!s.dragging) return
      s.dragging = false
      el.classList.remove('is-dragging')
      s.target += clamp(vx, -4, 4) * 260 // throw momentum
      s.lastInput = performance.now()
    }
    const onClick = (e: MouseEvent) => {
      if (s.moved) {
        e.preventDefault()
        e.stopPropagation()
        s.moved = false
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      e.preventDefault()
      s.target += (e.key === 'ArrowLeft' ? 1 : -1) * s.spacing
      s.lastInput = performance.now()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    el.addEventListener('click', onClick, true)
    const onEnter = (e: PointerEvent) => { if (e.pointerType === 'mouse') s.hovering = true }
    const onLeave = () => { s.hovering = false }
    // arrow keys only steer the belt while focus is inside it
    el.addEventListener('keydown', onKey)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      el.removeEventListener('click', onClick, true)
      el.removeEventListener('keydown', onKey)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  // Keyboard focus (Tab) brings the focused project to the centre
  const centre = (i: number) => {
    const s = state.current
    const desired = -i * s.spacing
    const k = Math.round((s.target - desired) / s.total)
    s.target = desired + k * s.total
    s.lastInput = performance.now()
  }

  // ---- Intro -----------------------------------------------------------------
  useEffect(() => {
    const el = root.current
    if (!el || !ready) return
    if (prefersReducedMotion()) {
      el.classList.add('is-in')
      return
    }
    const ctx = gsap.context(() => {
      gsap.timeline({ onStart: () => el.classList.add('is-in') })
        .from('.belt__item-inner', { yPercent: 130, rotate: (i) => (i % 2 ? 8 : -8), duration: 1.4, ease: 'expo', stagger: 0.06 })
        .from('.belt__shape', { scale: 0.4, autoAlpha: 0, duration: 1.6, ease: 'expo' }, 0)
        .from('.belt__badge', { y: 80, rotate: -40, autoAlpha: 0, duration: 1.4, ease: 'expo' }, 0.3)
        .from('.home-bar > *', { y: 30, autoAlpha: 0, duration: 1, ease: 'expo', stagger: 0.08 }, 0.5)
    }, el)
    // Throw the belt a little on entry
    state.current.target -= state.current.spacing * 1.5
    return () => ctx.revert()
  }, [ready])

  const p = projects[active]

  return (
    <section
      className="belt"
      ref={root}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Selected projects. Use the left and right arrow keys to browse."
    >
      <div className="belt__shape" aria-hidden="true" />
      <svg className="belt__badge" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#badge-circle">FULL-STACK DEVELOPER · SHIPS TO PRODUCTION · </textPath>
        </text>
        <rect x="88" y="88" width="24" height="24" rx="3" transform="rotate(45 100 100)" />
      </svg>

      <div className="belt__viewport">
        <div className="belt__rail" ref={rail}>
          {projects.map((proj, i) => (
            <TLink
              key={proj.slug}
              to={`/work/${proj.slug}`}
              className="belt__item"
              data-cursor="Open case"
              aria-label={`${proj.title} — ${proj.kicker}`}
              onFocus={() => centre(i)}
              draggable={false}
              style={projectVars(proj)}
            >
              <span className="belt__item-inner grain">
                <span className="belt__item-body">
                <span className="belt__item-top">
                  <span>{String(i + 1).padStart(2, '0')}.</span>
                  <span>{proj.year ?? proj.category}</span>
                </span>
                <span className="belt__item-art"><Glyph name={proj.glyph} /></span>
                <span className="belt__item-title">{proj.title}</span>
                <span className="belt__item-kicker">{proj.kicker}</span>
                </span>
              </span>
            </TLink>
          ))}
        </div>
      </div>

      <div className="home-bar container">
        <div className="home-bar__intro">
          <p className="home-bar__role">Full-stack developer</p>
          <p className="home-bar__stack">From Delhi · Node.js, TypeScript, PostgreSQL, React &amp; Flutter</p>
          <div className="home-bar__ctas">
            <TLink to="/work" className="pill home-bar__cta"><RollText text="View work" /></TLink>
            <a href={resumeHref} className="pill home-bar__cta" target="_blank" rel="noreferrer"><RollText text="Résumé ↗" /></a>
          </div>
        </div>
        <p className="home-bar__prompt">
          <span className="home-bar__prompt-line" aria-hidden="true" />
          Scroll or drag to explore
        </p>
        <div className="home-bar__side">
          <ContributionCalendar className="home-bar__activity" />
          <p className="home-bar__current">
          <span className="home-bar__count">{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <span key={p.slug} className="home-bar__name">{p.title}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
