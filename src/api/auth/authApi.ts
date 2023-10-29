import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

import type {
  IChangePasswordDto,
  IUser,
  LoginDto,
  RegisterDto,
} from '../../interfaces'
import type HttpStatusCode from '../../interfaces/HttpStatusCode'
import { getToken, setToken } from '../../utilities'
import { ReducerNames, URLs } from '../types'

import { loggedIn, tokenReceived } from './authSlice'

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: URLs.AUTH,
  prepareHeaders: (headers) => {
    const token = getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const authApi = createApi({
  baseQuery: baseQueryWithRetry,

  endpoints: (builder) => ({
    changePassword: builder.mutation<HttpStatusCode, IChangePasswordDto>({
      query: (dto) => ({
        body: dto,
        method: 'POST',
        url: '/changePassword',
      }),
    }),
    loginUser: builder.mutation<string, LoginDto>({
      queryFn: async (dto, api) => {
        try {
          const response = await axios.post<string>(`${URLs.AUTH}/login`, dto)
          if (response.status < 200 || response.status >= 300) {
            return {
              error: response.statusText,
            }
          } else {
            const data = response.data
            setToken(data)
            api.dispatch(tokenReceived(data))
            api.dispatch(loggedIn())
            return { data }
          }
        } catch (error: any) {
          return { error: error.message }
        }
      },
    }),
    registerUser: builder.mutation<IUser, RegisterDto>({
      query: (dto) => ({
        body: dto,
        method: 'POST',
        url: '/register/manager',
      }),
    }),
  }),
  reducerPath: ReducerNames.AuthApi,
  tagTypes: [],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation, useRegisterUserMutation } = authApi
