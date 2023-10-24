import { type UUID } from 'crypto'

import React, { createContext, useState } from 'react'

import type {
  IEmployee,
  IEmployeesIds,
  IBaseSubtask,
  INewToDo,
  IToDo,
  LoginDto,
  RegisterDto,
} from '../interfaces'
import {
  convertToDosDates,
  getToken,
  removeToken,
  setToken,
} from '../utilities'

interface AppContextType {
  addSubtask: (toDoId: UUID, newSubTask: IBaseSubtask) => Promise<void>
  addToDo: (newToDo: INewToDo) => Promise<void>
  assignEmployee: (toDoId: UUID, employeeId: UUID[]) => Promise<void>
  data: IToDo[]
  deleteSubtask: (subTaskId: UUID) => Promise<void>
  deleteToDo: (toDoId: UUID) => Promise<void>
  editSubtask: (subTaskId: UUID, editedSubTask: IBaseSubtask) => Promise<void>
  editToDo: (toDoId: UUID, editedSubTask: IToDo) => Promise<void>
  employeeList: IEmployee[]
  error?: Error
  fetchAllEmployees: () => Promise<void>
  fetchAllToDos: () => Promise<void>
  fetchToDoById: (toDoId: UUID) => Promise<void>
  isLoading: boolean
  isLoggedIn: boolean
  loginUser: (userData: LoginDto) => Promise<void>
  logOut: () => void
  registerUser: (userData: RegisterDto) => Promise<void>
  removeEmployeeFromToDo: (
    toDoId: UUID,
    employeeIds: IEmployeesIds,
  ) => Promise<void>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  token: string
  uploadImages: (formData: FormData, subTaskId: UUID) => Promise<void>
}

export const defaultState: AppContextType = {
  addSubtask: async () => {},
  addToDo: async () => {},
  assignEmployee: async () => {},
  data: [],
  deleteSubtask: async () => {},
  deleteToDo: async () => {},
  editSubtask: async () => {},
  editToDo: async () => {},
  employeeList: [],
  error: undefined,
  fetchAllEmployees: async () => {},
  fetchAllToDos: async () => {},
  fetchToDoById: async () => {},
  isLoading: false,
  isLoggedIn: getToken() !== null,
  loginUser: async () => {},
  logOut: () => {},
  registerUser: async () => {},
  removeEmployeeFromToDo: async () => {},
  setIsLoading: () => {},
  setIsLoggedIn: () => {},
  token: getToken() ?? '',
  uploadImages: async () => {},
}

export const AppContext = createContext<AppContextType>(defaultState)

interface AppProviderProps {
  children: React.ReactNode
}

enum URLs {
  AUTH = 'https://localhost:5000/Auth',
  EMPLOYEE = 'https://localhost:5001/Employee',
  TASK = 'https://localhost:5002/Task',
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState(defaultState)

  const setIsLoadingTrue = () =>
    setState((prev) => ({ ...prev, isLoading: true }))
  const setIsLoadingFalse = () =>
    setState((prev) => ({ ...prev, isLoading: false }))

  const tokenHeader = `Bearer ${state.token}`

  const addToDo: typeof defaultState.addToDo = async (newToDo) => {
    setIsLoadingTrue()
    try {
      const response = await fetch(`${URLs.TASK}`, {
        body: JSON.stringify(newToDo),
        headers: {
          authorization: tokenHeader,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const data = await response.json()
      document.cookie = `token=${data}`
      setState((prev) => ({ ...prev }))
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error, isLoggedIn: false }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const addSubtask = async (toDoId: UUID, newSubTask: IBaseSubtask) => {
    setIsLoadingTrue()
    try {
      const response = await fetch(`${URLs.TASK}/subtask/add/${toDoId}`, {
        body: JSON.stringify(newSubTask),
        headers: {
          authorization: tokenHeader,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const data = await response.json()
      document.cookie = `token=${data}`
      setState((prev) => ({ ...prev }))
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error, isLoggedIn: false }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const assignEmployee = async (toDoId: UUID, employeeId: UUID[]) => {
    setIsLoadingTrue()
    try {
      const response = await fetch(`${URLs.TASK}/assignEmployee/${toDoId}`, {
        body: JSON.stringify(employeeId),
        headers: {
          authorization: tokenHeader,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      console.log(response.status)
      setState((prev) => ({ ...prev }))
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const deleteSubtask: typeof defaultState.deleteSubtask = async (
    subTaskId,
  ) => {
    setIsLoadingTrue()
    try {
      await fetch(`${URLs.TASK}/subtask/delete/${subTaskId}`, {
        headers: {
          authorization: tokenHeader,
        },
        method: 'DELETE',
      })
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const deleteToDo = async (toDoId: UUID) => {
    setIsLoadingTrue()
    try {
      await fetch(`${URLs.TASK}/${toDoId}`, {
        headers: {
          authorization: tokenHeader,
        },
        method: 'DELETE',
      })
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const editSubtask = async (subTaskId: UUID, editedSubTask: IBaseSubtask) => {
    setIsLoadingTrue()
    try {
      const response = await fetch(`${URLs.TASK}/subtask/edit/${subTaskId}`, {
        body: JSON.stringify(editedSubTask),
        headers: {
          authorization: tokenHeader,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      })
      const data = await response.text()
      document.cookie = `token=${data}`
      setState((prev) => ({ ...prev }))
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const editToDo = async (toDoId: UUID, editedToDo: IToDo) => {
    setIsLoadingTrue()
    try {
      const response = await fetch(`${URLs.TASK}/${toDoId}`, {
        body: JSON.stringify(editedToDo),
        headers: {
          authorization: tokenHeader,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      })
      const data = await response.text()
      document.cookie = `token=${data}`
      setState((prev) => ({ ...prev }))
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const fetchAllEmployees = async () => {
    setIsLoadingTrue()
    try {
      const response = await fetch(`${URLs.EMPLOYEE}`, {
        headers: {
          authorization: tokenHeader,
        },
      })
      const data: IEmployee[] = await response.json()
      setState((prev) => ({ ...prev, employeeList: data }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingFalse()
    }
  }

  const fetchAllToDos = async () => {
    try {
      setIsLoadingTrue()
      const response = await fetch(URLs.TASK, {
        headers: {
          authorization: tokenHeader,
        },
      })
      const data: IToDo[] = await response.json()
      setState((prev) => ({ ...prev, data: convertToDosDates(data) }))
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const fetchToDoById = async (toDoId: UUID) => {
    setIsLoadingTrue()
    try {
      const response = await fetch(`${URLs.TASK}/${toDoId}`, {
        headers: {
          authorization: tokenHeader,
        },
      })
      const data: IToDo = await response.json()
      setState((prev) => ({ ...prev, data: [data] }))
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const loginUser = async ({ email, password }: LoginDto) => {
    setIsLoadingTrue()
    try {
      const response = await fetch(`${URLs.AUTH}/login`, {
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const data = await response.text()
      setToken(data)
      setState((prev) => ({ ...prev, isLoggedIn: true, token: data }))
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error, isLoggedIn: false, token: '' }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const logOut = () => {
    removeToken()
    setState(defaultState)
  }

  const registerUser = async (userData: RegisterDto) => {
    setIsLoadingTrue()
    try {
      await fetch(`${URLs.AUTH}/register/manager`, {
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    } catch (error) {
      console.error(error)
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const uploadImages = async (formData: FormData, subTaskId: UUID) => {
    try {
      setIsLoadingTrue()

      await fetch(`${URLs.TASK}/subtask/addImage/${subTaskId}`, {
        body: formData,
        headers: {
          authorization: tokenHeader,
        },
        method: 'POST',
      })
    } catch (error) {
      setState((prev) => ({ ...prev, error }))
    } finally {
      setIsLoadingFalse()
    }
  }

  const removeEmployeeFromToDo: typeof defaultState.removeEmployeeFromToDo =
    async (toDoId, employeeId) => {
      setIsLoadingTrue()
      try {
        await fetch(`${URLs.TASK}/removeEmployee/${toDoId}`, {
          body: JSON.stringify(employeeId),
          headers: {
            authorization: tokenHeader,
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
      } catch (error) {
        console.error(error)
        setState((prev) => ({ ...prev, error }))
      } finally {
        setIsLoadingFalse()
      }
    }

  return (
    <AppContext.Provider
      value={{
        ...state,
        addSubtask,
        addToDo,
        assignEmployee,
        deleteSubtask,
        deleteToDo,
        editSubtask,
        editToDo,
        fetchAllEmployees,
        fetchAllToDos,
        fetchToDoById,
        loginUser,
        logOut,
        registerUser,
        removeEmployeeFromToDo,
        uploadImages,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
export const useAppContext = () => React.useContext(AppContext)
