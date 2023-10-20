import type { UUID } from 'crypto'

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppContext } from '../context'

const DeleteToDo = () => {
  const { todoId } = useParams()
  const { deleteToDo } = useAppContext()
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
