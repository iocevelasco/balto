import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { TransactionFilterType } from 'ui/components/TransactionsFilters'
import type { RootState } from '../store'

export const initialState: TransactionFilterType = {
  fromDate: '',
  untilDate: '',
  category: '',
  accounts: [],
  amount: '',
  timeFrame: '',
  customAmount: '',
  minAmountRange: '',
  maxAmountRange: '',
}
const TransactionsFilterSlice = createSlice({
  name: 'transactionsFilters',
  initialState,
  reducers: {
    setSelectedFilters(state, action: PayloadAction<typeof initialState>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    setEmptyValues() {
      return initialState
    },
  },
})
export const { setSelectedFilters, setEmptyValues } = TransactionsFilterSlice.actions
export const selectTransactionsFilters = (state: RootState) => state.transactionsFilters
export const TransactionsFilterSliceReducer = TransactionsFilterSlice.reducer
