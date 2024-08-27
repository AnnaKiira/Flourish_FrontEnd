import { AuthedUserContext } from '../../App'
import { useContext } from 'react'

const ProfilePage = ({}) => {
    const user = useContext(AuthedUserContext)
    return (
      <main>
        <h1>Welcome {user.username}</h1>
        <p>
          Your profile page
        </p>
      </main>
    )
}

export default ProfilePage