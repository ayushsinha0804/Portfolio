import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TLink, useSite } from '../lib/site'
import { person } from '../data/content'
import RollText from './RollText'

export default function Header() {
  const { ready, menuOpen, setMenuOpen } = useSite()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const lastY = useRef(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastY.current
      if (Math.abs(dy) > 4) {
        setHidden(dy > 0 && y > 160)
        lastY.current = y
      }
      setSolid(y > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const cls = [
    'site-header',
    ready && 'is-ready',
    hidden && !menuOpen && 'is-hidden',
    solid && !menuOpen && 'is-solid',
    menuOpen && 'is-nav-open',
  ].filter(Boolean).join(' ')

  return (
    <header className={cls}>
      <div className="site-header__bg" aria-hidden="true" />
      <div className="site-header__bar">
        <div className="site-header__side">
          <TLink to="/contact" className="status-pill" data-cursor="Say hello">
            <span className="status-pill__dot" />
            <RollText text={person.status} />
          </TLink>
        </div>
        <div className="site-header__brand">
          <TLink to="/" className="site-header__brand-link" aria-label="Ayush Sinha, home">
            <span className="site-header__brand-track">
              <span className="site-header__brand-full">Ayush Sinha</span>
              <span className="site-header__brand-mark" aria-hidden="true">
                <span className="rhombus" />
              </span>
            </span>
          </TLink>
        </div>
        <div className="site-header__side site-header__side--end">
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="menu-toggle__labels">
              <span className="menu-toggle__label menu-toggle__label--open"><RollText text="Menu" /></span>
              <span className="menu-toggle__label menu-toggle__label--close"><RollText text="Close" /></span>
            </span>
            <span className="menu-toggle__disc" aria-hidden="true">
              <span className="menu-toggle__diamond" />
              <span className="menu-toggle__x" />
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
