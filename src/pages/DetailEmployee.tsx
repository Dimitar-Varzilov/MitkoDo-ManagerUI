import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useGetEmployeesQuery } from '../api/employeeApi'

const DetailEmployee = () => {
  const { employeeId } = useParams()
  const { data: employeeList } = useGetEmployeesQuery()
  const employee = useMemo(() => {
    return employeeList?.find((employee) => employee.employeeId === employeeId)
  }, [employeeId, employeeList])

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
