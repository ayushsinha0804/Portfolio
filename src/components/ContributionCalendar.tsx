import { useMemo, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import { useSite } from '../lib/site'
import data from '../data/contributions.json'

type Day = [date: string, count: number, level: number]

const fmtDay = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
const toDate = (d: string) => new Date(`${d}T00:00:00Z`)
const plural = (n: number) => `${n} contribution${n === 1 ? '' : 's'}`

// Compact GitHub contribution calendar for the home page. Data is fetched at
// build time (scripts/contributions.ts) and drawn in the site palette; cells
// ripple in once the page is ready, and hovering a day shows its count.
export default function ContributionCalendar({ className = '' }: { className?: string }) {
  const { ready } = useSite()
  const root = useRef<HTMLDivElement>(null)
  const weeks = data.weeks as Day[][]
  const [active, setActive] = useState<Day | null>(null)
  const activeDays = useMemo(() => weeks.flat().filter((d) => d[1] > 0).length, [weeks])

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return
      gsap.fromTo(
        '.gh-cal__cell',
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)', delay: 0.6,
          stagger: { each: 0.0016, from: 'end' },
        },
      )
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <div className={`gh-cal ${className}`} ref={root}>
      <a className="gh-cal__label" href={`https://github.com/${data.login}`} target="_blank" rel="noreferrer">
        <span className="gh-cal__label-main" aria-live="polite">
          {active
            ? `${active[1] === 0 ? 'No contributions' : plural(active[1])} · ${fmtDay.format(toDate(active[0]))}`
            : `${plural(data.total)} in the last year`}
        </span>
        <span className="gh-cal__label-link">GitHub ↗</span>
      </a>
      <div
        className="gh-cal__grid"
        style={{ ['--weeks' as string]: weeks.length }}
        role="img"
        aria-label={`GitHub activity: ${plural(data.total)} in the last year, across ${activeDays} active days.`}
        onMouseLeave={() => setActive(null)}
      >
        {weeks.map((w, wi) =>
          w.map((day) => (
            <span
              key={day[0]}
              className="gh-cal__cell"
              data-level={day[2]}
              style={{ gridColumn: wi + 1, gridRow: toDate(day[0]).getUTCDay() + 1 }}
              onMouseEnter={() => setActive(day)}
              aria-hidden="true"
            />
          )),
        )}
      </div>
    </div>
  )
}
