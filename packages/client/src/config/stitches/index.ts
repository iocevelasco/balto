import type * as Stitches from '@stitches/react'
import { createStitches } from '@stitches/react'
import { Breakpoints } from 'src/utils/constants/tokens'
import { tailwind } from 'stitches-zigzag'
import { colors } from './colors'

const config = createStitches({
  // ...tailwind,
  media: {
    desktop: `(min-width: ${Breakpoints.DESKTOP})`,
    tablet: `(min-width: ${Breakpoints.TABLET})`,
  },
  theme: {
    ...tailwind.theme,
    colors,
    screens: {
      lg: '1024px',
      md: '768px',
      sm: '580px',
    },
    sizes: {
      ...tailwind.theme.sizes,
      appbar: '50px',
      buttonHeight: '42px',
      drawerHeader: '160px',
      footer: '42px',
    },
    /* eslint-disable sort-keys-fix/sort-keys-fix */
    space: {
      '-15': '-60px',
      '-12': '-48px',
      '-8': '-32px',
      '-6': '-24px',
      '-5': '-20px',
      '-3': '-12px',
      '-2': '-8px',
      '-1': '-4px',
      px: '1px',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '20px',
      '6': '24px',
      '7': '28px',
      '8': '32px',
      '9': '36px',
      '10': '40px',
      '11': '44px',
      '12': '48px',
      '14': '56px',
      '15': '60px',
      '16': '64px',
      '19': '76px',
      '20': '80px',
      '24': '96px',
      '28': '112px',
      '32': '128px',
      '36': '144px',
      '40': '160px',
      '-xxlarge': '$space$-15',
      '-xlarge': '$space$-12',
      '-large': '$space$-8',
      '-gutter': '$space$-6',
      '-medium': '$space$-5',
      '-small': '$space$-3',
      '-xsmall': '$space$-2',
      '-xxsmall': '$space$-1',
      xxsmall: '$space$1',
      xsmall: '$space$2',
      small: '$space$3',
      medium: '$space$5',
      gutter: '$space$6',
      large: '$space$8',
      xlarge: '$space$12',
      xxlarge: '$space$15',
    },
  },
})

const { css, globalCss: global, keyframes, styled, theme } = config

type CSS = Stitches.CSS<typeof config>

export type { CSS }
export { css, global, keyframes, styled, theme }
