import { Link } from 'react-router-dom';

const FlowerPostList = ({ flowerposts }) => {
  return (
    <main>
      {flowerposts.map(flowerpost => (
        <Link key={flowerpost.id} to={`/flowerposts/${flowerpost.id}`}>
          <article>
            <header>
              <h2>{flowerpost.title}</h2>
              <p>
                {flowerpost.owner.username} posted on 
                {new Date(flowerpost.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{flowerpost.text}</p>
          </article>
        </Link>
      ))}
    </main>
  )
}

export default FlowerPostList;