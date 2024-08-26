import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CommentForm from '../CommentForm/CommentForm'
import * as flowerpostService from '../../services/flowerpostService'

const FlowerpostDetails = (props) => {
    const [flowerpost, setFlowerpost] = useState(null)
    const { flowerpostId } = useParams()


    useEffect(() => {
        const fetchFlowerpost = async () => {
            const flowerpostData = await flowerpostService.show(flowerpostId)
            console.log('flowerpostData', flowerpostData)
            setFlowerpost(flowerpostData)
        }
        fetchFlowerpost()
    }, [flowerpostId])
    console.log('flowerpost state:', flowerpost)

    const handleAddComment = async (formData) => {
        const newComment = await flowerpostService.createComment(flowerpostId, formData)
        setFlowerpost({ ...flowerpost, comments: [...flowerpost.comments, newComment] })
    }

    if (!flowerpost) return <main>Loading...</main>
    return (
        <main>
            <header>
                <p>{flowerpost.category.name.toUpperCase()}</p>
                <h1>{flowerpost.title}</h1>
                <p>
                    {flowerpost.owner.username} posted on
                    {new Date(flowerpost.created_at).toLocaleDateString()}
                </p>
            </header>
            <p>{flowerpost.text}</p>
            <section>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment}/>
                {!flowerpost.comments.length && <p>There are no comments</p>}
                {flowerpost.comments.map((comment) => (
                    <article key={comment.id}>
                        <header>
                            <p>
                                {comment.owner.username} posted on
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