import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as flowerpostService from '../../services/flowerpostService'
import ImageUpload from '../ImageUpload/ImageUpload.jsx' 
import styles from './FlowerPostForm.module.css'

const FlowerpostForm = ({handleAddFlowerpost, handleUpdateFlowerpost}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '1',
    text: '',
    upload_image: '',
  })

  const categoryOptions = [ //the categories are IDs on the backend side
    { id: '1', name: 'Question' }, //and I was originally setting this file up receiving categories as a string, which caused errors when creating a post
    { id: '2', name: 'Guide' }, //hardcoded the category IDs instead of names, resolved the error
    { id: '3', name: 'Status' },
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

  const handleImageUpload = (value) => {
    setFormData({...formData, upload_image: value})
  }

  return (
    <main className={styles.formContainer}>
        <div className={styles.formCard}>
        <h1 className={styles.formTitle}>{ flowerpostId ? 'Update Post' : 'Create Post'}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title-input" className={styles.label}>Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
        />
        </div>
        <div className={styles.formGroup}>
        <label htmlFor="category-input" className={styles.label}>Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
          className={styles.select}
        >
          {categoryOptions.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        </div>
        <div className={styles.formGroup}>
            <ImageUpload
              name="upload_image"
              label="Upload Image"
              upload_image={formData.upload_image} 
              handleImageUpload={handleImageUpload}
            />
          </div>
        <div className={styles.formGroup}>
        <label htmlFor="text-input" className={styles.label}>Text</label>
        <textarea
          required
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
          className={styles.textarea}
        />
        </div>
        <button type="submit" className={styles.submitButton}>SUBMIT</button>
      </form>
      </div>
    </main>
  )
}

export default FlowerpostForm
