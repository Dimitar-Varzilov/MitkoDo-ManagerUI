import { type UUID } from 'crypto'

interface IBaseUser {
  name: string
  email: string
  password: string
  userId: UUID
}

export interface RegisterDto
  extends Pick<IBaseUser, 'name' | 'email' | 'password'> {
  confirmPassword: string
}

export interface LoginDto extends Pick<IBaseUser, 'email' | 'password'> {}

export interface IChangePasswordDto extends Pick<IBaseUser, 'email'> {
  confirmPassword: string
  newPassword: string
  oldPassword: string
}

export interface IUser extends Pick<IBaseUser, 'userId' | 'email'> {}

export interface IEmployee extends Pick<IBaseUser, 'name'> {
  employeeId: UUID
  employeeToDos: Pick<IToDo, 'title' | 'todoId'>[]
  isAvailable: boolean
}

export interface IEmployeesIds {
  employeeIds: UUID[]
}

export interface IBaseToDo {
  title: string
  description: string
  dueDate: string
  startDate: string
}

enum ToDoStatusEnum {
  Upcoming,
  Running,
  Completed,
  Uncompleted,
}

export interface IToDo extends IBaseToDo {
  employees: IEmployee[]
  isComplete: boolean
  status: ToDoStatusEnum
  subTasks: ISubtask[]
  todoId: UUID
}
export interface IAddToDoDto extends IBaseToDo, IEmployeesIds {}

export interface IEditToDoDto extends IBaseToDo, Pick<IToDo, 'todoId'> {}

export interface IHandleToDoEmployeesDto
  extends IEmployeesIds,
    Pick<IToDo, 'todoId'> {}

export interface IBaseSubtask {
  title: string
  description: string
  notesCountToBeCompleted: number
  picturesCountToBeCompleted: number
}

export interface ISubtask extends IBaseSubtask {
  isComplete: boolean
  subTaskId: UUID
}

export interface IAddSubtaskDto extends IBaseSubtask, Pick<IToDo, 'todoId'> {}

export interface IEditSubtaskDto
  extends IBaseSubtask,
    Pick<IToDo, 'todoId'>,
    Pick<ISubtask, 'subTaskId'> {}

export interface IDeleteSubtaskDto
  extends Pick<IToDo, 'todoId'>,
    Pick<ISubtask, 'subTaskId'> {}
