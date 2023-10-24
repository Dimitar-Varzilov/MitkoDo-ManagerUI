import type { UUID } from 'crypto'

import { useNavigate, useParams } from 'react-router-dom'

import { useDeleteToDoMutation } from '../api/toDoApi'

const DeleteToDo = () => {
  const { todoId } = useParams()
  const [deleteToDo] = useDeleteToDoMutation()
  const navigate = useNavigate()

  const handleDelete = () => {
    deleteToDo(todoId as UUID)
  }

  const handleCancel = () => {
    navigate(-1)
  }
  return (
    <div>
      Are you sure you want to delete this todo?
      <div>
        <button onClick={handleDelete}>Yes</button>
      </div>
      <div>
        <button onClick={handleCancel}>No</button>
      </div>
    </div>
  )
}

export default DeleteToDo
