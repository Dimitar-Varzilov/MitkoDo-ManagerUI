import { type UUID } from 'crypto'

import React, {
  type ChangeEventHandler,
  type FormEventHandler,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetEmployeesQuery } from '../api/employeeApi'
import { useAddToDoMutation } from '../api/toDoApi'
import type { IBaseToDo, IAddToDoDto } from '../interfaces'
import { isoStringSplitter } from '../utilities'

const AddToDo = () => {
  const [addToDo] = useAddToDoMutation()
  const { data: employeeList = [] } = useGetEmployeesQuery()
  const [todo, setTodo] = useState<IBaseToDo>({
    title: '',
    description: '',
    dueDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
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
        return {
          ...prev,
          [e.target.name]: new Date(e.target.value).toISOString(),
        }
      }
      return { ...prev, [e.target.name]: e.target.value }
    })

  const navigate = useNavigate()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!todo) return
    const newData: IAddToDoDto = { ...todo, employeeIds: selectedEmployees }
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
          required
        />
        <p>Description</p>
        <input
          type="text"
          defaultValue={todo.description}
          name="description"
          onChange={handleChange}
          required
        />
        <p>Start date</p>
        <input
          type="date"
          defaultValue={isoStringSplitter(todo.startDate)}
          name="startDate"
          onChange={handleChange}
          required
        />
        <p>Due date</p>
        <input
          type="date"
          defaultValue={isoStringSplitter(todo.dueDate)}
          name="dueDate"
          onChange={handleChange}
          required
        />
        <p>Assign to:</p>
        <p>Hold Ctrl to select more than one employee</p>
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
