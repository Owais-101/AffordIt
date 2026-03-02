import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import logo from '../assets/images/logo.png';
import useAuth from '@/hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ border = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();

  const navigate = useNavigate();

  // Function for logging out of user
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/', { replace: true });
    } catch (error) {
      console.warn(error)
    }
  }


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
        ? 'bg-white/60 backdrop-blur-lg border-b border-white/10 shadow-lg rounded-br-xl rounded-bl-xl'
        : `bg-transparent ${border ? 'border-b' : ''}`
      }`}>
      <div className='flex items-center gap-2'>

        <Link to={'/'} className='flex items-center gap-2'>
          <div className='h-8 w-8 flex items-center justify-center'>
            <img src={logo} className='object-contain' alt="" />
          </div>
          <h1 className='font-heading text-xl font-bold hover:text-brand transition-colors'>AffordIt</h1>
        </Link>

        <div className='text-sm font-sans flex gap-5 text-black/70 md:ml-5 lg:ml-14'>
          {user
            ?
            <Link to="/dashboard" className="hover:text-black transition-colors">Dashboard</Link>
            :
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
          }
          <Link to="/docs" className="hover:text-black transition-colors">FAQ</Link>
          <Link to="/faq" className="hover:text-black transition-colors">Terms and Conditions</Link>
          <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
        </div>
      </div>

      <div className='flex gap-3'>
        {!user ? (
          <>
            <Link to="/signup"><Button variant='outline' size='sm'>Sign Up</Button></Link>
            <Link to="/login"><Button variant='primaryBtn' size='sm'>Login</Button></Link>
          </>
        )
          :
          <Button onClick={handleLogout} variant='primaryBtn' size='sm'>Logout</Button>
        }
      </div>
    </nav>
  )
}

export default Navbar