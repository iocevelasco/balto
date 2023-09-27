import { createTheme } from '@mui/material/styles'
import colors from './colors.json'

export default createTheme({
  components: {
    MuiPagination: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          button: {
            border: 'none',
            fontWeight: 500,
          },
          '.MuiPaginationItem-root.Mui-selected': {
            background: colors['green-darker'],
            fontWeight: 700,
            color: colors.white,
            borderRadius: '5px',
            '&:hover': {
              background: colors['green-primary'],
              color: colors.black,
            },
          },
          svg: {
            stroke: colors.black,
            strokeWidth: '1px',
          },
        },
      },
    },
  },
})
