import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/media'
import { useSite } from '../lib/site'

type Props = {
  as?: ElementType
  children: ReactNode
  className?: string
  mode?: 'lines' | 'words' | 'chars'
  delay?: number
  /** 'scroll' waits until the element enters the viewport; 'mount' plays immediately */
  trigger?: 'scroll' | 'mount'
  id?: string
}

// Masked text reveal: lines/words/chars rise from behind a clipping mask.
export default function Reveal({
  as: Tag = 'div', children, className, mode = 'lines', delay = 0, trigger = 'scroll', id,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const { ready } = useSite()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.classList.add('is-revealed')
      return
    }
    if (!ready) return
    let cancelled = false
    const ctx = gsap.context(() => {}, el)
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx.add(() => {
        const split = SplitText.create(el, {
          type: mode === 'lines' ? 'lines' : `lines,${mode}`,
          mask: mode === 'chars' ? 'lines' : mode,
          linesClass: 'split-line',
        })
        el.classList.add('is-revealed')
        const targets = mode === 'chars' ? split.chars : mode === 'words' ? split.words : split.lines
        gsap.from(targets, {
          yPercent: 115,
          duration: mode === 'chars' ? 1.1 : 1.25,
          ease: 'expo',
          stagger: mode === 'chars' ? 0.03 : mode === 'words' ? 0.04 : 0.09,
          delay,
          scrollTrigger: trigger === 'scroll' ? { trigger: el, start: 'top 90%', once: true } : undefined,
        })
      })
    })
    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [ready, mode, delay, trigger])

  return (
    <Tag ref={ref} className={className} data-reveal="" id={id}>
      {children}
    </Tag>
  )
}
