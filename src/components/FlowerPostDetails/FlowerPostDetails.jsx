import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AuthedUserContext } from '../../App'
import CommentForm from '../CommentForm/CommentForm'
import * as flowerpostService from '../../services/flowerpostService'

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
                console.log('flowerpostData', flowerpostData)
                setFlowerpost(flowerpostData)
                console.log('Current user:', user) //ADDED
                console.log('Flowerpost owner:', flowerpostData.owner) //ADDED
                console.log('Is owner:', flowerpostData.owner.id === user.user_id) //ADDED
            } catch (error) {
                console.error('Error fetching flowerpost:', error)
                setError(error.message)
            }
        }
        fetchFlowerpost()
    }, [flowerpostId, user])
    
    console.log('flowerpost state:', flowerpost)

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
        <main>

            <header>
                <p>{flowerpost.category?.name?.toUpperCase() || 'No Category'}</p>
                <h1>{flowerpost.title}</h1>
                <p>
                    {flowerpost.owner?.username} posted on
                    {new Date(flowerpost.created_at).toLocaleDateString()}
                </p>
            </header>

            <p>{flowerpost.text}</p>

            { isOwner && (
                <section>
                    <Link to={`/flowerposts/${flowerpostId}/edit`}>Edit</Link>
                    <button onClick={() => handleDeleteFlowerpost(flowerpostId)}>Delete Post</button>
                </section>
            )}

            <section>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment}/>
                {!flowerpost.comments?.length && <p>There are no comments</p>}
                {flowerpost.comments?.map((comment) => (
                    <article key={comment.id}>
                        <header>
                            <p>
                                {comment.owner?.username} posted on
                                {new Date(comment.created_at).toLocaleDateString()}
                            </p>
                        </header>
                        <p>{comment.text}</p>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default FlowerpostDetails