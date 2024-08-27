import { Link } from 'react-router-dom';

const FlowerPostList = ({ flowerposts, loading, error }) => {
    console.log('Flowerposts data:', flowerposts) //ADDED
    if (loading) return <main>Loading...</main>;
    if (error) return <main>Error: {error}</main>;
    if (!Array.isArray(flowerposts) || flowerposts.length === 0) {
      return <main>No flower posts available.</main>;
    }
  
    return (
        <main>
          {flowerposts.map(flowerpost => {
            console.log('Created at:', flowerpost.created_at) //ADDED
            return (
              <Link key={flowerpost.id} to={`/flowerposts/${flowerpost.id}`}>
                <article>
                  <header>
                    <h2>{flowerpost.title || 'Untitled Post'}</h2>
                    <p>Category: {flowerpost.category?.name || 'Uncategorized'}</p>
                    <p>
                      Posted by: {flowerpost.owner?.username || 'Unknown User'}
                    </p>
                  </header>
                  {/* <p>{flowerpost.text || 'No content available'}</p> */}
                </article>
              </Link>
            );
          })}
        </main>
      )
}

export default FlowerPostList;