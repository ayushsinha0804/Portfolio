import {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState,
  type AnchorHTMLAttributes, type MouseEvent, type ReactNode,
} from 'react'
import { useLocation, useNavigate, useHref } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import { prefersReducedMotion } from './media'
import { preloadRoute } from '../routes'
import { metaFor } from '../data/meta'

type SiteCtx = {
  ready: boolean
  setReady: (v: boolean) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  go: (to: string) => void
  lenis: () => Lenis | null
}

const Ctx = createContext<SiteCtx | null>(null)
export const useSite = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useSite must be used inside <SiteProvider>')
  return c
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/work': 'Work',
  '/experience': 'Experience',
  '/about': 'About',
  '/contact': 'Contact',
}
const labelFor = (path: string) =>
  routeLabels[path] ?? (path.startsWith('/work/') ? 'Case study' : '')

export function SiteProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const busy = useRef(false)
  const viaTransition = useRef(false)
  const navigate = useNavigate()
  const location = useLocation()

  // ---- Smooth scroll (Lenis) driven by the GSAP ticker -------------------
  useEffect(() => {
    if (!prefersReducedMotion()) document.documentElement.classList.add('js-motion')
    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, allowNestedScroll: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Freeze scrolling under the preloader and the full-screen menu
  useEffect(() => {
    const l = lenisRef.current
    if (!l) return
    if (!ready || menuOpen) l.stop()
    else l.start()
  }, [ready, menuOpen])

  // Per-route <title> and description
  useEffect(() => {
    const m = metaFor(location.pathname)
    document.title = m?.title ?? 'Page not found — ayush sinha'
    document.querySelector('meta[name="description"]')?.setAttribute('content', m?.description ?? '')
  }, [location.pathname])

  // Back/forward navigation (no transition): reset scroll position
  useLayoutEffect(() => {
    if (viaTransition.current) return
    window.scrollTo(0, 0)
    lenisRef.current?.scrollTo(0, { immediate: true, force: true })
    setMenuOpen(false)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [location.pathname])

  // ---- Page transition: panel covers from below, route swaps, panel lifts ----
  const go = useCallback(
    (to: string) => {
      if (busy.current) return
      const current = location.pathname
      if (to === current) {
        setMenuOpen(false)
        lenisRef.current?.scrollTo(0, { duration: 1.2 })
        return
      }
      const panel = panelRef.current
      const line = lineRef.current
      if (!panel || !line || prefersReducedMotion()) {
        navigate(to)
        return
      }
      busy.current = true
      viaTransition.current = true
      const chunk = preloadRoute(to).catch(() => undefined)
      document.body.classList.add('is-transitioning')
      lenisRef.current?.stop()
      if (labelRef.current) labelRef.current.textContent = labelFor(to)

      const tl = gsap.timeline({
        onComplete: () => {
          busy.current = false
          viaTransition.current = false
          document.body.classList.remove('is-transitioning')
          gsap.set(panel, { autoAlpha: 0 })
        },
      })
      tl.set(panel, { autoAlpha: 1, yPercent: 100 })
        .set(labelRef.current, { yPercent: 110 })
        .to(panel, { yPercent: 0, duration: 0.9, ease: 'premium' })
        .fromTo(line, { x: '-100%', opacity: 1 }, { x: '100%', duration: 0.9, ease: 'power3.inOut' }, 0)
        .to(labelRef.current, { yPercent: 0, duration: 0.6, ease: 'expo' }, 0.45)
        .add(() => {
          // hold under the cover until the destination's code has loaded
          tl.pause()
          chunk.then(() => {
            navigate(to)
            setMenuOpen(false)
            tl.resume()
          })
        })
        .add(() => {
          window.scrollTo(0, 0)
          lenisRef.current?.scrollTo(0, { immediate: true, force: true })
          lenisRef.current?.start()
          ScrollTrigger.refresh()
        }, '+=0.12')
        .to(labelRef.current, { yPercent: -110, duration: 0.5, ease: 'premium' })
        .to(panel, { yPercent: -100, duration: 0.975, ease: 'premium' }, '<0.1')
    },
    [location.pathname, navigate],
  )

  const value = useMemo<SiteCtx>(
    () => ({ ready, setReady, menuOpen, setMenuOpen, go, lenis: () => lenisRef.current }),
    [ready, menuOpen, go],
  )

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="page-transition" aria-hidden="true">
        <div className="page-transition__panel" ref={panelRef}>
          <p className="page-transition__label-mask">
            <span className="page-transition__label" ref={labelRef} />
          </p>
          <div className="page-transition__line" ref={lineRef} />
        </div>
      </div>
    </Ctx.Provider>
  )
}

// Internal link that plays the page transition
export function TLink({
  to, children, className, onClick, ...rest
}: {
  to: string
  children: ReactNode
  className?: string
  onClick?: () => void
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>) {
  const { go } = useSite()
  const href = useHref(to)
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    onClick?.()
    go(to)
  }
  return (
    <a href={href} className={className} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
