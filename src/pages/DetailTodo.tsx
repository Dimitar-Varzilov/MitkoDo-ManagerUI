import type { UUID } from 'crypto'

import { useNavigate, useParams } from 'react-router-dom'

import { useGetToDoByIdQuery, useRemoveEmployeesMutation } from '../api/toDoApi'
import { getLocaleDateString } from '../utilities'

const DetailTodo = () => {
  const { todoId } = useParams()
  const { data: todo } = useGetToDoByIdQuery(todoId as UUID)
  const navigate = useNavigate()
  const [removeEmployeeFromToDo] = useRemoveEmployeesMutation()

  const handleRemoveClick = (employeeId: UUID) => {
    if (!todo) return
    removeEmployeeFromToDo({ employeeIds: [employeeId], todoId: todo.todoId })
  }

  const goToEditToDo = () => {
    navigate(`/edit/${todo?.todoId}`)
  }

  const goToDeleteToDo = () => {
    navigate(`/delete/${todo?.todoId}`)
  }

  const goToAssignEmployee = () => {
    navigate(`/assignEmployee/${todo?.todoId}`)
  }
  if (!todo) return <p>Todo not found</p>
  return (
    <div>
      <h2>{todo?.title}</h2>
      <h2>
        <span>{getLocaleDateString(todo.startDate)}</span>
        <span> - </span>
        <span>{getLocaleDateString(todo.dueDate)}</span>
      </h2>{' '}
      <p>Assigned employees</p>
      <div
        style={{
          border: '1px solid green',
          borderRadius: 10,
          padding: '1rem',
          width: 'max-Content',
        }}
      >
        {todo?.employees.map((employee) => (
          <div key={employee.employeeId}>
            <div>{employee.name}</div>
            <button onClick={() => handleRemoveClick(employee.employeeId)}>
              remove from task
            </button>
          </div>
        ))}
      </div>
      <button onClick={goToAssignEmployee}>Assign</button>
      <button onClick={goToEditToDo}>Edit</button>
      <button onClick={goToDeleteToDo}>Delete</button>
    </div>
  )
}

export default DetailTodo
