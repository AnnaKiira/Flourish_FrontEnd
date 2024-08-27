import { Link } from 'react-router-dom';

const FlowerPostList = ({ flowerposts, loading, error }) => {
    if (loading) return <main>Loading...</main>;
    if (error) return <main>Error: {error}</main>;
    if (!Array.isArray(flowerposts) || flowerposts.length === 0) {
      return <main>No flower posts available.</main>;
    }
  
    return (
      <main>
        {flowerposts.map(flowerpost => (
          <Link key={flowerpost.id} to={`/flowerposts/${flowerpost.id}`}>
            <article>
              <header>
                <h2>{flowerpost.title || 'Untitled Post'}</h2>
                <p>
                  {flowerpost.owner?.username || 'Unknown User'} posted on 
                  {flowerpost.created_at 
                    ? new Date(flowerpost.created_at).toLocaleDateString()
                    : 'Unknown Date'
                  }
                </p>
              </header>
              <p>{flowerpost.text || 'No content available'}</p>
            </article>
          </Link>
        ))}
      </main>
    )
}

export default FlowerPostList;