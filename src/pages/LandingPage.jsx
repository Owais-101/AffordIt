import React from 'react'
import Navbar from '../components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import HeroSection from '@/components/HeroSection'
import Description from '@/components/Description'
import TryItOut from '@/components/TryItOut'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

const LandingPage = () => {
    return (
        <div className='min-h-screen container mx-auto'>

            <Navbar />
            <MobileNavbar />
            <HeroSection />
            <Description />
            <div className='w-full border h-fit py-5 flex justify-center rounded-xl mb-5'>
                <TryItOut />
            </div>
            <Features />
            <div>
                <Footer />
            </div>

        </div>
    )
}

export default LandingPage