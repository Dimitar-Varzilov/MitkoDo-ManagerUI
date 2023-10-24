import { type UUID } from 'crypto'

import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import type { IEditToDoDto, INewToDo, IToDo } from '../interfaces'
import type HttpStatusCode from '../interfaces/HttpStatusCode'
import { convertToDosDates, getToken } from '../utilities'

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
      invalidatesTags: [{ id: TagIds.LIST, type: TagTypes.TODO }],
      query: (newToDo) => ({
        body: newToDo,
        method: 'POST',
        url: '/Task',
      }),
    }),
    editToDo: builder.mutation<HttpStatusCode, IEditToDoDto>({
      invalidatesTags: (result, error, dto) => [
        { id: dto.todoId, type: TagTypes.TODO },
      ],
      query: (dto) => ({
        body: dto,
        method: 'PUT',
        url: `/Task/${dto.todoId}`,
      }),
    }),
    getToDoById: builder.query<IToDo, UUID>({
      providesTags: (result, error, id) => [{ id, type: TagTypes.TODO }],
      query: (todoId) => `/Task/${todoId}`,
      transformResponse: (baseQueryReturnValue: IToDo) =>
        convertToDosDates([baseQueryReturnValue])[0],
    }),
    getToDos: builder.query<IToDo[], void>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ todoId }) => ({ id: todoId, type: TagTypes.TODO }) as const,
              ),
              { id: TagIds.LIST, type: TagTypes.TODO },
            ]
          : [{ id: TagIds.LIST, type: TagTypes.TODO }],
      query: () => '/Task',
      transformResponse: (baseQueryReturnValue: IToDo[]) =>
        convertToDosDates(baseQueryReturnValue),
    }),
  }),
  reducerPath: ReducerNames.ToDoApi,
  tagTypes: [TagTypes.TODO],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddToDoMutation,
  useEditToDoMutation,
  useGetToDoByIdQuery,
  useGetToDosQuery,
} = toDoApi
