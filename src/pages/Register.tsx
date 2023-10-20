import React, {
  type ChangeEventHandler,
  type FormEventHandler,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '../context'
import type { RegisterDto } from '../interfaces'

const Register = () => {
  const { registerUser } = useAppContext()
  const navigate = useNavigate()
  const [state, setState] = useState<RegisterDto>({
    name: '',
    confirmPassword: '',
    email: '',
    password: '',
  })
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    registerUser({ ...state })
    navigate('/login')
  }
  return (
    <div>
      <h1 className="font-extrabold text-4xl">MitkoDo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />

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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
        />

        <button className="button-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Register
