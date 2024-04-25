import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface NavBarData {
  isOpen: boolean
}

const initialState: NavBarData = {
  isOpen: false,
}

const navBarSlice = createSlice({
  name: 'navBar',
  initialState,
  reducers: {
    setOpenNavBar(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
  },
})

export const { setOpenNavBar } = navBarSlice.actions

export const selectOpenNavBar = (state: RootState) => state.navBar.isOpen

export const navBarSliceReducer = navBarSlice.reducer
