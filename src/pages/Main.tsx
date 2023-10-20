import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Main: FC = () => {
  const navigate = useNavigate()

  const goToTasks = () => {
    navigate(`/todos`)
  }

  const goToEmployees = () => {
    navigate(`/employees`)
  }
  return (
    <div>
      <h1 className="text-4xl">MitkoDo</h1>
      <h2>Manager panel</h2>
      <div>
        <button onClick={goToEmployees}>View Users</button>
      </div>
      <div>
        <button onClick={goToTasks}>View Tasks</button>
      </div>
    </div>
  )
}

export default Main
