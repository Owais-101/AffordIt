import React from 'react';
import { Button } from './ui/button';
import notebook from '../assets/images/notebook.webp'

const HeroSection = () => {
    return (
        <div className='relative overflow-hidden min-h-fit hero-bg border-2 outline-none rounded-2xl mt-5 px-6 md:px-10 lg:px-16 py-10 lg:py-28 md:py-20 '>

            <p className='py-2 px-4 border border-brand max-md:mx-auto  w-fit text-[9px] lg:text-[12px] mb-6  text-brand rounded-3xl bg-white/20 backdrop-blur-sm '>"Save with confidence, spend with purpose"</p>

            <h1 className=' mb-10 font-sans text-3xl md:text-4xl lg:text-7xl text-fontBrand'>Plan It. Save It, <br /> <span className='font-heading text-3xl md:text-4xl lg:text-6xl text-brand'>AffordIt</span></h1>

            <Button variant='primaryBtn' size='lg' className="max-md:text-sm max-md:px-3 max-md:py-1">Get Started</Button>

            <img className='absolute left-35 top-45 lg:left-100 lg:top-70 md:left-60 md:top-55 lg:hover:top-60 transition-all' src={notebook} alt="" />

        </div>
    )
}

export default HeroSection