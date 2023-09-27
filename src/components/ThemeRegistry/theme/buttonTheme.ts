import { createTheme } from '@mui/material/styles'
import colors from './colors.json'

declare module '@mui/material/Button' {
  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsVariantOverrides {
    iconButton: true
  }
}

export default createTheme({
  palette: {
    common: {
      black: colors.black,
      white: colors.white,
    },
    text: {
      primary: colors.black,
      secondary: colors.black,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: '0.3125rem',
          transition:
            'color 0.3s ease-in-out, background-color 0.3s ease-in-out',
          padding: '0.75rem 1.875rem',
          color: colors.black,
          fontWeight: 700,
          '&:disabled': {
            opacity: 0.3,
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: colors['green-primary'],
            '&:hover': {
              backgroundColor: colors['green-darker'],
            },
            '&:disabled': {
              backgroundColor: colors['green-primary'],
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: colors.white,
            border: `2px solid ${colors['green-primary']}`,
            '&:hover': {
              border: `2px solid ${colors['green-darker']}`,
              backgroundColor: colors.white,
            },
            '&:disabled': {
              backgroundColor: colors.white,
              border: `2px solid ${colors['green-primary']}`,
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            backgroundColor: colors.white,
            textDecoration: 'underline',
            color: colors.black,
            '&:hover': {
              color: colors['green-darker'],
              backgroundColor: colors.white,
              textDecoration: 'underline',
            },
            '&:disabled': {
              backgroundColor: colors.white,
              color: colors.black,
            },
          },
        },
        {
          props: { variant: 'iconButton' },
          style: {
            padding: '1.25rem',
            borderRadius: 999,
            backgroundColor: colors['green-primary'],
            '&:hover': {
              backgroundColor: colors['green-darker'],
            },
            '&:disabled': {
              backgroundColor: colors['green-primary'],
            },
            '& .MuiButton-endIcon': {
              marginLeft: '3.125rem',
              marginRight: 0,
            },
          },
        },
      ],
    },
  },
})
