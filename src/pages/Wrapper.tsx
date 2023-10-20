import { useEffect, type FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Spinner from '../components/Spinner'
import { useAppContext } from '../context'

const Wrapper: FC = () => {
  const {
    error,
    fetchAllEmployees,
    fetchAllToDos: fetchAllTasks,
    isLoading,
    isLoggedIn,
    logOut,
  } = useAppContext()
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/main')
  }

  const handleGoToToDos = () => {
    navigate('/todos')
  }

  const handleLogOut = () => {
    logOut()
    navigate('/')
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
      return
    } else {
      fetchAllTasks()
      fetchAllEmployees()
    }
  }, [isLoggedIn])

  if (isLoading) return <Spinner />
  if (error) return <p>{error.message}</p>

  return (
    <>
      {isLoggedIn && (
        <>
          <button onClick={handleGoHome}>Main</button>
          <button onClick={handleGoToToDos}>ToDos</button>
          <button onClick={handleLogOut}>Log out</button>
        </>
      )}
      <Outlet />
    </>
  )
}

export default Wrapper
