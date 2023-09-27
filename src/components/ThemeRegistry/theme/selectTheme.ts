import { createTheme } from '@mui/material/styles'
import colors from './colors.json'

export default createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        // @ts-expect-error: root exist but is bad typed
        root: {
          '.MuiSelect-outlined': {
            padding: '0.8em 0.625em !important',
          },
          fieldset: {
            borderColor: colors['gray-mid'],
          },
          '&.Mui-error': {
            fieldset: {
              '&.MuiOutlinedInput-notchedOutline': {
                borderColor: colors.error,
              },
            },
          },
          '.MuiSelect-icon': {
            top: 'calc(50% - 0.25em)',
            right: '1em',
          },
        },
      },
    },
  },
})
