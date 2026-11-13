import { useEffect, useRef, type ReactNode } from 'react'

// Horizontal slider: native overflow scrolling (touch, trackpad, arrow keys)
// plus click-and-drag for mouse, with click suppression after a drag.
export default function CardSlider({ children, label, inline = false }: { children: ReactNode; label: string; inline?: boolean }) {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el) return
    let down = false
    let moved = false
    let startX = 0
    let startScroll = 0
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      down = true
      moved = false
      startX = e.clientX
      startScroll = el.scrollLeft
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - startX
      if (!moved && Math.abs(dx) > 6) {
        moved = true
        el.classList.add('is-dragging')
      }
      if (moved) el.scrollLeft = startScroll - dx
    }
    const onUp = () => {
      down = false
      el.classList.remove('is-dragging')
    }
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('click', onClick, true)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('click', onClick, true)
    }
  }, [])

  return (
    <div className={`card-slider${inline ? ' is-inline' : ''}`}>
      <div className="card-slider__track" ref={track} role="region" aria-label={label} tabIndex={0} onDragStart={(e) => e.preventDefault()}>
        {children}
      </div>
    </div>
  )
}
