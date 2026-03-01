import { Button } from '@/components/ui/button';
import { BarChart2, Calculator, LayoutDashboard, Settings, Target } from 'lucide-react';
import React, { useState } from 'react';

const MobileNav = () => {

    const [active, setActive] = useState('Dashboard')

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard },
        { label: 'Calculator', icon: Calculator },
        { label: 'Goals', icon: Target },
        { label: 'Analytics', icon: BarChart2 },
        { label: 'Settings', icon: Settings },
    ]

    return (
        <div className='lg:hidden bg-white backdrop-blur-md  mx-3 my-2 rounded-xl border-0 font-sans flex md:justify-center  py-3 px-4 overflow-x-auto gap-3 md:gap-5' 
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
                                ? 'bg-[#ff832320] border-0 text-subBrand'
                                : 'border-0 text-[#666]'
                            }`}>
                        <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                        <p className='text-[10px] font-medium whitespace-nowrap'>{item.label}</p>
                    </div>
                )
            })}

            <Button variant='primaryBtn' className='my-auto'>Log Out</Button>
        </div>
    )
}

export default MobileNav