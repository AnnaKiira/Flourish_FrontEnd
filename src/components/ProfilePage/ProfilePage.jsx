import { useState, useEffect } from 'react'
import { userProfile } from '../../services/flowerpostService'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await userProfile()
                setProfile(profileData)
            } catch (error) {
                console.error('Error fetching profile:', error)
            }
        }

        fetchProfile()
    }, [])

    return (
        <main>
            <h1>Welcome {profile?.username}</h1>
            <p>First Name: {profile?.first_name}</p>
            <p>Last Name: {profile?.last_name}</p>
            
            <h2>Your Flower Posts</h2>
            {profile?.flowerposts_created && profile.flowerposts_created.length > 0 ? (
                <div>
                    {profile.flowerposts_created.map(post => (
                        <div key={post.id}>
                            <h3>{post.title}</h3>
                            <p>Category: {post.category.name}</p>
                            <p>{post.text.substring(0, 100)}...</p>
                            <Link to={`/flowerposts/${post.id}`}>View Post</Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You haven't created any flower posts yet.</p>
            )}
        </main>
    )
}

export default ProfilePage