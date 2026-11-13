import { lazy, type ComponentType } from 'react'

// Inner pages are split into their own chunks. The page transition preloads
// the destination's chunk while the cover panel is sliding in.
type Loader = () => Promise<{ default: ComponentType }>

const loaders = {
  work: () => import('./pages/Work'),
  project: () => import('./pages/Project'),
  experience: () => import('./pages/Experience'),
  about: () => import('./pages/About'),
  contact: () => import('./pages/Contact'),
} satisfies Record<string, Loader>

export const Work = lazy(loaders.work)
export const Project = lazy(loaders.project)
export const Experience = lazy(loaders.experience)
export const About = lazy(loaders.about)
export const Contact = lazy(loaders.contact)

export function preloadRoute(path: string): Promise<unknown> {
  const p = path.replace(/\/+$/, '')
  if (p.startsWith('/work/')) return loaders.project()
  const key = p.slice(1) as keyof typeof loaders
  return key in loaders ? loaders[key]() : Promise.resolve()
}
