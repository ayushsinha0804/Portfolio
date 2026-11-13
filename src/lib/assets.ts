import { person } from '../data/content'

/** URL for a file in /public, respecting Vite's base path */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
export const resumeHref = asset(person.resume)
