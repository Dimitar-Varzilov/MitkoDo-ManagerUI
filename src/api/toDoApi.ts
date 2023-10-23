import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import type { INewToDo, IToDo } from '../interfaces'
import type HttpStatusCode from '../interfaces/HttpStatusCode'
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

export const toDoApi = createApi({
  baseQuery: baseQueryWithRetry,

  endpoints: (builder) => ({
    addToDo: builder.mutation<HttpStatusCode, INewToDo>({
      invalidatesTags: [{ id: TagIds.LIST, type: TagTypes.TASK }],
      query: (newToDo) => ({
        body: newToDo,
        method: 'POST',
        url: '/Task',
      }),
    }),
    getToDos: builder.query<IToDo[], void>({
      providesTags: [{ id: TagIds.LIST, type: TagTypes.TASK }],
      query: () => '/Task',
    }),
  }),
  reducerPath: ReducerNames.ToDoApi,
  tagTypes: [TagTypes.TASK],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddToDoMutation, useGetToDosQuery } = toDoApi
