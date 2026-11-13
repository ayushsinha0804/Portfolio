import type { CSSProperties } from 'react'

// Letter-roll hover: each glyph has a twin below it; on hover of the closest
// link/button/.roll-host the top glyph slides up and the twin slides in.
export default function RollText({ text, className = '' }: { text: string; className?: string }) {
  const chars = Array.from(text)
  return (
    <span className={`roll ${className}`}>
      <span className="visually-hidden">{text}</span>
      <span className="roll__chars" aria-hidden="true">
        {chars.map((c, i) => {
          const ch = c === ' ' ? ' ' : c
          return (
            <span className="roll__char" key={i} style={{ '--i': i } as CSSProperties}>
              <span className="roll__top">{ch}</span>
              <span className="roll__bot">{ch}</span>
            </span>
          )
        })}
      </span>
    </span>
  )
}
