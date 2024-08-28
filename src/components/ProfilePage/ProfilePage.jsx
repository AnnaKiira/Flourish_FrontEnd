import { useState, useEffect } from 'react'
import { userProfile } from '../../services/flowerpostService'
import { Link } from 'react-router-dom'
import styles from './ProfilePage.module.css' 

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
        <main className={styles.profileContainer}>
            <h1>Welcome {profile?.username}</h1>
            <p>First Name: {profile?.first_name}</p>
            <p>Last Name: {profile?.last_name}</p>
            
            <h2>Your Flower Posts</h2>
            <div className={styles.postList}>
            {profile?.flowerposts_created && profile.flowerposts_created.length > 0 ? (
                    profile.flowerposts_created.map(post => (
                        <Link key={post.id} to={`/flowerposts/${post.id}`} className={styles.postCard}>
                            <article>
                                <h3 className={styles.postTitle}>{post.title}</h3>
                                <p className={styles.postCategory}>Category: {post.category.name}</p>
                            </article>
                        </Link>
                    ))
                
            ) : (
                <p>You haven't created any flower posts yet.</p>
            )}
            </div>
        </main>
    )
}

export default ProfilePage