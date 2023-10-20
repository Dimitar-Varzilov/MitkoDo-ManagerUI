import {
  useState,
  type FC,
  type FormEventHandler,
  type ChangeEventHandler,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '../context'
import { type LoginDto } from '../interfaces'

const Login: FC = () => {
  const { loginUser } = useAppContext()
  const navigate = useNavigate()
  const [state, setState] = useState<LoginDto>({
    email: '',
    password: '',
  })
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    loginUser({ ...state })
    navigate('/main')
  }
  return (
    <div>
      <h1 className="font-extrabold text-4xl">MitkoDo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="em">Email</label>
        <input
          type="email"
          id="em"
          name="email"
          value={state.email}
          onChange={handleChange}
        />

        <label htmlFor="pass">Password</label>
        <input
          type="password"
          id="pass"
          name="password"
          value={state.password}
          onChange={handleChange}
        />

        <button className="button-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
