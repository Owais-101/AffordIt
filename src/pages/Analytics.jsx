import LaptopNav from '@/components/dashboard/LaptopNav'
import MobileNav from '@/components/dashboard/MobileNav'
import MobileNavbar from '@/components/MobileNavbar'
import Navbar from '@/components/Navbar'
import { useItems } from '@/context/ItemsContext'
import { Car, Bike, Home, Plane, GraduationCap, Smartphone, Heart, Building2, Shirt, Gamepad2, Dumbbell, Utensils, TrendingUp, TrendingDown, Target, PiggyBank, CheckCircle2, Clock } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadialBarChart, RadialBar, LineChart, Line, AreaChart, Area
} from 'recharts'

const iconMap = {
  car: Car, bike: Bike, home: Home, travel: Plane,
  education: GraduationCap, phone: Smartphone, wedding: Heart,
  property: Building2, fashion: Shirt, gaming: Gamepad2,
  fitness: Dumbbell, food: Utensils,
}

const COLORS = ['#ff8323', '#fb923c', '#fdba74', '#fed7aa', '#22c55e', '#86efac', '#f87171', '#fca5a5']

const Analytics = () => {
  const { items } = useItems()

  // --- Derived Data ---
  const totalItems = items.length
  const completedItems = items.filter(i => i.itemCompleted).length
  const inProgressItems = items.filter(i => !i.itemCompleted).length
  const totalGoalAmount = items.reduce((acc, i) => acc + (i.targetPrice || 0), 0)
  const totalSaved = items.reduce((acc, i) => acc + (i.savedAmount || 0), 0)
  const totalRemaining = totalGoalAmount - totalSaved
  const overallProgress = totalGoalAmount > 0 ? Math.round((totalSaved / totalGoalAmount) * 100) : 0

  const avgSavingRate = items.length > 0
    ? Math.round(items.reduce((acc, i) => acc + (i.savingRate || 0), 0) / items.length)
    : 0

  // Category breakdown
  const categoryData = items.reduce((acc, item) => {
    const cat = item.goalCategory || 'Other'
    const existing = acc.find(a => a.name === cat)
    if (existing) {
      existing.value += 1
      existing.amount += item.targetPrice || 0
    } else {
      acc.push({ name: cat, value: 1, amount: item.targetPrice || 0 })
    }
    return acc
  }, [])

  // Income vs Expenses per item
  const incomeExpenseData = items.map(item => ({
    name: item.itemName?.slice(0, 8) || 'Item',
    income: item.monthlyIncome || 0,
    expenses: item.monthlyExpenses || 0,
    disposable: (item.monthlyIncome || 0) - (item.monthlyExpenses || 0),
  }))

  // Savings progress per item
  const savingsProgressData = items.map(item => ({
    name: item.itemName?.slice(0, 10) || 'Item',
    saved: item.savedAmount || 0,
    target: item.targetPrice || 0,
    progress: item.targetPrice > 0 ? Math.round(((item.savedAmount || 0) / item.targetPrice) * 100) : 0,
  }))

  // Budget rule distribution
  const budgetRuleData = items.reduce((acc, item) => {
    const rule = item.budgetRule || 'None'
    const existing = acc.find(a => a.name === rule)
    if (existing) existing.value += 1
    else acc.push({ name: rule, value: 1 })
    return acc
  }, [])

  // Monthly savings potential
  const monthlySavingsData = items.map(item => {
    const disposable = (item.monthlyIncome || 0) - (item.monthlyExpenses || 0)
    const monthlySavings = disposable * ((item.savingRate || 0) / 100)
    return {
      name: item.itemName?.slice(0, 10) || 'Item',
      monthly: Math.round(monthlySavings),
    }
  })

  const StatCard = ({ label, value, icon: Icon, color, sub }) => (
    <div className='bg-white rounded-2xl border border-orange-100 px-6 py-5 flex items-center gap-4 shadow-sm hover:shadow-[4px_4px_0px_0px_#ff8323] hover:scale-[1.02] transition-all group'>
      <div className='w-12 h-12 rounded-2xl flex items-center justify-center shrink-0' style={{ background: color + '20' }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <p className='text-xs text-muted-foreground font-medium uppercase tracking-wide'>{label}</p>
        <p className='text-2xl font-bold text-gray-900'>{value}</p>
        {sub && <p className='text-xs text-muted-foreground mt-0.5'>{sub}</p>}
      </div>
    </div>
  )

  const SectionTitle = ({ title, sub }) => (
    <div className='mb-4'>
      <h2 className='text-lg font-bold text-gray-900'>{title}</h2>
      {sub && <p className='text-sm text-muted-foreground'>{sub}</p>}
    </div>
  )

  const EmptyState = () => (
    <div className='flex flex-col items-center justify-center h-40 text-muted-foreground'>
      <PiggyBank size={32} className='mb-2 opacity-30' />
      <p className='text-sm'>No data yet</p>
    </div>
  )

  return (
    <div className='h-screen flex flex-col hero-bg'>

      <div className='container mx-auto border-l-2 border-r-2 border-b-2 border-brand bg-white rounded-b-xl'>
        <Navbar />
      </div>

      <MobileNavbar />

      <div className='flex justify-between w-[95%] h-[86%] mx-auto my-auto rounded-2xl overflow-hidden mt-4'>

        <div className='hidden lg:block w-[15%] rounded-2xl bg-white border-2 px-5 border-brand'>
          <LaptopNav />
        </div>

        {/* Main Content */}
        <div className='w-full lg:w-[84%] rounded-xl bg-white p-5 py-8 overflow-auto border-2 border-brand'>

          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl text-brand font-heading uppercase'>Analytics</h1>
            <p className='text-sm text-black/60 md:text-base'>Your full financial picture at a glance</p>
          </div>

          {items.length < 1 ? (
            <div className='w-full h-[80%] flex flex-col justify-center items-center'>
              <PiggyBank size={48} className='text-brand/30 mb-4' />
              <h2 className='text-2xl uppercase mb-2 text-muted-foreground'>No data yet</h2>
              <p className='text-sm text-muted-foreground'>Add items to see your analytics</p>
            </div>
          ) : (
            <div className='space-y-8'>
              
              {/* Overall Progress */}
              <div className='bg-white rounded-2xl border border-orange-100 p-6 shadow-sm'>
                <div className='flex justify-between items-center mb-3'>
                  <div>
                    <h2 className='text-base font-bold text-gray-900'>Overall Savings Progress</h2>
                    <p className='text-sm text-muted-foreground'>₹{totalSaved.toLocaleString()} saved of ₹{totalGoalAmount.toLocaleString()}</p>
                  </div>
                  <span className='text-2xl font-bold text-brand'>{overallProgress}%</span>
                </div>
                <Progress
                  value={overallProgress}
                  className={`h-4 ${overallProgress < 50 ? '[&>div]:bg-red-400' : '[&>div]:bg-green-500'}`}
                />
                <div className='flex justify-between text-xs text-muted-foreground mt-2'>
                  <span>₹0</span>
                  <span className='text-brand font-semibold'>₹{totalRemaining.toLocaleString()} remaining</span>
                  <span>₹{totalGoalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Charts Row 1 */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

                {/* Income vs Expenses Bar Chart */}
                <div className='bg-white rounded-2xl border border-orange-100 p-6 shadow-sm'>
                  <SectionTitle title='Income vs Expenses' sub='Per goal — monthly breakdown' />
                  {incomeExpenseData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={220}>
                      <BarChart data={incomeExpenseData} barGap={4}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#f5e6d8' />
                        <XAxis dataKey='name' tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey='income' fill='#ff8323' radius={[4, 4, 0, 0]} name='Income' />
                        <Bar dataKey='expenses' fill='#f87171' radius={[4, 4, 0, 0]} name='Expenses' />
                        <Bar dataKey='disposable' fill='#22c55e' radius={[4, 4, 0, 0]} name='Disposable' />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState />}
                </div>

                {/* Category Pie Chart */}
                <div className='bg-white rounded-2xl border border-orange-100 p-6 shadow-sm'>
                  <SectionTitle title='Goals by Category' sub='Distribution of your goals' />
                  {categoryData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={220}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx='50%' cy='50%'
                          innerRadius={55}
                          outerRadius={85}
                          dataKey='value'
                          nameKey='name'
                          paddingAngle={3}
                        >
                          {categoryData.map((_, idx) => (
                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(val, name) => [`${val} goal(s)`, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : <EmptyState />}
                </div>
              </div>

              {/* Charts Row 2 */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

                {/* Savings Progress per item */}
                <div className='bg-white rounded-2xl border border-orange-100 p-6 shadow-sm'>
                  <SectionTitle title='Savings Progress per Goal' sub='How much saved vs target' />
                  {savingsProgressData.length > 0 ? (
                    <ResponsiveContainer width='100%' height={220}>
                      <BarChart data={savingsProgressData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#f5e6d8' />
                        <XAxis dataKey='name' tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey='saved' fill='#22c55e' radius={[4, 4, 0, 0]} name='Saved' />
                        <Bar dataKey='target' fill='#ff8323' radius={[4, 4, 0, 0]} name='Target' />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState />}
                </div>

                
              </div>

              {/* Individual Goal Progress */}
              <div className='bg-white rounded-2xl border border-orange-100 p-6 shadow-sm'>
                <SectionTitle title='Individual Goal Progress' sub='Detailed breakdown per goal' />
                <div className='space-y-4'>
                  {items.map((item, idx) => {
                    const Icon = iconMap[item?.goalCategory?.toLowerCase()]
                    const saved = item.savedAmount || 0
                    const progress = item.targetPrice > 0 ? Math.min(Math.round((saved / item.targetPrice) * 100), 100) : 0
                    const disposable = (item.monthlyIncome || 0) - (item.monthlyExpenses || 0)
                    const monthlySavings = disposable * ((item.savingRate || 0) / 100)
                    const remaining = item.targetPrice - saved
                    const monthsLeft = monthlySavings > 0 ? Math.ceil(remaining / monthlySavings) : '∞'

                    return (
                      <div key={idx} className='flex items-center gap-4 p-4 rounded-xl border border-orange-50 hover:border-orange-200 hover:bg-orange-50/30 transition-all'>
                        <div className='w-10 h-10 rounded-full bg-[#ff832320] flex items-center justify-center shrink-0'>
                          {Icon ? <Icon size={18} className='text-brand' /> : <Target size={18} className='text-brand' />}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex justify-between items-center mb-1'>
                            <p className='font-semibold text-sm truncate'>{item.itemName}</p>
                            <div className='flex items-center gap-2 shrink-0 ml-2'>
                              <span className='text-xs text-muted-foreground'>₹{saved.toLocaleString()} / ₹{item.targetPrice?.toLocaleString()}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.itemCompleted ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-brand'}`}>
                                {item.itemCompleted ? '✅ Done' : `${monthsLeft}mo left`}
                              </span>
                            </div>
                          </div>
                          <Progress
                            value={progress}
                            className={`h-2 ${progress < 50 ? '[&>div]:bg-red-400' : '[&>div]:bg-green-500'}`}
                          />
                          <div className='flex justify-between mt-1'>
                            <span className='text-xs text-muted-foreground'>{progress}% complete</span>
                            <span className='text-xs text-muted-foreground'>Saving ₹{Math.round(monthlySavings).toLocaleString()}/mo</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  )
}

export default Analytics