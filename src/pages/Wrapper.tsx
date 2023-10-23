import { useEffect, type FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { logOut } from '../api/auth/authSlice'
import Spinner from '../components/Spinner'
import { useAppContext } from '../context'
import { useAppDispatch, useAppSelector } from '../store'

const Wrapper: FC = () => {
  const { isLogged } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const { error, isLoading } = useAppContext()
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/main')
  }

  const handleGoToToDos = () => {
    navigate('/todos')
  }

  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/')
  }

  useEffect(() => {
    if (!isLogged) {
      navigate('/')
      return
    }
  }, [isLogged])

  if (isLoading) return <Spinner />
  if (error) return <p>{error.message}</p>

  return (
    <>
      {isLogged && (
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
