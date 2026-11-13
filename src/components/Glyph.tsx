import type { ReactElement } from 'react'
import type { GlyphName } from '../data/content'

// Flat, chunky single-colour illustrations (viewBox 100×100, fill = currentColor).
// They play the role the fruit drawings play in the reference: loader, card decor,
// floating parallax pieces.
const paths: Record<GlyphName, ReactElement> = {
  pin: (
    <path fillRule="evenodd" d="M50 4c-19.3 0-35 15.2-35 34 0 24.6 35 58 35 58s35-33.4 35-58C85 19.2 69.3 4 50 4Zm0 47a13 13 0 1 0 0-26 13 13 0 0 0 0 26Z" />
  ),
  window: (
    <path fillRule="evenodd" d="M12 14h76a8 8 0 0 1 8 8v56a8 8 0 0 1-8 8H12a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8Zm4 20v40h68V34H16Zm2-11a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm12 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm12 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
  ),
  chat: (
    <path d="M18 10h64c7.7 0 14 6.3 14 14v34c0 7.7-6.3 14-14 14H46L24 92V72h-6C10.3 72 4 65.7 4 58V24c0-7.7 6.3-14 14-14Z" />
  ),
  eye: (
    <path fillRule="evenodd" d="M50 20C26 20 8 40 2 50c6 10 24 30 48 30s42-20 48-30C92 40 74 20 50 20Zm0 48a18 18 0 1 0 0-36 18 18 0 0 0 0 36Zm0-10a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
  ),
  shield: (
    <path fillRule="evenodd" d="M50 4 12 18v28c0 24 16 42 38 50 22-8 38-26 38-50V18L50 4Zm-6 60L29 49l7-7 8 8 20-20 7 7-27 27Z" />
  ),
  heart: (
    <path d="M50 92S6 64 6 34C6 19 17 8 31 8c8.4 0 15.2 4.2 19 10.6C53.8 12.2 60.6 8 69 8c14 0 25 11 25 26 0 30-44 58-44 58Z" />
  ),
  key: (
    <path fillRule="evenodd" d="M30 12a24 24 0 1 0 21.7 34.3H64v10h10v-10h8v12h10V36H51.7A24 24 0 0 0 30 12Zm0 34a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
  ),
  braces: (
    <path d="M36 8c-12 0-17 5-17 16v12c0 6-3 9-11 9v10c8 0 11 3 11 9v12c0 11 5 16 17 16h4V82h-3c-5 0-6-2-6-7V62c0-6-3-10-9-12 6-2 9-6 9-12V25c0-5 1-7 6-7h3V8h-4Zm28 0h-4v10h3c5 0 6 2 6 7v13c0 6 3 10 9 12-6 2-9 6-9 12v13c0 5-1 7-6 7h-3v10h4c12 0 17-5 17-16V64c0-6 3-9 11-9V45c-8 0-11-3-11-9V24C81 13 76 8 64 8Z" />
  ),
  database: (
    <path fillRule="evenodd" d="M50 6C29 6 12 12 12 20v60c0 8 17 14 38 14s38-6 38-14V20c0-8-17-14-38-14Zm0 22c17.7 0 30-4.2 30-8s-12.3-8-30-8-30 4.2-30 8 12.3 8 30 8Zm38 10c0 8-17 14-38 14S12 46 12 38v6c0 8 17 14 38 14s38-6 38-14v-6Zm0 24c0 8-17 14-38 14S12 70 12 62v6c0 8 17 14 38 14s38-6 38-14v-6Z" />
  ),
  terminal: (
    <path fillRule="evenodd" d="M12 12h76a8 8 0 0 1 8 8v60a8 8 0 0 1-8 8H12a8 8 0 0 1-8-8V20a8 8 0 0 1 8-8Zm10 22 16 16-16 16 7 7 23-23-23-23-7 7Zm32 30v10h26V64H54Z" />
  ),
  diamond: <rect x="22" y="22" width="56" height="56" rx="6" transform="rotate(45 50 50)" />,
  gear: (
    <path fillRule="evenodd" d="M43 4h14l2 12 9 4 10-7 10 10-7 10 4 9 12 2v14l-12 2-4 9 7 10-10 10-10-7-9 4-2 12H43l-2-12-9-4-10 7-10-10 7-10-4-9-12-2V43l12-2 4-9-7-10 10-10 10 7 9-4 2-12Zm7 62a16 16 0 1 0 0-32 16 16 0 0 0 0 32Z" />
  ),
  cloud: (
    <path d="M26 82C13.3 82 4 72.7 4 61c0-10.4 7.5-19 17.5-20.6C24 28 35 18 48 18c12.4 0 22.8 8.6 25.4 20.2C86 38.6 96 48.5 96 61c0 11.6-9.4 21-21 21H26Z" />
  ),
  branch: (
    <path d="M28 6a14 14 0 0 0-5 27.1v33.8A14 14 0 1 0 33 67V56c0-5 3-8 9-8h14c11 0 20-8 21-19.1A14 14 0 1 0 67 29c-.8 6-4 9-11 9H42c-3.4 0-6.4.8-9 2.2v-7.1A14 14 0 0 0 28 6Z" />
  ),
}

export const glyphNames = Object.keys(paths) as GlyphName[]

export default function Glyph({
  name,
  className,
  title,
}: {
  name: GlyphName
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  )
}
