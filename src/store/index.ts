import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createBrowserHistory } from 'history'
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux/es/exports'
import { combineReducers } from 'redux'
import { createReduxHistoryContext } from 'redux-first-history'

import { authApi } from '../api/auth/authApi'
import authSlice from '../api/auth/authSlice'
import { ReducerNames } from '../api/types'

// Setup redux-first-history
const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() })
export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development' ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, routerMiddleware]),
  reducer: combineReducers({
    [ReducerNames.Auth]: authSlice,
    [ReducerNames.AuthApi]: authApi.reducer,
    [ReducerNames.Router]: routerReducer,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

setupListeners(store.dispatch)
export const history = createReduxHistory(store)
