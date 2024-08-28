import { Link } from 'react-router-dom'
import styles from './FlowerPostList.module.css'

const FlowerPostList = ({ flowerposts, loading, error }) => {
    console.log('Flowerposts data:', flowerposts) //ADDED
    if (loading) return <main>Loading...</main>;
    if (error) return <main>Error: {error}</main>;
    if (!Array.isArray(flowerposts) || flowerposts.length === 0) {
      return <main>No flower posts available.</main>;
    }
  
    return (
        <main className={styles.postList}>
          {flowerposts.map(flowerpost => (
            //console.log('Created at:', flowerpost.created_at)
            
              <Link className={styles.postCard} key={flowerpost.id} to={`/flowerposts/${flowerpost.id}`}>
                <article>
                  <header>
                    <h2 className={styles.postTitle}>{flowerpost.title || 'Untitled Post'}</h2>
                    <p className={styles.postCategory}>Category: {flowerpost.category?.name || 'Uncategorized'}</p>
                    <p className={styles.postAuthor}>Posted by: {flowerpost.owner?.username || 'Unknown User'}</p>
                  </header>
                </article>
              </Link>
            
          ))}
        </main>
    )
}

export default FlowerPostList;