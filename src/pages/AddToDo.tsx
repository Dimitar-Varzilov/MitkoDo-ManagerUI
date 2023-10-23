import { type UUID } from 'crypto'

import React, {
  type ChangeEventHandler,
  type FormEventHandler,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetEmployeesQuery } from '../api/employeeApi'
import { useAppContext } from '../context'
import type { IBaseToDo, INewToDo } from '../interfaces'

const AddToDo = () => {
  const { addToDo } = useAppContext()
  const { data: employeeList = [] } = useGetEmployeesQuery()
  const [todo, setTodo] = useState<IBaseToDo>({
    title: '',
    description: '',
    dueDate: new Date('2023-10-23'),
    startDate: new Date(),
  })
  const [selectedEmployees, setSelectedEmployees] = useState<UUID[]>([])

  const handleSelectChange = (employeeId: UUID) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId],
    )
  }
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTodo((prev) => {
      if (e.target.name === 'startDate' || e.target.name === 'dueDate') {
        return { ...prev, [e.target.name]: new Date(e.target.value) }
      }
      return { ...prev, [e.target.name]: e.target.value }
    })

  const navigate = useNavigate()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!todo) return
    const newData: INewToDo = { ...todo, employeeIds: selectedEmployees }
    addToDo(newData)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <h1 className="text-4xl">MitkoDo</h1>

      <form onSubmit={handleSubmit}>
        <p>Title</p>
        <input
          type="text"
          defaultValue={todo.title}
          name="title"
          onChange={handleChange}
        />
        <p>Description</p>
        <input
          type="text"
          defaultValue={todo.description}
          name="description"
          onChange={handleChange}
        />
        <p>Start date</p>
        <input
          type="date"
          defaultValue={todo.startDate.toISOString().split('T')[0]}
          name="startDate"
          onChange={handleChange}
        />
        <p>Due date</p>
        <input
          type="date"
          defaultValue={todo.dueDate.toISOString().split('T')[0]}
          name="dueDate"
          onChange={handleChange}
        />
        <p>Assign to:</p>
        <p>Hold Ctrl to select more than one</p>
        <select multiple defaultValue={selectedEmployees}>
          {employeeList.map((employee) => {
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
        <hr />
        <div>
          <button onClick={goBack}>Back</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddToDo
