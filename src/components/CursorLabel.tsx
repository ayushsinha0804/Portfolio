import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useFinePointer } from '../lib/media'

// A pill that trails the pointer and shows the [data-cursor] text of whatever
// is under it. Mouse/trackpad only.
export default function CursorLabel() {
  const fine = useFinePointer()
  const rootRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const pill = pillRef.current
    const text = textRef.current
    if (!fine || !root || !pill || !text) return
    const xTo = gsap.quickTo(root, 'x', { duration: 0.45, ease: 'power3' })
    const yTo = gsap.quickTo(root, 'y', { duration: 0.45, ease: 'power3' })
    let current = ''
    let lx = -100
    let ly = -100

    const update = (target: Element | null) => {
      const host = target?.closest?.('[data-cursor]') as HTMLElement | null
      const label = host?.dataset.cursor ?? ''
      if (label === current) return
      current = label
      if (label) text.textContent = label
      pill.classList.toggle('is-visible', !!label)
    }
    const move = (e: PointerEvent) => {
      lx = e.clientX
      ly = e.clientY
      xTo(lx)
      yTo(ly)
      update(e.target as Element)
    }
    const onScroll = () => update(document.elementFromPoint(lx, ly))
    const hide = () => update(null)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.removeEventListener('pointerleave', hide)
    }
  }, [fine])

  if (!fine) return null
  return (
    <div className="cursor-label" ref={rootRef} aria-hidden="true">
      <div className="cursor-label__pill" ref={pillRef}>
        <span className="cursor-label__diamond" />
        <span className="cursor-label__text" ref={textRef} />
      </div>
    </div>
  )
}
