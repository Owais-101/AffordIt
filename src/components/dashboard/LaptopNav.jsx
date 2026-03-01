import { Button } from '@/components/ui/button'
import { BarChart2, Calculator, LayoutDashboard, Settings, Target } from 'lucide-react'
import React, { useState } from 'react'

const LaptopNav = () => {

    const [active, setActive] = useState('Dashboard')

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard },
        { label: 'Calculator', icon: Calculator },
        { label: 'Goals', icon: Target },
        { label: 'Analytics', icon: BarChart2 },
        { label: 'Settings', icon: Settings },
    ]
    return (
        <div>
                <div>
                    <div className=' flex items-center gap-2 pt-5'>
                        <div className='w-8 h-8 bg-brand rounded-full' >
                            {/* image */}
                        </div>
                        <div>
                            <h1 className='text-brand font-heading text-2xl' > AffordIt</h1>
                        </div>
                    </div>
                    <p className='text-sm  ml-10 text-black/70 '>Your affordablity Calculator</p>

                    <div className='w-full border mt-3 mb-10' >

                    </div>

                </div>
                <div className='flex flex-col gap-5'>
                    {navItems.map((item, idx) => (
                        <div key={idx} onClick={() => setActive(item.label)} className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 border
              ${item.label === active ? 'bg-[#ff832320] border-0 text-brand' : 'border-0 text-black/70'}
              `}>
                            <item.icon size={18} />
                            <p className='text-md '>{item.label}</p>
                        </div>
                    ))}
                </div>
                <Button variant='primaryBtn' className='w-full mt-20'>Log out</Button>
            </div>


    )
}

export default LaptopNav