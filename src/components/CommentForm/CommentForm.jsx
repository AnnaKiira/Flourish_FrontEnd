import { useState } from 'react'
import styles from './CommentForm.module.css'

const CommentForm = ({ handleAddComment }) => {
  const [formData, setFormData] = useState({ text: '' })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddComment(formData)
    setFormData({ text: '' })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <label htmlFor="text-input" className={styles.label}>Type your comment here...</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
        className={styles.textarea}
      />
      <button type="submit" className={styles.submitButton}>SUBMIT COMMENT</button>
    </form>
  )
}

export default CommentForm
