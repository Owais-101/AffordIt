import { LayoutDashboard, Menu, TableOfContents, X } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const MobileNavbar = () => {

  const [open, setIsOpen] = useState(false)

  return (
    <>
      {/* MOBILE NAVIGATION MENU */}
      <nav className=' relative flex items-center justify-between py-3 px-8 md:hidden border-b'>

        <h1 className='text-xl md:text-5xl font-heading '>AffordIt</h1>
        <div onClick={() => setIsOpen(!open)}>
          {open ? <X className='border p-1 rounded-md' color="#de7728" size={28} /> : <Menu color="#de7728" size={25} />}
        </div>

      </nav>

      <AnimatePresence>
        {open &&
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className=' absolute z-10 bg-white/70 backdrop-blur-sm w-full flex flex-col gap-3 py-5 px-8 border-b rounded-br-xl rounded-bl-xl font-sans md:hidden'>

            <Link className='flex gap-2 items-center'> <LayoutDashboard color="#de7728" size={19} /> Showcase</Link>
            <Link className='flex gap-2 items-center'> <TableOfContents color="#de7728" size={19} /> FAQ</Link>
            <Link className='flex gap-2 items-center'> <LayoutDashboard color="#de7728" size={19} /> Showcase</Link>
            <Link className='flex gap-2 items-center'> <LayoutDashboard color="#de7728" size={19} /> Showcase</Link>

            <div className='mt-5 flex gap-3'>
              <Button variant='outline' size='sm' >Sign Up</Button>
              <Button variant='primaryBtn' size='sm' >Sign In</Button>
            </div>

          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default MobileNavbar