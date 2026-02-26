import React from 'react'
import Navbar from '../components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import HeroSection from '@/components/HeroSection'
import Description from '@/components/Description'

const LandingPage = () => {
    return (
        <div className='min-h-screen container mx-auto'>

            <Navbar />
            <MobileNavbar />
            <HeroSection />
            <Description />

        </div>
    )
}

export default LandingPage