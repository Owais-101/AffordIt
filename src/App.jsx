import React from 'react'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import { Signup } from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div className=''>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>

    </div>
  )
}

export default App