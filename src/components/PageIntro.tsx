import type { ReactNode } from 'react'
import Reveal from './Reveal'

export default function PageIntro({ children, after }: { children: ReactNode; after?: ReactNode }) {
  return (
    <section className="page-intro container">
      <div className="page-intro__inner">
        <span className="rhombus page-intro__rhombus" aria-hidden="true" />
        <Reveal className="page-intro__text">{children}</Reveal>
        {after && <Reveal className="page-intro__after">{after}</Reveal>}
      </div>
    </section>
  )
}
