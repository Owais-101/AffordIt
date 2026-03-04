import React from 'react'
import { PackageSearch, CircleCheck, PiggyBank, Target } from 'lucide-react'
import { useItems } from '@/context/ItemsContext'

const StatsCards = () => {

  const { items } = useItems()

  const totalGoal = items.reduce((acc, item) => acc + (item.targetPrice || 0), 0)
  const canAfford = items.filter(item => item.itemCompleted).length
  const savingFor = items.filter(item => !item.itemCompleted).length

  const stats = [
    { id: 'total-tracked', label: 'Total Tracked', value: items.length, icon: PackageSearch },
    { id: 'can-afford', label: 'Completed', value: canAfford, icon: CircleCheck },
    { id: 'saving-for', label: 'Saving For', value: savingFor, icon: PiggyBank },
    { id: 'total-goal', label: 'Total Goal', value: `₹${totalGoal.toLocaleString()}`, icon: Target },
  ]

  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.id} className='group flex flex-1 items-center gap-3 border border-brand px-7 py-5 rounded-xl hover:shadow-[4px_4px_0px_0px_#ff8323] hover:scale-[1.02] transition-all'>
              <div className='w-8 h-8 flex justify-center items-center bg-[#ff832320] rounded-full p-1'>
                <Icon className='text-brand' size={20} />
              </div>
              <div>
                <h2 className='text-md text-muted-foreground group-hover:text-brand'>{stat.label}</h2>
                <p className='font-semibold text-xl'>{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatsCards

