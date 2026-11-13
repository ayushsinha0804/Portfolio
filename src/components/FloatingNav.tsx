import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../lib/gsap'
import { useSite } from '../lib/site'

// Pill that floats at the bottom while you are inside the listed sections,
// highlights the current one and scrolls to the one you pick.
export default function FloatingNav({ wrapperId, items }: { wrapperId: string; items: { id: string; label: string }[] }) {
  const { lenis, ready } = useSite()
  const [active, setActive] = useState(items[0]?.id)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ready) return
    const triggers = [
      ScrollTrigger.create({
        trigger: `#${wrapperId}`,
        start: 'top 60%',
        end: 'bottom 70%',
        onToggle: (self) => setVisible(self.isActive),
      }),
      ...items.map((it) =>
        ScrollTrigger.create({
          trigger: `#${it.id}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => self.isActive && setActive(it.id),
        }),
      ),
    ]
    return () => triggers.forEach((t) => t.kill())
  }, [ready, wrapperId, items])

  return (
    <nav className={`floating-nav${visible ? ' is-visible' : ''}`} aria-label="Sections">
      {items.map((it) => (
        <button
          key={it.id}
          className={`floating-nav__link${active === it.id ? ' is-active' : ''}`}
          aria-current={active === it.id ? 'true' : undefined}
          onClick={() => lenis()?.scrollTo(`#${it.id}`, { offset: -100, duration: 1.4 })}
        >
          {it.label}
        </button>
      ))}
    </nav>
  )
}
