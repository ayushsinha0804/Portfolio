import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'

type Row = { label: string; value: string }

// Two-column table with hairline rules that draw in as rows enter the viewport.
export default function SpecTable({ title, columns, rows }: { title?: string; columns: [string, string]; rows: Row[] }) {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const rowEls = gsap.utils.toArray<HTMLElement>('.spec__row')
      gsap.set(rowEls, { '--rule': 0, autoAlpha: 0, y: 16 })
      ScrollTrigger.batch(rowEls, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { '--rule': 1, autoAlpha: 1, y: 0, duration: 1, ease: 'expo', stagger: 0.07 }),
      })
    },
    { scope: root },
  )
  return (
    <div className="spec" ref={root}>
      {title && <h3 className="spec__title">{title}</h3>}
      <div className="spec__table" role="table">
        <div className="spec__row spec__row--head" role="row">
          <span role="columnheader">{columns[0]}</span>
          <span role="columnheader">{columns[1]}</span>
        </div>
        {rows.map((r, i) => (
          <div className="spec__row" role="row" key={i}>
            <span role="cell" className="spec__label">{r.label}</span>
            <span role="cell">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
