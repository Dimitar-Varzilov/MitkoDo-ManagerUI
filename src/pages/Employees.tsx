/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { UUID } from 'crypto'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '../context'

const Employees = () => {
  const { employeeList } = useAppContext()
  const navigate = useNavigate()

  const handleEmployeeClick = (employeeId: UUID) => {
    navigate(`/detail/employee/${employeeId}`)
  }
  return (
    <div>
      <h1>Employees</h1>
      <div>
        {employeeList.map((employee) => (
          <div key={employee.employeeId}>
            <div onClick={() => handleEmployeeClick(employee.employeeId)}>
              {employee.name}
            </div>
            <input type="checkbox" disabled checked={employee.isAvailable} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Employees
