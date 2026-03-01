import React from 'react'
import Navbar from '../components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import HeroSection from '@/components/HeroSection'
import Description from '@/components/Description'
import TryItOut from '@/components/TryItOut'

const LandingPage = () => {
    return (
        <div className='min-h-screen container mx-auto'>

            <Navbar />
            <MobileNavbar />
            <HeroSection />
            <Description />
            <div className='w-full bg-red-500 h-fit py-5 flex justify-center rounded-xl mb-5'>
                <TryItOut />
            </div>

        </div>
    )
}

export default LandingPage