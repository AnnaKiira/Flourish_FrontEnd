import { Link } from 'react-router-dom'
import styles from './FlowerPostList.module.css'

const FlowerPostList = ({ flowerposts }) => {
  
    return (
        <main className={styles.postList}>
          {flowerposts.map(flowerpost => (
            
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