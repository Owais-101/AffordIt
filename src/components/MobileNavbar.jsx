import { LayoutDashboard, Menu, TableOfContents, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const MobileNavbar = () => {

  const [open, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* MOBILE NAVIGATION MENU */}
      <nav className={`sticky top-0 z-50 flex items-center justify-between py-3 px-8 md:hidden border-b
        ${scrolled
          ? 'bg-white/60 backdrop-blur-lg border-white/10 shadow-lg rounded-br-xl rounded-bl-xl'
          : 'bg-transparent'
        }`}>

        <h1 className='text-xl md:text-5xl font-heading'>AffordIt</h1>
        <div onClick={() => setIsOpen(!open)}>
          {open
            ? <X className='border p-1 rounded-md' color="#de7728" size={28} />
            : <Menu color="#de7728" size={25} />
          }
        </div>

      </nav>

      <AnimatePresence>
        {open &&
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='fixed top-14.25 left-0 right-0 z-60 bg-white/70 backdrop-blur-sm flex flex-col gap-3 py-5 px-8 border-b rounded-br-xl rounded-bl-xl font-sans md:hidden'>

            <Link to='/showcase' className='flex gap-2 items-center'>
              <LayoutDashboard color="#de7728" size={19} /> Showcase
            </Link>
            <Link to='/docs' className='flex gap-2 items-center'>
              <TableOfContents color="#de7728" size={19} /> Documentation
            </Link>
            <Link to='/faq' className='flex gap-2 items-center'>
              <LayoutDashboard color="#de7728" size={19} /> FAQ
            </Link>
            <Link to='/privacy' className='flex gap-2 items-center'>
              <LayoutDashboard color="#de7728" size={19} /> Privacy Policy
            </Link>

            <div className='mt-5 flex gap-3'>
              <Button variant='outline' size='sm'>Sign Up</Button>
              <Button variant='primaryBtn' size='sm'>Sign In</Button>
            </div>

          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default MobileNavbar