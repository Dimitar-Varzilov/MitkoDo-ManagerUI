import { type UUID } from 'crypto'

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetEmployeesQuery } from '../api/employeeApi'
import { useAssignEmployeesMutation, useGetToDoByIdQuery } from '../api/toDoApi'

const AssignEmployee = () => {
  const { todoId } = useParams()
  const { data: employeeList = [] } = useGetEmployeesQuery()
  const { data: todo } = useGetToDoByIdQuery(todoId as UUID)
  const [assignEmployee] = useAssignEmployeesMutation()
  const [selectedEmployee, setSelectedEmployee] = useState<UUID[]>([])

  const handleSelectChange = (employeeId: UUID) => {
    setSelectedEmployee((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId],
    )
  }

  const handleSubmit = () => {
    if (!todo) return
    assignEmployee({ employeeIds: selectedEmployee, todoId: todo.todoId })
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
