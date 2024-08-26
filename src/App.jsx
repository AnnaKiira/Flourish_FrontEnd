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


export const AuthedUser = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [flowerposts, setFlowerposts] = useState([])

  const navigate = useNavigate()

  const fetchAllFlowerposts = async () => {
    const allFlowerposts = await flowerpostService.index()
    setFlowerposts(allFlowerposts)
  }

  useEffect(() => {
    if (user) {fetchAllFlowerposts()}
  }, [user])

  const handleAddFlowerpost = async (formData) => {
    const newFlowerpost = await flowerpostService.create(formData)
    setFlowerposts([newFlowerpost, ...flowerposts])
    navigate('/flowerposts')
  }


  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  return (
    <>
      <AuthedUser.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
            <Route path="/" element={<ProfilePage user={user} />} />
            <Route path="/flowerposts" element={<FlowerPostList flowerposts={flowerposts} />} />
            <Route path="/flowerposts/:flowerpostId" element={<FlowerPostDetails />} />
            <Route path="/flowerposts/new" element={<FlowerPostForm handleAddFlowerpost={handleAddFlowerpost} />} />
            </>
          ) : (
            <Route path="/" element={<LandingPage />} />
          )}
          <Route path="/sign-up" element={<SignupForm setUser={setUser} />} />
          <Route path="/sign-in" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUser.Provider>
    </>
  )
}

export default App;
