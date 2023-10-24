import { type UUID } from 'crypto'

export interface RegisterDto {
  name: string
  confirmPassword: string
  email: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface IChangePasswordDto {
  confirmPassword: string
  email: string
  newPassword: string
  oldPassword: string
}

export interface IUser {
  email: string
  userId: UUID
}

interface IVeryBaseToDo {
  title: string
  todoId: UUID
}

export interface IEmployee {
  name: string
  employeeId: UUID
  employeeToDos: IVeryBaseToDo[]
  isAvailable: boolean
}

export interface IEmployeesIds {
  employeeIds: UUID[]
}

export interface INewToDo extends IBaseToDo, IEmployeesIds {}

export interface IBaseToDo {
  title: string
  description: string
  dueDate: Date
  startDate: Date
}

export interface IToDo extends IBaseToDo {
  employees: IEmployee[]
  isComplete: boolean
  status: ToDoStatusEnum
  subTasks: ISubtask[]
  todoId: UUID
}

export interface IEditToDoDto extends IBaseToDo {
  todoId: UUID
}

enum ToDoStatusEnum {
  Upcoming,
  Running,
  Completed,
  Uncompleted,
}

export interface INewSubtask extends Pick<ISubtask, 'title' | 'description'> {
  notesCountToBeCompleted: number
  picturesCountToBeCompleted: number
}

export interface ISubtask {
  title: string
  description: string
  isComplete: boolean
  subTaskId: UUID
}
