export enum URLs {
  AUTH = 'https://localhost:5000/Auth',
  EMPLOYEE = 'https://localhost:5001/',
  TASK = 'https://localhost:5002/',
}

export enum TagTypes {
  TASK = 'Task',
  EMPLOYEE = 'Employee',
}

export enum TagIds {
  LIST = 'LIST',
}

export enum FetchStatus {
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  IDLE = 'idle',
}

export enum ReducerNames {
  Auth = 'auth',
  AuthApi = 'authApi',
  EmployeeApi = 'employeeApi',
  Router = 'router',
  ToDoApi = 'toDoApi',
}
