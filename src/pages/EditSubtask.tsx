import { type FormEventHandler, useState, type ChangeEventHandler } from 'react'
import { Link, type To, useParams } from 'react-router-dom'

import { useAppContext } from '../context'
import type { INewSubtask, ISubtask } from '../interfaces'

const EditSubtask = () => {
  const { subTaskId } = useParams()
  const { data, editSubtask } = useAppContext()
  const [subTask] = useState<ISubtask | undefined>(() => {
    let subTask: ISubtask | undefined = undefined
    data.forEach((t) =>
      t.subTasks.find((s) => {
        if (s.subTaskId === subTaskId) {
          subTask = s
          return true
        }
      }),
    )
    return subTask
  })
  const [formData, setFormData] = useState<INewSubtask>({
    title: subTask?.title ?? '',
    description: subTask?.description ?? '',
    notesCountToBeCompleted: 1,
    picturesCountToBeCompleted: 0,
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!subTask) return
    editSubtask(subTask.subTaskId, formData)
  }

  return (
    <div>
      <h1 className="text-4xl">MitkoDo</h1>
      {!subTask ? (
        <p>Subtask not found</p>
      ) : (
        <div>
          <p>{subTask.title}</p>
          <p>{subTask.description}</p>
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

export default EditSubtask
