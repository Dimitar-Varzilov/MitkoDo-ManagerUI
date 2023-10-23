import { createSlice } from '@reduxjs/toolkit'

import type { IUser } from '../../interfaces'
import { type RootState } from '../../store'
import { getToken, removeToken } from '../../utilities'
import { ReducerNames } from '../types'

interface AuthState {
  isLogged: boolean
  token: string | null
  user?: IUser
}

const initialState: AuthState = {
  isLogged: !!getToken(),
  token: getToken(),
  user: undefined,
}

export const authSlice = createSlice({
  name: ReducerNames.Auth,
  initialState: initialState,
  reducers: {
    loggedIn: (state) => {
      state.isLogged = true
    },
    logOut: (state) => {
      state.isLogged = false
      state.user = undefined
      state.token = null
      removeToken()
    },
    setUser: (state, action: { payload: IUser }) => {
      state.user = action.payload
    },
    tokenReceived: (state, action: { payload: string }) => {
      state.token = action.payload
    },
  },
})

export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token
export const selectIsLogged = (state: RootState) => state.auth.isLogged
export const { loggedIn, logOut, setUser, tokenReceived } = authSlice.actions
export default authSlice.reducer
