import { useState } from 'react'
import Reveal from '../components/Reveal'
import RollText from '../components/RollText'
import Glyph from '../components/Glyph'
import { person } from '../data/content'
import { useLocalTime } from '../components/FullscreenNav'
import { useDocumentTitle } from '../lib/title'

export default function Contact() {
  useDocumentTitle('Contact — Ayush Sinha')
  const [copied, setCopied] = useState(false)
  const time = useLocalTime(person.timezone)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${person.email}`
    }
  }

  return (
    <main id="main" className="contact container">
      <Glyph name="chat" className="contact__glyph" />
      <Reveal as="h1" className="contact__title display" mode="chars" trigger="mount" delay={0.15}>Say hello</Reveal>
      <Reveal as="p" className="contact__lead">
        I’m currently open to full-stack and backend roles. Whether you have a role, a project or just a question, my inbox is open.
      </Reveal>
      <div className="contact__email-row">
        <a className="contact__email serif" href={`mailto:${person.email}`} data-cursor="Write"><RollText text={person.email} /></a>
        <button className="pill contact__copy" onClick={copy} aria-live="polite">
          <span className="rhombus" aria-hidden="true" />
          {copied ? 'Copied' : 'Copy email'}
        </button>
      </div>
      <dl className="contact__meta">
        <div><dt>Based in</dt><dd>{person.location}</dd></div>
        <div><dt>Local time</dt><dd>{time} IST</dd></div>
        <div><dt>Status</dt><dd>{person.status}</dd></div>
        <div>
          <dt>Elsewhere</dt>
          <dd>
            <ul className="contact__socials">
              {person.socials.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer"><RollText text={`${s.label} ↗`} /></a></li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </main>
  )
}
