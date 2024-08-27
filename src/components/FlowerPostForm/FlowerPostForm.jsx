import { useState } from 'react'

const FlowerpostForm = ({handleAddFlowerpost}) => {
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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log('formData', formData);
    handleAddFlowerpost(formData)
  }

  return (
    <main>
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
