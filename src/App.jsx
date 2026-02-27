import React from 'react'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import { SignupForm } from './components/SignUpForm'
import LoginForm from './components/LogIn'

const App = () => {
  return (
    <div className=''>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>

    </div>
  )
}

export default App