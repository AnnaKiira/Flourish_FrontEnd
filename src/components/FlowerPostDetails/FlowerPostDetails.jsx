import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AuthedUserContext } from '../../App'
import CommentForm from '../CommentForm/CommentForm'
import * as flowerpostService from '../../services/flowerpostService'
import styles from './FlowerpostDetails.module.css'

const FlowerpostDetails = ({handleDeleteFlowerpost}) => {
    const [flowerpost, setFlowerpost] = useState(null)
    // added error state to handle and display errors since I kept getting on protected routes
    const [error, setError] = useState(null)
    const { flowerpostId } = useParams()
    const user = useContext(AuthedUserContext)

    useEffect(() => {
        const fetchFlowerpost = async () => {
            // added try-catch for error handling
            try {
                const flowerpostData = await flowerpostService.show(flowerpostId)
                setFlowerpost(flowerpostData)
            } catch (error) {
                console.error('Error fetching flowerpost:', error)
                setError(error.message)
            }
        }
        fetchFlowerpost()
    }, [flowerpostId, user])

    const handleAddComment = async (formData) => {
        // added try-catch for error handling
        try {
            const newComment = await flowerpostService.createComment(flowerpostId, formData)
            setFlowerpost(prev => ({ ...prev, comments: [...prev.comments, newComment] }))
        } catch (error) {
            console.error('Error adding comment:', error)
        }
    }

    const isOwner = flowerpost && user && flowerpost.owner.id === user.user_id

    if (!flowerpost) return <main>Loading...</main>

    return (
        <main className={styles.flowerpostDetails}>

            <header>
                <h1 className={styles.title}>{flowerpost.title}</h1>
                <p className={styles.category}>Category: {flowerpost.category?.name || 'Uncategorized'}</p>
                <p className={styles.author}>Posted by: {flowerpost.owner?.username || 'Unknown User'}</p>
            </header>

            <p className={styles.content}>{flowerpost.text}</p>

            { isOwner && (
                <section className={styles.actions}>
                    <Link to={`/flowerposts/${flowerpostId}/edit`} className={styles.editButton}>Edit Post</Link>
                    <button onClick={() => handleDeleteFlowerpost(flowerpostId)} className={styles.deleteButton}>Delete Post</button>
                </section>
            )}

            <section className={styles.comments}>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment}/>
                {!flowerpost.comments?.length && <p className={styles.noComments}>Be the first to comment</p>}
                {flowerpost.comments?.map((comment) => (
                    <article key={comment.id} className={styles.comment}>
                        <header>
                            <p>
                            {comment.owner?.username} Posted <br></br>
                            {new Date(comment.created_at).toLocaleDateString()}
                            </p>
                        </header>
                        <p className={styles.commentText}>{comment.text}</p>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default FlowerpostDetails