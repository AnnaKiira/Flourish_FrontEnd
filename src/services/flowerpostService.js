const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/flowerposts/`
const COMMENT_URL = `${import.meta.env.VITE_BACKEND_URL}/comments/`
const USERPROFILE_URL = `${import.meta.env.VITE_BACKEND_URL}/userprofile/`

const index = async () => {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res.json()
    } catch (error) {
        console.error('Error fetching flowerposts:', error)
    }
}

const show = async (flowerpostId) => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${BASE_URL}${flowerpostId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res.json()
    } catch (error) {
        console.error('Error fetching flowerpost:', error);
    }
}

const create = async (flowerpostFormData) => {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flowerpostFormData),
        })
        return res.json()
    } catch (error) {
        console.error('Error creating flowerpost:', error)
    }
}

const createComment = async (flowerpostId, formData) => {
    try {
        const res = await fetch(`${COMMENT_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: formData.text,
                flowerpost: flowerpostId
            }),
        })
        return res.json()
    } catch (error) {
        console.error('Error creating comment:', error)
    }
}

const deleteComment = async (commentId) => {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch(`${COMMENT_URL}${commentId}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.error('Error deleting comment:', error)
    }
}

const deleteFlowerpost = async (flowerpostId) => {
    const token = localStorage.getItem('token')
    try {
        const res = await fetch(`${BASE_URL}${flowerpostId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        /* return { message: 'Flowerpost deleted successfully' } */
    } catch (error) {
        console.error('Error deleting flowerpost:', error)
    }
}

const updateFlowerpost = async (flowerpostId, flowerpostFormData) => {
    const token = localStorage.getItem('token')
    const { owner, ...dataToSend } = flowerpostFormData //removing owner from data to prevent unnecessary owner data mybackend doesn't expect
    try {
        const res = await fetch(`${BASE_URL}${flowerpostId}/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        return res.json()
    } catch (error) {
        console.error('Error updating flowerpost:', error)
    }
}

const userProfile = async () => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(USERPROFILE_URL, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res.json()
    } catch (error) {
        console.error('Error fetching user profile:', error)
    }
}


export { index, show, create, createComment, deleteFlowerpost, updateFlowerpost, userProfile, deleteComment }