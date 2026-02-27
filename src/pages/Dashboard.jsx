import { Button } from '@/components/ui/button'
import { LayoutDashboard, Calculator, Settings, Target, BarChart2 } from 'lucide-react'
import React, { useState } from 'react'

const Dashboard = () => {

  const [active, setActive] = useState('Dashboard')

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Calculator', icon: Calculator },
    { label: 'Goals', icon: Target },
    { label: 'Analytics', icon: BarChart2 },
    { label: 'Settings', icon: Settings },
  ]

  return (
    <div className='h-screen flex flex-col bg-orange-500'>

      <div className='flex justify-between w-[95%] h-[95%] mx-auto my-auto rounded-2xl overflow-hidden mt-4 '>

        {/* SIDEBAR ONLY ON LAPTOP */}
        <div className='hidden lg:block w-[19%] lg:rounded-3xl bg-black px-5'>
          <h1 className='text-brand font-heading text-2xl mt-5' >AffordIt</h1>
          <p className='text-gray-300 text-sm pb-5 border-b '>Your affordablity calculator</p>
        </div>

        {/* MAIN CONTENT - 80% */}
        <div className='w-full lg:w-[80%] lg:rounded-3xl bg-gray-400 p-10 '>
          <h1 className='text-lg font-heading text-black' >Good Morning, <br /> <span className='text-3xl text-brand' >OWAIS👋</span> </h1>
        </div>

      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className='lg:hidden bg-black backdrop-blur-md border mx-3 my-2 rounded-xl border-orange-500 font-sans flex md:justify-center  py-3 px-4 overflow-x-auto gap-3 md:gap-5'
        style={{ scrollbarWidth: 'none' }}>

        {navItems.map((item, idx) => {
          const Icon = item.icon
          const isActive = item.label === active
          return (
            <div
              key={idx}
              onClick={() => setActive(item.label)}
              style={{ minWidth: '64px' }}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 border
            ${isActive
                  ? 'bg-[#ff832320] border-subBrand text-subBrand'
                  : 'border-[#2a2a2a] text-[#666]'
                }`}>
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
              <p className='text-[10px] font-medium whitespace-nowrap'>{item.label}</p>
            </div>
          )
        })}

        <Button variant='primaryBtn' className='my-auto'>Log Out</Button>
      </div>

    </div>
  )
}

export default Dashboard