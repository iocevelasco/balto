/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import tailwindCssVariables from '@mertasan/tailwindcss-variables'
//
import { APP_ROOT_ID } from './src/utils/constants'
import generateWithCssVariables from './src/utils/generateWithCssVariables'
import colors from './src/components/ThemeRegistry/theme/colors.json'
import fontSizes from './src/components/ThemeRegistry/theme/fontSizes.json'
import letterSpacing from './src/components/ThemeRegistry/theme/letterSpacing.json'
import lineHeight from './src/components/ThemeRegistry/theme/lineHeight.json'
import shadows from './src/components/ThemeRegistry/theme/shadows.json'

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: `#${APP_ROOT_ID}`,
  theme: {
    important: `#${APP_ROOT_ID}`,
    variables: {
      /**
       * We load the the default values and parameters of CSS to generate the css variables
       * That way we can reuse them in MUI theme
       */
      DEFAULT: {
        ...colors,
        ...fontSizes,
        ...letterSpacing,
        ...lineHeight,
        'navbar-height': '4.75rem',
        'footer-height': '5rem',
      },
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-raleway)'],
        body: ['var(--font-raleway)'],
      },
      fontSize: {
        ...generateWithCssVariables(fontSizes),
      },
      lineHeight: {
        ...generateWithCssVariables(lineHeight),
      },
      letterSpacing: {
        ...generateWithCssVariables(letterSpacing),
      },
      height: {
        navbar: 'var(--navbar-height)',
        footer: 'var(--footer-height)',
      },
      padding: {
        navbar: 'var(--navbar-height)',
        footer: 'var(--footer-height)',
      },
      boxShadow: {
        sm: shadows['sm'],
        shadow: shadows['default'],
        md: shadows['md'],
        lg: shadows['lg'],
        xl: shadows['xl'],
        '2xl': shadows['2xl'],
        '3xl': shadows['3xl'],
        '4xl': shadows['4xl'],
      },
      colors: {
        ...generateWithCssVariables(colors),
      },
      backgroundImage: {
        'overlay-gradient-dark':
          'linear-gradient(180deg, #D9D9D900 0%, #090a0ac7 60%)',
      },
    },
  },
  plugins: [tailwindCssVariables],
}

export default tailwindConfig
