import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as flowerpostService from '../../services/flowerpostService'

const FlowerpostForm = ({handleAddFlowerpost, handleUpdateFlowerpost}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '1',
    text: '',
    upload_image: 'https://via.placeholder.com/150',
  })

  const categoryOptions = [ //the categories are IDs on the backend side
    { id: '1', name: 'Question' }, //and I was originally setting this file up receiving categories as a string, which caused errors when creating a post
    { id: '2', name: 'Status' }, //hardcoded the category IDs instead of names, resolved the error
    { id: '3', name: 'Guide' },
  ]

  const { flowerpostId } = useParams()

  useEffect(() => {
    const fetchFlowerpost = async () => {
        if (flowerpostId) {
          const flowerpostData = await flowerpostService.show(flowerpostId)
          setFormData({
            ...flowerpostData,
            category: flowerpostData.category.id //ensuring the category is sent just as in id and not as an object (what backend expect)
          })
        }
      }
      fetchFlowerpost();
    }, [flowerpostId])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'category' ? parseInt(value, 10) : value //converting the value to an integer since the backend expects an id not a string
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (flowerpostId) {
        handleUpdateFlowerpost(flowerpostId, formData)
    } else {
        handleAddFlowerpost(formData)
    }
  }

  return (
    <main>
        <h1>{ flowerpostId ? 'Update Post' : 'Create Post'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          {categoryOptions.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default FlowerpostForm
