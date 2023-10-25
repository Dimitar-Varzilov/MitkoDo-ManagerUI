import { type UUID } from 'crypto'

import { type ChangeEventHandler, type FormEventHandler, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  useDeleteSubTaskMutation,
  useEditToDoMutation,
  useGetToDoByIdQuery,
} from '../api/toDoApi'
import { type IEditToDoDto } from '../interfaces'

const EditTodo = () => {
  const { todoId } = useParams()
  const { data: toDo } = useGetToDoByIdQuery(todoId as UUID)
  const [editToDo] = useEditToDoMutation()
  const [deleteSubtask] = useDeleteSubTaskMutation()
  const [formData, setFormData] = useState({})
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!toDo) return
    const newData: IEditToDoDto = { ...toDo, ...formData }
    editToDo(newData)
  }

  const goToEditSubTask = (subTaskId: UUID) => {
    navigate(`/subtask/${subTaskId}`)
  }

  const handleDeleteSubtask = (subTaskId: UUID) => {
    if (!toDo) return
    deleteSubtask({ subTaskId, todoId: toDo.todoId })
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <h1 className="text-4xl">MitkoDo</h1>
      {!toDo || !todoId ? (
        <p>Todo not found</p>
      ) : (
        <>
          <div>Todo id: {toDo.todoId}</div>
          <div>Todo title: {toDo.title}</div>
          <div>Todo description: {toDo.description}</div>
          <div>Todo startDate: {toDo.startDate.toLocaleDateString()}</div>
          <div>Todo dueDate: {toDo.dueDate.toLocaleDateString()}</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              defaultValue={toDo.title}
              name="title"
              onChange={handleChange}
            />
            <input
              type="text"
              defaultValue={toDo.description}
              name="description"
              onChange={handleChange}
            />
            <input
              type="date"
              defaultValue={toDo.startDate.toISOString().split('T')[0]}
              name="startDate"
              onChange={handleChange}
            />
            <input
              type="date"
              defaultValue={toDo.dueDate.toISOString().split('T')[0]}
              name="dueDate"
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <hr />
          <button onClick={goBack}>Back</button>
          <h3>Subtasks</h3>
          <div>
            {toDo.subTasks.map((subTask) => (
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
            <Link to={`/subtask/add/${toDo.todoId}`}>Add subtask</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default EditTodo
