const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/flowerposts`

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const show = async (flowerpostId) => {
    try {
        const res = await fetch(`${BASE_URL}/${flowerpostId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

const create = async (flowerpostFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flowerpostFormData),
        })
        return res.json()
    } catch (error) {
        console.log('Error creating flowerpost:', error)
    }
}


export { index, show, create }