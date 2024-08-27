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
      })
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.detail || `HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log('Flowerpost data from API:', data)
      return data;
  
    } catch (error) {
      console.error('Error fetching flowerpost:', error);
      throw error
    }
}

const create = async (flowerpostFormData) => {
    try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No token found')
        
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flowerpostFormData),
        })
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.detail || `HTTP error! status: ${res.status}`)
        }
        
        return res.json()
    } catch (error) {
        console.error('Error creating flowerpost:', error)
        throw error
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
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No token found')
    
        const res = await fetch(`${BASE_URL}${flowerpostId}`, {
          method: 'DELETE',
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        })
    
        if (!res.ok) {
          throw new Error(`Failed to delete flowerpost. Status: ${res.status}`)
        }
    
        return { message: 'Flowerpost deleted successfully' }
      } catch (error) {
        console.error('Error deleting flowerpost:', error)
        throw error
      }
}

const updateFlowerpost = async (flowerpostId, flowerpostFormData) => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token found')

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
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail || `Failed to update flowerpost. Status: ${res.status}`)
      }
      return res.json()
    } catch (error) {
      console.error('Error updating flowerpost:', error)
      throw error
    }
}


export { index, show, create, createComment, deleteFlowerpost, updateFlowerpost }