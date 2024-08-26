import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

const SigninForm = ({ setUser }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const updateMessage = (message) => {
    setMessage(message)
  }

  const handleChange = (event) => {
    updateMessage('')
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await authService.signin(formData)
      setUser(user)
      navigate('/')
    } catch (error) {
        updateMessage(error.message)
    }
  }

  return (
    <main>
      <h1>Log In</h1>
      {message && <p>{message}</p>}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button>Log In</button>
          <Link to="/">
            <button>Go Back</button>
          </Link>
        </div>
      </form>
    </main>
  )
}

export default SigninForm