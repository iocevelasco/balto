const BREAKPOINTS = {
  desktop: 1150,
  tablet: 500,
} as const

const enum Breakpoints {
  TABLET = '500',
  DESKTOP = '1150px',
}

type BreakpointNames = 'desktop' | 'mobile' | 'tablet'
const breakpoints: BreakpointNames[] = ['mobile', 'tablet', 'desktop']

const enum Tones {
  caution = 'caution',
  critical = 'critical',
  info = 'info',
  neutral = 'neutral',
  positive = 'positive',
  promote = 'promote',
}

export type { BreakpointNames }
export { BREAKPOINTS, Breakpoints, breakpoints, Tones }
