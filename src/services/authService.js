const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL

const getUser = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    const user = JSON.parse(atob(token.split('.')[1]))
    return user
}

const signup = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/auth/sign-up/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        const json = await res.json()
        if (res.status >= 400) {
            if (json.non_field_errors) {
                throw new Error(json.non_field_errors.join(' '))
            }
            throw new Error(json.message || 'Signup failed')
        }
        if (json.token) {
            localStorage.setItem('token', json.token)
        }
        return json
    } catch (error) {
        console.error('Signup error:', error)
        throw error
    }
}


const signin = async (user) => {
    try {
        const res = await fetch(`${BACKEND_URL}/auth/sign-in/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
        const json = await res.json()
        if (json.detail) {
            throw new Error(json.detail)
        }
        if (json.access) {
            localStorage.setItem('token', json.access)
            return getUser()
        } else {
            throw new Error("No token received")
        }
    } catch (error) {
        throw error
    }
}


const signout = () => {
    localStorage.removeItem('token')
}

export {signup, signin, getUser, signout}