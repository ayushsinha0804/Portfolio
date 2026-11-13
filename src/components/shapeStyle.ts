import type { CSSProperties } from 'react'
import type { Project } from '../data/content'

// CSS custom properties for a project's colours + silhouette
export const projectVars = (p: Project): CSSProperties =>
  ({
    '--card-bg': p.bg,
    '--card-fg': p.fg,
    '--shape-radius': p.shape.radius,
    '--shape-aspect': p.shape.aspect,
    '--shape-scale': p.shape.scale,
    '--shape-pad': p.shape.pad,
    '--shape-tilt': `${p.shape.tilt}deg`,
  }) as CSSProperties
