import { Button } from '@/components/ui/button';
import { BarChart2, Calculator, LayoutDashboard, Settings, Target } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png'

const LaptopNav = () => {

    const { pathname } = useLocation()

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Calculator', icon: Calculator, path: '/dashboard/calculator' },
        { label: 'Goals', icon: Target, path: '/dashboard/goals' },
        { label: 'Analytics', icon: BarChart2, path: '/dashboard/analytics' },
        { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
    ]

    return (
        <div>
            <div>
                <h1 className='font-heading text-2xl text-center my-5 text-brand' >Welcome👋</h1>
                <div className='w-full border mb-10' ></div>
            </div>
            <div className='flex flex-col gap-5 '>
                {navItems.map((item, idx) => (
                    <Link to={item.path}>
                        <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 border hover:bg-[#ff832320] hover:text-brand
                            ${item.path === pathname ? 'bg-[#ff832320] border-0 text-brand' : 'border-0 text-black/70'}`}>
                            <item.icon size={18} />
                            <p className='text-md '>{item.label}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Button variant='primaryBtn' className='w-full mt-20'>Log out</Button>
        </div>


    )
}

export default LaptopNav