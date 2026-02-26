import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Navbar = () => {
  return (

    <nav className=' sticky justify-between items-center px-10 md:px-5 border-b py-4 hidden md:flex'>
      <div className='flex items-center gap-10'>
        <h1 className='font-heading text-xl font-bold'>AffordIt</h1>

        <div className=' text-sm font-sans flex gap-5 text-black/70'>
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