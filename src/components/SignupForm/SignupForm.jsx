import * as authService from '../../services/authService'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
        <main>
            <h1>Sign Up</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        name="email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        value={formData.first_name}
                        name="first_name"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        value={formData.last_name}
                        name="last_name"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="name"
                        value={username}
                        name="username"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        name="password"
                        onChange={handleChange}
                        required
                    />
                    <small>Password strength: {passwordStrength(password)}</small>
                    <small>Password must be at least 8 characters long. Use a mix of letters, numbers, and symbols.</small>
                </div>
                <div>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm"
                        value={password_confirmation}
                        name="password_confirmation"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button disabled={isFormInvalid()}>Sign Up</button>
                    <Link to="/">
                        <button>Go Back</button>
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default SignupForm