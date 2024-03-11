import { tailwind } from 'stitches-zigzag'
import { aliasPaletteTokens, paletteToTokens } from './helpers'

const slate = {
  '100': '#f1f5f9',
  '200': '#e2e8f0',
  '300': '#cbd5e1',
  '400': '#94a3b8',
  '500': '#64748b',
  '600': '#475569',
  '700': '#334155',
  '800': '#1e293b',
  '900': '#0f172a',
}

const purple = {
  '50': '#fff4fe',
  '100': '#fee9fc',
  '200': '#fcd2f9',
  '300': '#f9aef0',
  '400': '#f57de5',
  '500': '#ea53d6',
  '600': '#cd2cb5',
  '700': '#aa2192',
  '800': '#8b1d76',
  '900': '#721d61',
  '950': '#4b073c',
}

const colors = {
  ...tailwind.theme.colors,
  ...aliasPaletteTokens('amber', 'caution' as const),
  ...aliasPaletteTokens('rose', 'critical' as const),
  ...aliasPaletteTokens('sky', 'info' as const),
  ...aliasPaletteTokens('blueGray', 'neutral' as const),
  ...aliasPaletteTokens('emerald', 'positive' as const),
  ...aliasPaletteTokens('violet', 'promote' as const),
  // These palettes are Tailwind V3-only and we are still on V2
  ...paletteToTokens('slate' as const, slate),
  ...paletteToTokens('purple' as const, purple),
  transparent: 'transparent',
}

export { colors }
