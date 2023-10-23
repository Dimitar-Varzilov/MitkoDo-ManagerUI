import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import type { IToDo } from '../interfaces'
import { getToken } from '../utilities'

import { ReducerNames, TagIds, TagTypes, URLs } from './types'

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: URLs.TASK,
  prepareHeaders: (headers) => {
    const token = getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const taskApi = createApi({
  baseQuery: baseQueryWithRetry,

  endpoints: (builder) => ({
    getToDos: builder.query<IToDo[], void>({
      providesTags: [{ id: TagIds.LIST, type: TagTypes.TASK }],
      query: () => '/Task',
    }),
  }),
  reducerPath: ReducerNames.TaskApi,
  tagTypes: [TagTypes.TASK],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetToDosQuery } = taskApi
