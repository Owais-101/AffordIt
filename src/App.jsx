import React from 'react'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import { SignupForm } from './components/SignUpForm'

const App = () => {
  return (
    <div className=''>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupForm />} />
      </Routes>

    </div>
  )
}

export default App