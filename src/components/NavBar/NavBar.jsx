import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App'
import { useContext } from 'react'

const NavBar = ({ handleSignout }) => {
    const user = useContext(AuthedUserContext)
    return (
      <>
        {user ? (
          <nav>
            <ul>
              Welcome {user.username}
              
                <Link to="/">Profile</Link>
              
              
              <Link to='/flowerposts'>Flowerposts</Link>
            
            
              <Link to="/flowerposts/new">Add a post</Link>
            
              
                <Link to="" onClick={handleSignout}>
                  Sign Out
                </Link>
              
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