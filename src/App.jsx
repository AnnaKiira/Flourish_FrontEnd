import './App.css'
import { useState, createContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import SignupForm from './components/SignupForm/SignupForm.jsx'
import SigninForm from './components/SigninForm/SigninForm.jsx'
import ProfilePage from './components/ProfilePage/ProfilePage.jsx'
import FlowerPostList from './components/FlowerPostList/FlowerPostList.jsx'
import FlowerPostDetails from './components/FlowerPostDetails/FlowerPostDetails.jsx'
import FlowerPostForm from './components/FlowerPostForm/FlowerPostForm.jsx'

import * as authService from '../src/services/authService.js'
import * as flowerpostService from './services/flowerpostService.js'


export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [flowerposts, setFlowerposts] = useState([])

  const navigate = useNavigate()

  const fetchAllFlowerposts = async () => {
    if (!user) return
    try {
      const data = await flowerpostService.index()
      if (Array.isArray(data)) {
        setFlowerposts(data)
      }
    } catch (error) {
      console.error('Failed to load flower posts:', error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchAllFlowerposts()
    } else {
      setFlowerposts([])
    }
  }, [user])

  const handleAddFlowerpost = async (formData) => {
    const newFlowerpost = await flowerpostService.create(formData)
    setFlowerposts([newFlowerpost, ...flowerposts])
    navigate('/flowerposts')
  }


  const handleDeleteFlowerpost = async (flowerpostId) => { 
      try {
        await flowerpostService.deleteFlowerpost(flowerpostId)
        await fetchAllFlowerposts()
        navigate('/flowerposts')
      } catch (error) {
        console.error('Error deleting flowerpost:', error)
      }
  }

  const handleUpdateFlowerpost = async (flowerpostId, flowerpostFormData) => {
    try {
      const updatedFlowerpost = await flowerpostService.updateFlowerpost(flowerpostId, flowerpostFormData)
      setFlowerposts(flowerposts.map((flowerpost) => 
        flowerpost.id === flowerpostId ? updatedFlowerpost : flowerpost
      ))
      navigate(`/flowerposts/${flowerpostId}`)
    } catch (error) {
      console.error('Error updating flowerpost:', error)
    }
  }

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
            <Route path="/" element={<ProfilePage user={user} />} />
            <Route path="/flowerposts" element={<FlowerPostList flowerposts={flowerposts} />} />
            <Route path="/flowerposts/:flowerpostId" element={<FlowerPostDetails handleDeleteFlowerpost={handleDeleteFlowerpost}/>} />
            <Route path="/flowerposts/new" element={<FlowerPostForm handleAddFlowerpost={handleAddFlowerpost} />} />
            <Route path="/flowerposts/:flowerpostId/edit" element={<FlowerPostForm handleUpdateFlowerpost={handleUpdateFlowerpost} />} />
            </>
          ) : (
            <Route path="/" element={<LandingPage />} />
          )}
          <Route path="/sign-up" element={<SignupForm setUser={setUser} />} />
          <Route path="/sign-in" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  )
}

export default App;
