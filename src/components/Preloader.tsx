import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import { useSite } from '../lib/site'
import Glyph, { glyphNames } from './Glyph'

const COLORS = ['#2a4bd7', '#e3a33b', '#1b3226', '#c94f2c', '#8fae8b', '#b9c9f0']
const COUNT = 20
const STORAGE_KEY = 'as:loaded'

// Counter + glyphs that fall and pile up (Matter.js), then a cobalt panel
// sweeps up and the whole loader lifts away.
export default function Preloader() {
  const { setReady } = useSite()
  const [done, setDone] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const mark = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    const st = stage.current
    if (!el || !st) return

    let seen = false
    try { seen = sessionStorage.getItem(STORAGE_KEY) === '1' } catch { /* storage blocked */ }
    if (seen || prefersReducedMotion()) {
      setReady(true)
      const t = gsap.to(el, { autoAlpha: 0, duration: 0.4, onComplete: () => setDone(true) })
      return () => { t.kill() }
    }

    // ---- Physics ---------------------------------------------------------
    const { Engine, Bodies, Composite, Body } = Matter
    const engine = Engine.create({ gravity: { x: 0, y: 1.15 } })
    const W = st.clientWidth
    const H = st.clientHeight
    const T = 200
    Composite.add(engine.world, [
      Bodies.rectangle(W / 2, H + T / 2, W * 3, T, { isStatic: true }),
      Bodies.rectangle(-T / 2, H / 2, T, H * 4, { isStatic: true }),
      Bodies.rectangle(W + T / 2, H / 2, T, H * 4, { isStatic: true }),
    ])
    const els = Array.from(st.querySelectorAll<HTMLElement>('[data-body]'))
    const live: { el: HTMLElement; body: Matter.Body; size: number }[] = []
    const timers = els.map((node, i) =>
      window.setTimeout(() => {
        const size = node.offsetWidth
        const body = Bodies.circle(size / 2 + Math.random() * (W - size), -size, size * 0.46, {
          restitution: 0.3, friction: 0.4, frictionAir: 0.012, density: 0.002,
        })
        Body.setAngle(body, Math.random() * Math.PI)
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15)
        Composite.add(engine.world, body)
        live.push({ el: node, body, size })
        node.style.opacity = '1'
      }, 250 + i * 85),
    )
    let raf = 0
    const tick = () => {
      Engine.update(engine, 1000 / 60)
      for (const { el: n, body, size } of live) {
        n.style.transform = `translate3d(${body.position.x - size / 2}px, ${body.position.y - size / 2}px, 0) rotate(${body.angle}rad)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // ---- Counter + exit ---------------------------------------------------
    const progress = { v: 0 }
    const counter = gsap.to(progress, {
      v: 100,
      duration: 2.6,
      delay: 0.3,
      ease: 'power2.inOut',
      onUpdate: () => { if (mark.current) mark.current.textContent = `${Math.round(progress.v)}%` },
    })
    let exit: gsap.core.Timeline | undefined
    Promise.all([counter.then(), document.fonts.ready]).then(() => {
      exit = gsap
        .timeline({
          onComplete: () => {
            try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
            setDone(true)
          },
        })
        .fromTo(panel.current, { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: 'premium' })
        .fromTo(line.current, { x: '-100%', opacity: 1 }, { x: '100%', duration: 1.1, ease: 'power3.inOut' }, 0)
        .add(() => setReady(true))
        .to(el, { yPercent: -100, duration: 0.975, ease: 'premium' }, '+=0.05')
    })

    return () => {
      timers.forEach(window.clearTimeout)
      cancelAnimationFrame(raf)
      counter.kill()
      exit?.kill()
      Engine.clear(engine)
    }
  }, [setReady])

  if (done) return null
  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__mark" ref={mark}>0%</div>
      <div className="preloader__stage" ref={stage}>
        {Array.from({ length: COUNT }, (_, i) => (
          <div
            key={i}
            className="preloader__body"
            data-body=""
            style={{ color: COLORS[i % COLORS.length] }}
          >
            <Glyph name={glyphNames[i % glyphNames.length]} />
          </div>
        ))}
      </div>
      <div className="preloader__panel" ref={panel}>
        <div className="preloader__line" ref={line} />
      </div>
    </div>
  )
}
