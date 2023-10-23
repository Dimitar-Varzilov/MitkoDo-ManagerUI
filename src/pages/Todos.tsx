/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { UUID } from 'crypto'

import { useNavigate } from 'react-router-dom'

import { useGetToDosQuery } from '../api/taskApi'

const Todos = () => {
  const { data = [] } = useGetToDosQuery()
  const navigate = useNavigate()

  const gotToDetail = (todoId: UUID) => {
    navigate(`/detail/${todoId}`)
  }

  const goToEditToDo = (todoId: UUID) => {
    navigate(`/edit/${todoId}`)
  }

  const goToDeleteToDo = (todoId: UUID) => {
    navigate(`/delete/${todoId}`)
  }

  const goToAddToDo = () => {
    navigate(`/add`)
  }
  return (
    <div>
      <h1>MitkoDo</h1>
      <div>
        {data.map((toDo) => (
          <div key={toDo.todoId}>
            <div style={{ height: 50 }}>
              <h2 onClick={() => gotToDetail(toDo.todoId)}>{toDo.title}</h2>
            </div>
            <button onClick={() => goToEditToDo(toDo.todoId)}>Edit Task</button>
            <button onClick={() => goToDeleteToDo(toDo.todoId)}>
              Delete Task
            </button>
            <hr />
          </div>
        ))}
        <button onClick={goToAddToDo}>Add todo</button>
      </div>
    </div>
  )
}

export default Todos
