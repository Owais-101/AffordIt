import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 justify-between items-center px-10 md:px-5 py-4 hidden md:flex transition-all duration-300
      ${scrolled
        ? 'bg-white/60 backdrop-blur-lg border-b border-white/10 shadow-lg'
        : 'bg-transparent border-b'
      }`}>
      <div className='flex items-center gap-10'>
        <h1 className='font-heading text-xl font-bold'>AffordIt</h1>

        <div className='text-sm font-sans flex gap-5 text-black/70'>
          <Link to="/showcase" className="hover:text-black transition-colors">Showcase</Link>
          <Link to="/docs" className="hover:text-black transition-colors">Documentation</Link>
          <Link to="/faq" className="hover:text-black transition-colors">FAQ</Link>
          <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
        </div>
      </div>

      <div className='flex gap-3'>
        <Link to="/signup"><Button variant='outline' size='sm'>Sign Up</Button></Link>
        <Link to="/login"><Button variant='primaryBtn' size='sm'>Sign In</Button></Link>
      </div>
    </nav>
  )
}

export default Navbar