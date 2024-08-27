const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/flowerposts/`
const COMMENT_URL = `${import.meta.env.VITE_BACKEND_URL}/comments/`

const index = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found')
    }
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
    } catch (error) {
        console.error('Error fetching flowerposts:', error)
        throw error
    }
}

const show = async (flowerpostId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const res = await fetch(`${BASE_URL}${flowerpostId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.detail || `HTTP error! status: ${res.status}`);
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching flowerpost:', error);
        throw error;
      }
    }

const create = async (flowerpostFormData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flowerpostFormData),
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.detail || `HTTP error! status: ${res.status}`);
        }
        
        return res.json();
    } catch (error) {
        console.error('Error creating flowerpost:', error);
        throw error;
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

const deleteFlowerpost = async (flowerpostId) => {
    try {
      const res = await fetch(`${BASE_URL}${flowerpostId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      return res.json()
    } catch (error) {
      console.log(error)
    }
  }


export { index, show, create, createComment, deleteFlowerpost }