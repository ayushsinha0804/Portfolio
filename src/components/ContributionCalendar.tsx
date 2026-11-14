import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import data from '../data/contributions.json'
import RollText from './RollText'

type Day = [date: string, count: number, level: number]

const fmtDay = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
const fmtMonth = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' })
const toDate = (d: string) => new Date(`${d}T00:00:00Z`)
const describe = ([date, count]: Day) =>
  `${count === 0 ? 'No' : count} contribution${count === 1 ? '' : 's'} on ${fmtDay.format(toDate(date))}`

// GitHub contribution calendar, fetched at build time (scripts/contributions.ts)
// and drawn in the site palette. Cells fill in week by week on scroll; hovering
// or tapping a day shows its count in the caption.
export default function ContributionCalendar() {
  const root = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const weeks = data.weeks as Day[][]
  const [active, setActive] = useState<Day | null>(null)

  const { months, activeDays, best } = useMemo(() => {
    const months: { col: number; label: string }[] = []
    let prev = -1
    weeks.forEach((w, i) => {
      const m = toDate(w[0][0]).getUTCMonth()
      if (m !== prev) {
        // skip a label that would collide with the previous one
        if (!months.length || i - months[months.length - 1].col >= 3) months.push({ col: i, label: fmtMonth.format(toDate(w[0][0])) })
        prev = m
      }
    })
    const days = weeks.flat()
    return {
      months,
      activeDays: days.filter((d) => d[1] > 0).length,
      best: days.reduce((a, b) => (b[1] > a[1] ? b : a), days[0]),
    }
  }, [weeks])

  // On narrow screens the grid scrolls sideways: start at the most recent week
  useLayoutEffect(() => {
    const s = scroller.current
    if (s) s.scrollLeft = s.scrollWidth
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const cells = gsap.utils.toArray<HTMLElement>('.gh-cal__cell')
      gsap.fromTo(
        cells,
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2)',
          stagger: { each: 0.0022, from: 'start' },
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
        },
      )
    },
    { scope: root },
  )

  return (
    <div className="gh-cal" ref={root}>
      <div className="gh-cal__head">
        <h3 className="spec__title">On GitHub</h3>
        <a className="pill" href={`https://github.com/${data.login}`} target="_blank" rel="noreferrer">
          <RollText text={`@${data.login} ↗`} />
        </a>
      </div>

      <dl className="gh-cal__stats">
        <div><dt>Contributions</dt><dd>{data.total}</dd></div>
        <div><dt>Active days</dt><dd>{activeDays}</dd></div>
        <div><dt>Most in a day</dt><dd>{best[1]}</dd></div>
      </dl>

      <div className="gh-cal__scroll" ref={scroller}>
        <div
          className="gh-cal__grid"
          style={{ ['--weeks' as string]: weeks.length }}
          role="img"
          aria-label={`${data.total} contributions in the last year, across ${activeDays} active days.`}
          onMouseLeave={() => setActive(null)}
        >
          {months.map((m) => (
            <span key={m.col} className="gh-cal__month" style={{ gridColumn: m.col + 2 }} aria-hidden="true">{m.label}</span>
          ))}
          {['Mon', 'Wed', 'Fri'].map((d, i) => (
            <span key={d} className="gh-cal__weekday" style={{ gridRow: i * 2 + 3 }} aria-hidden="true">{d}</span>
          ))}
          {weeks.map((w, wi) =>
            w.map((day) => (
              <span
                key={day[0]}
                className="gh-cal__cell"
                data-level={day[2]}
                data-active={active?.[0] === day[0] || undefined}
                style={{ gridColumn: wi + 2, gridRow: toDate(day[0]).getUTCDay() + 2 }}
                onMouseEnter={() => setActive(day)}
                onClick={() => setActive(day)}
                aria-hidden="true"
              />
            )),
          )}
        </div>
      </div>

      <div className="gh-cal__foot">
        <p className="gh-cal__caption" aria-live="polite">
          {active ? describe(active) : `Last 12 months · updated ${fmtDay.format(toDate(data.updated))}`}
        </p>
        <div className="gh-cal__legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => <span key={l} className="gh-cal__cell" data-level={l} />)}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
