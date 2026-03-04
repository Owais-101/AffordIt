import React from 'react'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import { Signup } from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard/Dashboard'
import Calculator from './pages/Dashboard/Calculator'
import ProtectedRoutes from './components/ProtectedRoutes'
import Goals from './pages/Dashboard/Goals'
import { FaqAccordion } from './components/Accordian'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyAndPolicy from './pages/PrivacyAndPolicy'
import Analytics from './pages/Analytics'

const App = () => {
  return (
    <div className=''>

      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route path='/signup' element={<Signup />} />

        <Route path='/login' element={<SignIn />} />

        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } />
        <Route path='/dashboard/goals' element={
          <ProtectedRoutes>
            <Goals />
          </ProtectedRoutes>
        } />
        <Route path='/dashboard/calculator' element={
          <ProtectedRoutes>
            <Calculator />
          </ProtectedRoutes>
        } />

        <Route path='/faq' element={<FaqAccordion />} />

        <Route path='/terms' element={<TermsAndConditions />} />

        <Route path='/privacy' element={<PrivacyAndPolicy />} />
        <Route path='/dashboard/analytics' element={<Analytics />} />

      </Routes>

    </div>
  )
}

export default App