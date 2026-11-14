import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import { useSite } from '../lib/site'
import data from '../data/contributions.json'

type Day = [date: string, count: number, level: number]

const fmtDay = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
const fmtMonth = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' })
const toDate = (d: string) => new Date(`${d}T00:00:00Z`)
const plural = (n: number) => `${n} contribution${n === 1 ? '' : 's'}`
const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Compact GitHub contribution calendar for the home page. Data is fetched at
// build time (scripts/contributions.ts). On hover (tap on touch) a card wipes
// open from the corner, the grid widens and month labels, stats and a legend
// rise out of masks — the same corner-wipe + masked-rise language as the rest
// of the site.
export default function ContributionCalendar({ className = '' }: { className?: string }) {
  const { ready } = useSite()
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const weeks = data.weeks as Day[][]
  const [active, setActive] = useState<Day | null>(null)
  const [open, setOpen] = useState(false)

  const { months, activeDays, best } = useMemo(() => {
    const months: { col: number; label: string }[] = []
    let prev = -1
    weeks.forEach((w, i) => {
      const m = toDate(w[0][0]).getUTCMonth()
      if (m === prev) return
      prev = m
      // skip labels that would collide with the previous one or run off the end
      if (i <= weeks.length - 3 && (!months.length || i - months[months.length - 1].col >= 3)) months.push({ col: i, label: fmtMonth.format(toDate(w[0][0])) })
    })
    const days = weeks.flat()
    return {
      months,
      activeDays: days.filter((d) => d[1] > 0).length,
      best: days.reduce((a, b) => (b[1] > a[1] ? b : a), days[0]),
    }
  }, [weeks])

  // Entry ripple once the preloader has gone
  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return
      gsap.fromTo(
        '.gh-cal__grid .gh-cal__cell',
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)', delay: 0.6, stagger: { each: 0.0016, from: 'end' } },
      )
    },
    { scope: root, dependencies: [ready] },
  )

  // Expand / collapse
  const { contextSafe } = useGSAP({ scope: root })
  const animate = contextSafe((to: boolean) => {
    const el = root.current
    const pn = panel.current
    if (!el || !pn) return
    const instant = prefersReducedMotion()
    const base = el.clientWidth
    const wide = Math.max(base, Math.min(640, window.innerWidth * 0.46, window.innerWidth - 40))
    const reveals = el.querySelectorAll('.gh-cal__reveal')
    const inners = el.querySelectorAll('.gh-cal__reveal > *')
    const bg = el.querySelector('.gh-cal__bg')
    gsap.killTweensOf([pn, bg, reveals, inners])

    if (to) {
      const d = instant ? 0 : 1
      gsap.fromTo(pn, { width: pn.offsetWidth }, { width: wide, duration: 0.8 * d, ease: 'premium' })
      gsap.to(bg, { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 0.75 * d, ease: 'premium' })
      gsap.to(reveals, { height: 'auto', duration: 0.6 * d, ease: 'premium' })
      gsap.fromTo(inners, { yPercent: 110 }, { yPercent: 0, duration: 0.7 * d, ease: 'expo', stagger: 0.06 * d, delay: 0.15 * d })
    } else {
      const d = instant ? 0 : 1
      gsap.to(inners, { yPercent: 110, duration: 0.3 * d, ease: 'power2.in' })
      gsap.to(reveals, { height: 0, duration: 0.5 * d, ease: 'premium', delay: 0.1 * d })
      gsap.to(bg, { clipPath: 'inset(100% 0% 0% 100% round 20px)', duration: 0.55 * d, ease: 'premium', delay: 0.1 * d })
      gsap.to(pn, { width: base, duration: 0.6 * d, ease: 'premium', delay: 0.1 * d, onComplete: () => { gsap.set(pn, { clearProps: 'width' }) } })
    }
  })

  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    animate(open)
  }, [open, animate])

  // Touch: tap outside closes
  useEffect(() => {
    if (!open || canHover()) return
    const close = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <div
      className={`gh-cal ${open ? 'is-open' : ''} ${className}`}
      ref={root}
      onMouseEnter={() => canHover() && setOpen(true)}
      onMouseLeave={() => { if (canHover()) setOpen(false); setActive(null) }}
    >
      <div className="gh-cal__panel" ref={panel}>
        <span className="gh-cal__bg" aria-hidden="true" />

        <a className="gh-cal__label" href={`https://github.com/${data.login}`} target="_blank" rel="noreferrer">
          <span className="gh-cal__label-main" aria-live="polite">
            {active
              ? `${active[1] === 0 ? 'No contributions' : plural(active[1])} · ${fmtDay.format(toDate(active[0]))}`
              : `${plural(data.total)} in the last year`}
          </span>
          <span className="gh-cal__label-link">GitHub ↗</span>
        </a>

        <div className="gh-cal__reveal" aria-hidden="true">
          <div className="gh-cal__months" style={{ ['--weeks' as string]: weeks.length }}>
            {months.map((m) => <span key={m.col} style={{ gridColumn: m.col + 1 }}>{m.label}</span>)}
          </div>
        </div>

        <div
          className="gh-cal__grid"
          style={{ ['--weeks' as string]: weeks.length }}
          role="img"
          aria-label={`GitHub activity: ${plural(data.total)} in the last year, across ${activeDays} active days.`}
          onClick={() => { if (!canHover()) setOpen((o) => !o) }}
        >
          {weeks.map((w, wi) =>
            w.map((day) => (
              <span
                key={day[0]}
                className="gh-cal__cell"
                data-level={day[2]}
                style={{ gridColumn: wi + 1, gridRow: toDate(day[0]).getUTCDay() + 1 }}
                onMouseEnter={() => setActive(day)}
                onClick={() => setActive(day)}
                aria-hidden="true"
              />
            )),
          )}
        </div>

        <div className="gh-cal__reveal">
          <div className="gh-cal__foot">
            <dl className="gh-cal__stats">
              <div><dt>Active days</dt><dd>{activeDays}</dd></div>
              <div><dt>Most in a day</dt><dd>{best[1]}</dd></div>
            </dl>
            <div className="gh-cal__legend" aria-hidden="true">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((l) => <span key={l} className="gh-cal__cell" data-level={l} />)}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
