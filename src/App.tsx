import React from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './index.css'

import AppProvider from './context'
import AddSubtask from './pages/AddSubtask'
import AddToDo from './pages/AddToDo'
import AssignEmployee from './pages/AssignEmployee'
import DeleteToDo from './pages/DeleteToDo'
import DetailEmployee from './pages/DetailEmployee'
import DetailTodo from './pages/DetailTodo'
import EditSubtask from './pages/EditSubtask'
import EditTodo from './pages/EditTodo'
import Employees from './pages/Employees'
import Home from './pages/Home'
import Login from './pages/Login'
import Main from './pages/Main'
import Register from './pages/Register'
import Todos from './pages/Todos'
import Wrapper from './pages/Wrapper'
import { store } from './store'

const App: React.FC = () => {
  return (
    <AppProvider>
      <ReduxStoreProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<Wrapper />}>
              <Route path="/" Component={Home} />
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
              <Route path="/main" Component={Main} />
              <Route path="/todos" Component={Todos} />
              <Route path="/detail/:todoId" Component={DetailTodo} />
              <Route path="/add" Component={AddToDo} />
              <Route path="/edit/:todoId" Component={EditTodo} />
              <Route path="/delete/:todoId" Component={DeleteToDo} />
              <Route path="/subtask/:subTaskId" Component={EditSubtask} />
              <Route path="/subtask/add/:todoId" Component={AddSubtask} />
              <Route
                path="/assignEmployee/:todoId"
                Component={AssignEmployee}
              />
              <Route path="/employees" Component={Employees} />
              <Route
                path="/detail/employee/:employeeId"
                Component={DetailEmployee}
              />
            </Route>
            <Route path={'*'} element={<p>Page not found</p>} />
          </Routes>
        </BrowserRouter>
      </ReduxStoreProvider>
    </AppProvider>
  )
}

export default App
