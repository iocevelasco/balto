import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface UserData {
  isAuth: boolean
  name?: string | null
  email?: string | null
  photoURL?: string | null
  uid?: string | null
  token?: string | null
}

const initialState: UserData = {
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    userLoadData(state, action: PayloadAction<UserData>) { 
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        photoURL: action.payload.photoURL,
        uid: action.payload.uid,
        token: action.payload.token,
      }
    }
  },
})

export const { userAuth, userLoadData } = userSlice.actions

export const selectUser = (state: RootState) => state.user
export const selectIsAuth = (state: RootState) => state.user.isAuth

export const userSliceReducer = userSlice.reducer
