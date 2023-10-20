import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppContext } from '../context'
import type { IEmployee } from '../interfaces'

const DetailEmployee = () => {
  const { employeeId } = useParams()
  const { employeeList } = useAppContext()
  const [employee, setEmployee] = useState<IEmployee | undefined>()

  useEffect(() => {
    employeeList.forEach((e) => {
      if (e.employeeId === employeeId) {
        setEmployee(e)
        return true
      }
    })
  }, [])
  if (!employee) return <p>Employee not found</p>
  if (!employee.isAvailable)
    return (
      <>
        <h4>Employee toDos</h4>
        {employee.employeeToDos.map((employeeToDo) => (
          <div key={employeeToDo.todoId}>
            <div>{employeeToDo.title}</div>
          </div>
        ))}
      </>
    )

  return (
    <p style={{ color: 'darkgreen', fontSize: 20, fontWeight: 10 }}>
      All todos Done
    </p>
  )
}

export default DetailEmployee
