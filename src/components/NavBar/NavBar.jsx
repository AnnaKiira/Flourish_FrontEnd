import { Link } from 'react-router-dom'
import { AuthedUser } from '../../App'
import { useContext } from 'react'

const NavBar = ({ handleSignout }) => {
    const user = useContext(AuthedUser)
    return (
      <>
        {user ? (
          <nav>
            <ul>
              <li>Welcome {user.username}</li>
              <li>
                <Link to="/">Profile</Link>
              </li>
              <li>
              <Link to='/flowerposts'>Flowerposts</Link>
            </li>
            <li>
              <Link to="/flowerposts/new">Add a post</Link>
            </li>
              <li>
                <Link to="" onClick={handleSignout}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul>
              <li>
                <Link to="/sign-in">Sign In</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </ul>
          </nav>
        )}
      </>
    )
}

export default NavBar;