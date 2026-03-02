import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Clock } from 'lucide-react';

const RecentCalculatiobns = () => {


    const savingsGoals = [
        {
            name: "Home Theater Setup",
            dateCreated: "Dec 22, 2025",
            icon: Clock,
            price: "$3,924.41",
            timeRemaining: "5 mon",
            completed: false,
        },
        {
            name: "New iPhone 16",
            dateCreated: "Jan 10, 2026",
            icon: CheckCircle2,
            price: "$3,865.29",
            timeRemaining: "affordable",
            completed: true,
        },
        {
            name: "Language Course Abroad",
            dateCreated: "Nov 05, 2025",
            icon: CheckCircle2,
            price: "$1,481.25",
            timeRemaining: "affordable",
            completed: true,
        },
        {
            name: "Camera Lens (70-200mm)",
            dateCreated: "Feb 21, 2026",
            icon: Clock,
            price: "$2,660.16",
            timeRemaining: "1 mon",
            completed: false,
        },
        {
            name: "Summer Vacation Trip",
            dateCreated: "Nov 28, 2025",
            icon: Clock,
            price: "$418.93",
            timeRemaining: "10 mon",
            completed: false,
        },
    ]

    return (
        <div className=' w-full lg:w-[49%] border border-brand rounded-xl py-4 md:p-6' >
            <div className='flex justify-between px-3 md:px:0'>
                <h2 className='text-md md:text-xl'>Recent Calculations</h2>
                <Link className='text-brand mb-5'>View All</Link>
            </div>

            <div className='w-[95%] mx-auto flex flex-col gap-5' >
                {savingsGoals.map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center rounded-xl lg:px-2 ${item.completed ? `hover:bg-green-500/20` : `hover:bg-[#ff832320]`} `}>
                        <div className='flex items-center gap-3'>
                            <div className={`w-8 h-8 p-1 flex justify-center items-center ${item.completed ? `bg-green-500/20` : `bg-[#ff832320]`} rounded-full`}>
                                <item.icon size={20} className={`${item.completed ? `text-green-500` : `text-brand`} w-4.5 h-4.5`} />
                            </div>
                            <div>
                                <h2 className='truncate w-25 md:w-full'>{item.name}</h2>
                                <p className='text-muted-foreground text-xs md:text-sm truncate'>{item.dateCreated}</p>
                            </div>
                        </div>
                        <div className='flex gap-0.5 md:gap-2 '>
                            <p className='text-sm md:text-md'>{item.price}</p>
                            <span className={`text-xs nd:text-sm ${item.completed ? `bg-green-500/20 text-green-700 ` : `bg-[#ff832320] text-brand`} px-3 flex items-center rounded-xl `} > {item.timeRemaining}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div >
    )
}

export default RecentCalculatiobns