import { type UUID } from 'crypto'

import React, {
  type ChangeEventHandler,
  type FormEventHandler,
  useEffect,
  useState,
} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useAppContext } from '../context'
import type { IToDo } from '../interfaces'

const EditTodo = () => {
  const { todoId } = useParams()
  const { data, deleteSubtask, editToDo } = useAppContext()
  const [todo, setTodo] = useState<IToDo | undefined>()
  const [formData, setFormData] = useState({})
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const navigate = useNavigate()

  useEffect(() => {
    data.forEach((t) => {
      if (t.todoId === todoId) {
        setTodo(t)
        return true
      }
    })
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!todo) return
    const newData: IToDo = { ...todo, ...formData }
    editToDo(todo.todoId, newData)
  }

  const goToEditSubTask = (subTaskId: UUID) => {
    navigate(`/subtask/${subTaskId}`)
  }

  const handleDeleteSubtask = (subTaskId: UUID) => {
    deleteSubtask(subTaskId)
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <h1 className="text-4xl">MitkoDo</h1>
      {!todo ? (
        <p>Todo not found</p>
      ) : (
        <>
          <div>Todo id: {todo.todoId}</div>
          <div>Todo title: {todo.title}</div>
          <div>Todo description: {todo.description}</div>
          <div>Todo startDate: {todo.startDate.toLocaleDateString()}</div>
          <div>Todo dueDate: {todo.dueDate.toLocaleDateString()}</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              defaultValue={todo.title}
              name="title"
              onChange={handleChange}
            />
            <input
              type="text"
              defaultValue={todo.description}
              name="description"
              onChange={handleChange}
            />
            <input
              type="date"
              defaultValue={todo.startDate.toISOString().split('T')[0]}
              name="startDate"
              onChange={handleChange}
            />
            <input
              type="date"
              defaultValue={todo.dueDate.toISOString().split('T')[0]}
              name="dueDate"
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <hr />
          <button onClick={goBack}>Back</button>
          <h3>Subtasks</h3>
          <div>
            {todo.subTasks.map((subTask) => (
              <div
                key={subTask.subTaskId}
                style={{
                  border: '1px solid green',
                  borderRadius: 10,
                  padding: '1rem',
                  width: 'max-Content',
                }}
              >
                <div>{subTask.title}</div>
                <button onClick={() => goToEditSubTask(subTask.subTaskId)}>
                  Edit subtask
                </button>
                <button onClick={() => handleDeleteSubtask(subTask.subTaskId)}>
                  Delete subtask
                </button>
              </div>
            ))}
            <Link to={`/subtask/add/${todo.todoId}`}>Add subtask</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default EditTodo
