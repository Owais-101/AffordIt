import React from 'react'
import { PackageSearch, CircleCheck, PiggyBank, Target } from 'lucide-react'

const StatsCards = () => {


    const stats = [
        { id: 'total-tracked', label: 'Total Tracked', value: "1200", icon: PackageSearch },
        { id: 'can-afford', label: 'Can Afford', value: "500", icon: CircleCheck },
        { id: 'saving-for', label: 'Saving For', value: "700", icon: PiggyBank },
        { id: 'total-goal', label: 'Total Goal', value: '84,500', icon: Target },
    ]

    return (
        <div className='w-full bg--400' >
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {stats.map((item, idx) => (
                    <div key={idx} className='group flex flex-1 items-center gap-3 border border-brand px-7 py-5 rounded-xl hover:shadow-[4px_4px_0px_0px_#ff8323] hover:scale-[1.02] transition-all ' >
                        <div className='w-8 h-8 flex justify-center items-center bg-[#ff832320]  rounded-full p-1 '>
                            <item.icon className='text-brand' size={20} />
                        </div>
                        <div>
                            <h2 className='text-md text-muted-foreground group-hover:text-brand'>{item.label}</h2>
                            <p className='font-semibold text-xl'>${item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>



    )
}

export default StatsCards
