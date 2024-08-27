const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

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
      
      if (!res.ok) {
        throw new Error(JSON.stringify(json) || 'Signup failed')
      }
      
      if (json.access) {
        localStorage.setItem('token', json.access)
        localStorage.setItem('refreshToken', json.refresh)
        return json.user || getUser()
      } else {
        throw new Error('No access token in response')
      }
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
        }
    } catch (error) {
        console.error('Signin error:', error)
    }
}


const signout = () => {
    localStorage.removeItem('token')
}

export {signup, signin, getUser, signout}