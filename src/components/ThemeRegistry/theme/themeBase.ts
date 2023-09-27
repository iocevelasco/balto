import { createTheme } from '@mui/material/styles'
import getRalewayFont from '@/utils/functions/getRalewayFont'
import colors from './colors.json'

// const ralewayFont = getRalewayFont
const ralewayFont = getRalewayFont.style.fontFamily

export default createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    text: {
      primary: colors.black,
      disabled: colors['gray-light'],
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: ralewayFont,
      },
    },
  },
  typography: {
    fontFamily: ralewayFont,
    h1: {
      fontFamily: ralewayFont,
    },
    h2: {
      fontFamily: ralewayFont,
    },
    h3: {
      fontFamily: ralewayFont,
    },
    h4: {
      fontFamily: ralewayFont,
    },
    h5: {
      fontFamily: ralewayFont,
    },
  },
})
