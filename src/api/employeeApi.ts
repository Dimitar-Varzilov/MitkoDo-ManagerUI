import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import type { IEmployee } from '../interfaces'
import { getToken } from '../utilities'

import { ReducerNames, TagIds, TagTypes, URLs } from './types'

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: URLs.EMPLOYEE,
  prepareHeaders: (headers) => {
    const token = getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const employeeApi = createApi({
  baseQuery: baseQueryWithRetry,

  endpoints: (builder) => ({
    getEmployees: builder.query<IEmployee[], void>({
      providesTags: [{ id: TagIds.LIST, type: TagTypes.EMPLOYEE }],
      query: () => '/Employee',
    }),
  }),
  reducerPath: ReducerNames.EmployeeApi,
  tagTypes: [TagTypes.EMPLOYEE],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEmployeesQuery } = employeeApi
