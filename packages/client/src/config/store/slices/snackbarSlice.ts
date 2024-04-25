import type { AlertColor } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface SnackbarData {
  isOpen: boolean
  severity: AlertColor
  content: string
}

const initialState: SnackbarData = {
  isOpen: false,
  content: '',
  severity: 'info',
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action: PayloadAction<Pick<SnackbarData, 'content' | 'severity'>>) {
      state.content = action.payload.content
      state.severity = action.payload.severity
      state.isOpen = true
    },
    closeSnackbar(state) {
      state.isOpen = false
    },
  },
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions

export const selectSnackbarState = (state: RootState) => state.snackbar

export const snackbarSliceReducer = snackbarSlice.reducer
