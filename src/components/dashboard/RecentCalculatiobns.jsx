import React from 'react'
import { Link } from 'react-router-dom'
import { Car, Bike, Home, Plane, GraduationCap, Smartphone, Heart, Building2, Shirt, Gamepad2, Dumbbell, Utensils } from 'lucide-react';
import { useItems } from '@/context/ItemsContext';

const iconMap = {
  car: Car, bike: Bike, home: Home, travel: Plane,
  education: GraduationCap, phone: Smartphone, wedding: Heart,
  property: Building2, fashion: Shirt, gaming: Gamepad2,
  fitness: Dumbbell, food: Utensils,
}

const calculateProgress = (item) => {
  const savedAmount = item.savedAmount || 0
  const disposableIncome = item.monthlyIncome - item.monthlyExpenses
  const monthlySavings = disposableIncome * (item.savingRate / 100)
  const remainingAmount = item.targetPrice - savedAmount
  const monthsRemaining = Math.max(Math.ceil(remainingAmount / monthlySavings), 0)
  return { monthsRemaining }
}

const RecentCalculations = () => {

  const { items } = useItems()

  return (
    <div className='w-full lg:w-[49%] border border-brand rounded-xl py-4 md:p-6'>
      <div className='flex justify-between px-3 md:px-'>
        <h2 className='text-md md:text-xl'>Recent Calculations</h2>
        <Link to={'/dashboard/goals'} className='text-brand mb-5'>View All</Link>
      </div>

      <div className='w-[95%] mx-auto flex flex-col gap-5'>
        {!items || items.length < 1
          ? <p className='text-muted-foreground'>No items yet</p>
          : items.map((item, idx) => {
            const Icon = iconMap[item?.goalCategory?.toLowerCase()]
            const { monthsRemaining } = calculateProgress(item) // ← live calculate

            return (
              <div key={idx} className={`flex justify-between items-center rounded-xl border border-brand py-2 px-3 ${item?.itemCompleted ? 'hover:bg-green-500/20 hover:border-transparent' : 'hover:bg-[#ff832320] hover:border-transparent'}`}>
                <div className='flex items-center gap-3'>
                  <div className={`w-8 h-8 p-1 flex justify-center items-center ${item?.itemCompleted ? 'bg-green-500/20' : 'bg-[#ff832320]'} rounded-full`}>
                    {Icon ? <Icon size={20} className={`${item?.itemCompleted ? 'text-green-500' : 'text-brand'} w-4.5 h-4.5`} /> : null}
                  </div>
                  <div>
                    <h2 className='truncate w-25 md:w-full'>{item?.itemName}</h2>
                    <p className='bg-[#ff832326] px-2 py-1 rounded-md text-xs'>
                      {item?.createdAt?.toDate?.()?.toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      }) || 'Just now'}
                    </p>
                  </div>
                </div>
                <div className='flex gap-0.5 md:gap-2'>
                  <span className={`text-xs md:text-sm ${item?.itemCompleted ? 'bg-green-500/20 text-green-700' : 'bg-[#ff832320] text-brand'} px-3 flex items-center rounded-xl`}>
                    {item?.itemCompleted ? '✅ Done' : `${monthsRemaining} months`}
                  </span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default RecentCalculations