import * as authService from '../../services/authService'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/AuthForm.module.css'

const passwordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    const score = [hasUpperCase, hasLowerCase, hasNumbers, hasNonalphas].reduce((acc, curr) => acc + curr)

    if (password.length < 8) return 'Too Short. ';
    if (score === 4) return 'Strong. ';
    if (score === 3) return 'Medium. ';
    return 'Weak';
}

const SignupForm = ({ setUser }) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: '',
    })

    const updateMessage = (message) => setMessage(message)

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const newUser = await authService.signup(formData)
            setUser(newUser)
            navigate('/')
        } catch (error) {
            console.error('Signup error:', error)
            updateMessage(error.message)
        }
    }

    const { email, username, password, password_confirmation } = formData

    const isFormInvalid = () => {
        return !(email && username && password && password === password_confirmation && formData.first_name && formData.last_name)
    }

    return (
        <main className={styles.formContainer}>
            <div className={styles.formCard}>
                <h1 className={styles.formTitle}>Sign Up</h1>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            name="email"
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="first_name" className={styles.label}>First Name:</label>
                        <input
                            type="text"
                            id="first_name"
                            value={formData.first_name}
                            name="first_name"
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="last_name" className={styles.label}>Last Name:</label>
                        <input
                            type="text"
                            id="last_name"
                            value={formData.last_name}
                            name="last_name"
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.label}>Username:</label>
                        <input
                            type="text"
                            id="name"
                            value={username}
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
                            id="password"
                            value={password}
                            name="password"
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <small className={styles.passwordInfo}>Password strength: {passwordStrength(password)}</small> <br></br>
                        <small className={styles.passwordInfo}>Password must be at least 8 characters long. Use a mix of letters, numbers, and symbols.</small>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirm" className={styles.label}>Confirm Password:</label>
                        <input
                            type="password"
                            id="confirm"
                            value={password_confirmation}
                            name="password_confirmation"
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <button className={styles.button} disabled={isFormInvalid()}>Sign Up</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default SignupForm