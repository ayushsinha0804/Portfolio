import { person } from '../data/content'
import { TLink, useSite } from '../lib/site'
import Reveal from './Reveal'
import RollText from './RollText'
import { resumeHref } from '../lib/assets'

export default function Footer() {
  const { lenis } = useSite()
  return (
    <footer className="site-footer container">
      <TLink to="/contact" className="site-footer__cta" data-cursor="Get in touch">
        <Reveal as="span" className="site-footer__cta-text display" mode="lines">
          Let’s build<br />something
        </Reveal>
      </TLink>
      <div className="site-footer__row">
        <a className="site-footer__email" href={`mailto:${person.email}`}><RollText text={person.email} /></a>
        <ul className="site-footer__links">
          <li><a href={resumeHref} target="_blank" rel="noreferrer"><RollText text="Résumé" /></a></li>
          {person.socials.map((s) => (
            <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer"><RollText text={s.label} /></a></li>
          ))}
        </ul>
      </div>
      <div className="site-footer__legal">
        <span>© {new Date().getFullYear()} {person.name}</span>
        <span>{person.location}</span>
        <button onClick={() => lenis()?.scrollTo(0, { duration: 1.6 })}><RollText text="Back to top ↑" /></button>
      </div>
    </footer>
  )
}
