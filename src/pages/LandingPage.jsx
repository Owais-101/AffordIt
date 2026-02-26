import React from 'react'
import Navbar from '../components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'

const LandingPage = () => {
    return (
        <div className='min-h-screen container mx-auto'>

            <Navbar />
            <MobileNavbar />

        </div>
    )
}

export default LandingPage