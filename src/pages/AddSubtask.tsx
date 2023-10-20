import { type FormEventHandler, useState, type ChangeEventHandler } from 'react'
import { Link, type To, useParams } from 'react-router-dom'

import { useAppContext } from '../context'
import type { INewSubtask, IToDo } from '../interfaces'

const AddSubtask = () => {
  const { todoId } = useParams()
  const { addSubtask, data } = useAppContext()
  const [toDo] = useState<IToDo | undefined>(() => {
    return data.find((t) => t.todoId === todoId)
  })
  const [formData, setFormData] = useState<INewSubtask>({
    title: '',
    description: '',
    notesCountToBeCompleted: 1,
    picturesCountToBeCompleted: 0,
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!toDo) return
    addSubtask(toDo.todoId, formData)
  }

  return (
    <div>
      <h1 className="text-4xl">MitkoDo</h1>
      {!toDo ? (
        <p>Todo not found</p>
      ) : (
        <div>
          <p>Todo title: {toDo.title}</p>
          <p>Todo description: {toDo.description}</p>
          <form onSubmit={handleSubmit}>
            <span>Title</span>
            <input
              required
              type="text"
              defaultValue={formData.title}
              name="title"
              onChange={handleChange}
            />
            <span>Description</span>
            <input
              required
              type="text"
              defaultValue={formData.description}
              name="description"
              onChange={handleChange}
            />
            <span>Notes to be completed</span>
            <input
              type="number"
              defaultValue={formData.notesCountToBeCompleted}
              min={1}
              name="notesCountToBeCompleted"
              onChange={handleChange}
            />
            <span>Pictures to be completed</span>
            <input
              type="number"
              defaultValue={formData.picturesCountToBeCompleted}
              name="picturesCountToBeCompleted"
              onChange={handleChange}
            />
            <button type="submit">Done</button>
          </form>
          <hr />
          <Link to={-1 as To}>Back</Link>
        </div>
      )}
    </div>
  )
}

export default AddSubtask
