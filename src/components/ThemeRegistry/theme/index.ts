import { createTheme } from '@mui/material'
import themeBase from './themeBase'
import buttonTheme from './buttonTheme'
import selectTheme from './selectTheme'
import paginationTheme from './paginationTheme'

const theme = createTheme(buttonTheme, paginationTheme, selectTheme, themeBase)

export default theme
