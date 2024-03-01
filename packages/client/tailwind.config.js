/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require("tailwindcss/colors");

const Breakpoints = {
  DESKTOP: "1920px",
  MOBILE: "429px",
  TABLET: "1150px",
};

export default {
  content: [],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
  theme: {
    extend: {
      ringWidth: {
        '1.5': '1.5px',
      },
      minWidth: {
        "1": "1rem",
      },
      colors: {
        ...colors,
        purple: {
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
        },
        caution: colors.amber,
        critical: colors.rose,
        info: colors.sky,
        neutral: colors.blue,
        positive: colors.emerald,
        promote: colors.violet,
        transparent: "transparent",
      },
      fontFamily: {
        sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        serif: ['Merriweather', 'serif'],
      },
      margin: {
        "15": "3.75rem",
      },
      padding: {
        "15": "3.75rem",
        "O.1": "1px",
      },
      scale: {
        "60": ".6",
      },
      screens: {
        desktop: Breakpoints.DESKTOP,
        mobile: Breakpoints.MOBILE,
        tablet: Breakpoints.TABLET,
      },
      zIndex: {
        "1": "1",
        "100": "100",
        "2": "2",
        "200": "200",
        "290": "290",
        "300": "300",
        "400": "400",
        "90": "90",
      },
    },
  },
}

