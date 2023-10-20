import { type UUID } from 'crypto'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppContext } from '../context'
import { type IToDo } from '../interfaces'

const AssignEmployee = () => {
  const { todoId } = useParams()
  const { assignEmployee, data, employeeList } = useAppContext()
  const [todo, setTodo] = useState<IToDo | undefined>()
  const [selectedEmployee, setSelectedEmployee] = useState<UUID[]>([])

  useEffect(() => {
    data.forEach((t) => {
      if (t.todoId === todoId) {
        setTodo(t)
        return true
      }
    })
  }, [])

  const handleSelectChange = (employeeId: UUID) => {
    setSelectedEmployee((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId],
    )
  }

  const handleSubmit = () => {
    if (!todo) return
    assignEmployee(todo.todoId, selectedEmployee)
  }

  if (!todo) return <p>Todo not found</p>
  return (
    <div>
      <p>Todo title: {todo.title}</p>
      <p>Assign to:</p>
      <p>Hold Ctrl to select more than one</p>
      <select multiple defaultValue={selectedEmployee}>
        {employeeList
          .filter(
            (employee) =>
              !todo.employees.some(
                (todoEmployee) =>
                  todoEmployee.employeeId === employee.employeeId,
              ) && employee.isAvailable,
          )
          .map((employee) => {
            return (
              <option
                key={employee.employeeId}
                value={employee.employeeId}
                onClick={() => handleSelectChange(employee.employeeId)}
              >
                {employee.name}
              </option>
            )
          })}
      </select>
      <div>
        <button onClick={handleSubmit}>Done</button>
      </div>
    </div>
  )
}

export default AssignEmployee
