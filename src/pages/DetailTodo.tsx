import type { UUID } from 'crypto'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppContext } from '../context'
import type { IToDo } from '../interfaces'

const DetailTodo = () => {
  const { todoId } = useParams()
  const { data, removeEmployeeFromToDo } = useAppContext()
  const [todo, setTodo] = useState<IToDo | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!todoId) return
    data.forEach((t) => {
      if (t.todoId === todoId) {
        setTodo(t)
        return true
      }
    })
  }, [])

  const handleRemoveClick = (employeeId: UUID) => {
    if (!todo) return
    removeEmployeeFromToDo(todo.todoId, { employeeIds: [employeeId] })
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
        {todo?.startDate.toLocaleDateString()}-
        {todo?.dueDate.toLocaleDateString()}{' '}
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
