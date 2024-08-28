import { useState } from 'react'
import { /* Link, */ useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'
import styles from '../../styles/AuthForm.module.css'

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
    <main className={styles.formContainer}>
      <div className={styles.formCard}>
      <h1 className={styles.formTitle}>Sign In</h1>
      {message && <p>{message}</p>}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.button}>Sign In</button>
          {/* <Link to="/">
            <button>Go Back</button>
          </Link> */}
        </div>
      </form>
      </div>
    </main>
  )
}

export default SigninForm