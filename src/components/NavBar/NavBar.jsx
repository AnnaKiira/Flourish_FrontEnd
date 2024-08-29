import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App'
import { useContext } from 'react'
import styles from './NavBar.module.css'

const NavBar = ({ handleSignout }) => {
    const user = useContext(AuthedUserContext)
    return (
      <>
        {user ? (
          <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li><Link to="/" className={styles.navLink}>Profile</Link></li>
                <li><Link to='/flowerposts' className={styles.navLink}>Flowerposts</Link></li>
                <li><Link to="/flowerposts/new" className={styles.navLink}>Add a post</Link></li>
                <li><Link to="" onClick={handleSignout} className={styles.navLink}>Sign Out</Link></li>
            </ul>
          </nav>
        ) : (
          <nav className={styles.navbar}>
            <ul className={styles.navList}>
              <li><Link to="/sign-in" className={styles.navLink}>Sign In</Link></li>
              <li><Link to="/sign-up" className={styles.navLink}>Sign Up</Link></li>
            </ul>
          </nav>
        )}
      </>
    )
}

export default NavBar;