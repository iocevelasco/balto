import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface AccountDetailsState {
  showTransactionsDetails: boolean
}

const initialState: AccountDetailsState = {
  showTransactionsDetails: false,
}

const accountDetailsSlice = createSlice({
  name: 'accountDetails',
  initialState,
  reducers: {
    setShowDetails(state, action: PayloadAction<boolean>) {
      state.showTransactionsDetails = action.payload
    },
  },
})

export const { setShowDetails } = accountDetailsSlice.actions

export const selectShowTransactionsDetails = (state: RootState) =>
  state.accountDetails.showTransactionsDetails

export const accountDetailsSliceReducer = accountDetailsSlice.reducer
