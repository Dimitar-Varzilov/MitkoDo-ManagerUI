import { type UUID } from 'crypto'

import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import type {
  IAddSubtaskDto,
  IDeleteSubtaskDto,
  IEditSubtaskDto,
  IEditToDoDto,
  IAddToDoDto,
  ISubtask,
  IToDo,
  IHandleToDoEmployeesDto,
} from '../interfaces'
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
    addSubTask: builder.mutation<ISubtask, IAddSubtaskDto>({
      invalidatesTags: (result, error, args) => [
        { id: args.todoId, type: TagTypes.TODO },
      ],
      query: ({ todoId, ...rest }) => ({
        body: rest,
        method: 'POST',
        url: `/Task/subtask/add/${todoId}`,
      }),
    }),
    addToDo: builder.mutation<IToDo, IAddToDoDto>({
      invalidatesTags: [{ id: TagIds.LIST, type: TagTypes.TODO }],
      query: (newToDo) => ({
        body: newToDo,
        method: 'POST',
        url: '/Task',
      }),
    }),
    assignEmployees: builder.mutation<HttpStatusCode, IHandleToDoEmployeesDto>({
      invalidatesTags: (result, error, dto) => [
        { id: dto.todoId, type: TagTypes.TODO },
      ],
      query: (dto) => ({
        body: dto.employeeIds,
        method: 'POST',
        url: `/Task/assignEmployee/${dto.todoId}`,
      }),
    }),
    deleteSubTask: builder.mutation<HttpStatusCode, IDeleteSubtaskDto>({
      invalidatesTags: (result, error, dto) => [
        { id: dto.todoId, type: TagTypes.TODO },
      ],
      query: (dto) => ({
        method: 'DELETE',
        url: `/Task/subtask/delete/${dto.subTaskId}`,
      }),
    }),
    deleteToDo: builder.mutation<HttpStatusCode, UUID>({
      invalidatesTags: (result, error, toDoId) => [
        { id: toDoId, type: TagTypes.TODO },
      ],
      query: (toDoId) => ({
        method: 'DELETE',
        url: `/Task/${toDoId}`,
      }),
    }),
    editSubTask: builder.mutation<ISubtask, IEditSubtaskDto>({
      invalidatesTags: (result, error, args) => [
        { id: args.todoId, type: TagTypes.TODO },
      ],
      query: ({ subTaskId, ...rest }) => ({
        body: rest,
        method: 'PUT',
        url: `/Task/subtask/edit/${subTaskId}`,
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
    }),
    removeEmployees: builder.mutation<HttpStatusCode, IHandleToDoEmployeesDto>({
      invalidatesTags: (result, error, dto) => [
        { id: dto.todoId, type: TagTypes.TODO },
      ],
      query: (dto) => ({
        body: dto,
        method: 'POST',
        url: `/Task/removeEmployee/${dto.todoId}`,
      }),
    }),
  }),
  reducerPath: ReducerNames.ToDoApi,
  tagTypes: [TagTypes.TODO],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddSubTaskMutation,
  useAddToDoMutation,
  useAssignEmployeesMutation,
  useDeleteSubTaskMutation,
  useDeleteToDoMutation,
  useEditSubTaskMutation,
  useEditToDoMutation,
  useGetToDoByIdQuery,
  useGetToDosQuery,
  useRemoveEmployeesMutation,
} = toDoApi
