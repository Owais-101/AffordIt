import LaptopNav from '@/components/dashboard/LaptopNav';
import MobileNav from '@/components/dashboard/MobileNav';
import MobileNavbar from '@/components/MobileNavbar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, Car, Bike, Home, Plane, GraduationCap, Smartphone, Heart, Building2, Shirt, Gamepad2, Dumbbell, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentCalculatiobns from '@/components/dashboard/RecentCalculatiobns';
import { useItems } from '@/context/ItemsContext';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

// ─── Data ─────

const iconMap = {
  car: Car, bike: Bike, home: Home, travel: Plane,
  education: GraduationCap, phone: Smartphone, wedding: Heart,
  property: Building2, fashion: Shirt, gaming: Gamepad2,
  fitness: Dumbbell, food: Utensils,
}

const COLORS = ['#ff8323', '#fb923c', '#fdba74', '#22c55e', '#86efac', '#f87171']

const quotes = [
  { quote: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry" },
  { quote: "Do not save what is left after spending, spend what is left after saving.", author: "Warren Buffett" },
  { quote: "Financial freedom is available to those who learn about it and work for it.", author: "Robert Kiyosaki" },
  { quote: "The secret to getting ahead is getting started.", author: "Mark Twain" },
  { quote: "It's not about how much money you make, but how much you keep.", author: "Robert Kiyosaki" },
  { quote: "Beware of little expenses; a small leak will sink a great ship.", author: "Benjamin Franklin" },
  { quote: "The habit of saving is itself an education.", author: "T.T. Munger" },
  { quote: "Every time you borrow money, you're robbing your future self.", author: "Nathan W. Morris" },
]

const tips = [
  "💡 Try the 50/30/20 rule — 50% needs, 30% wants, 20% savings.",
  "💡 Automate your savings so you never forget to save.",
  "💡 Track every expense for 30 days — you'll be surprised where it goes.",
  "💡 Increase your saving rate by just 1% every month.",
  "💡 Before buying, ask yourself: do I need this, or do I want this?",
  "💡 Build an emergency fund of 3-6 months of expenses first.",
  "💡 Avoid lifestyle inflation — save raises instead of spending them.",
]

// ─── Dashboard ────
const Dashboard = () => {

  const { user } = useAuth()
  const { items } = useItems()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const dayIndex = new Date().getDate()
  const quote = quotes[dayIndex % quotes.length]
  const tip = tips[dayIndex % tips.length]

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

  const SectionHeading = ({ label }) => (
    <div className='flex items-center gap-2 mb-4'>
      <div className='w-1 h-5 bg-brand rounded-full' />
      <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider'>{label}</h3>
    </div>
  )

  const Divider = () => (
    <div className='w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent my-7' />
  )

  return (
    <div className='h-screen flex flex-col hero-bg'>

      <div className='container mx-auto border-l-2 border-r-2 border-b-2 border-brand bg-white rounded-b-xl'>
        <Navbar border={false} />
      </div>

      <div className='bg-white'>
        <MobileNavbar />
      </div>

      <div className='flex justify-between w-[95%] h-[85%] mx-auto my-auto rounded-2xl overflow-hidden mt-4'>

        {/* SIDEBAR */}
        <div className='hidden lg:block w-[15%] lg:rounded-3xl bg-white border-2 border-brand px-5'>
          <LaptopNav />
        </div>

        {/* MAIN CONTENT */}
        <div className='w-full lg:w-[84.5%] rounded-2xl bg-white p-5 md:p-7 overflow-auto border-2 border-brand'>

          {/* ── Header ── */}
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
            {!user ? (
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ) : (
              <div className='flex items-center gap-4'>
                <div className='relative'>
                  <div className='w-12 h-12 rounded-2xl border-2 border-brand overflow-hidden'>
                    <img src={user?.photoURL} className='w-full h-full object-cover' referrerPolicy="no-referrer" alt="" />
                  </div>
                  <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white' />
                </div>
                <div>
                  <p className='text-xs text-muted-foreground font-medium flex items-center gap-1'>
                    <Sparkles size={11} className='text-brand' />
                    {getGreeting()}
                  </p>
                  <h2 className='text-lg md:text-xl font-bold text-gray-900 leading-tight'>
                    {user?.displayName?.split(' ')[0] || 'User'} 👋
                  </h2>
                  <p className='text-xs text-muted-foreground'>{user?.email}</p>
                </div>
              </div>
            )}

            <Link to='/dashboard/calculator'>
              <Button
                variant='primaryBtn'
                className='rounded-full flex items-center gap-2 px-6 h-11 shadow-[3px_3px_0px_0px_#e6731a] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all mx-auto md:mx-0'>
                <Plus size={18} />
                Add a New Item
              </Button>
            </Link>
          </div>

          <Divider />

          {/* ── Stats ── */}
          <div className='mb-7'>
            <SectionHeading label='Overview' />
            <StatsCards />
          </div>

          <Divider />

          {/* ── Recent Activity ── */}
          <div className='mb-7'>
            <SectionHeading label='Recent Activity' />
            <RecentCalculatiobns />
          </div>

          <Divider />

          {/* ── Widgets Row ── */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

            {/* Motivational Quote */}
            <div className='border border-brand rounded-2xl p-5 bg-gradient-to-br from-orange-50 to-white'>
              <SectionHeading label='Daily Motivation' />
              <span className='text-4xl text-brand/20 font-serif leading-none'>"</span>
              <p className='text-sm md:text-base font-medium text-gray-800 italic -mt-3 px-2'>
                {quote.quote}
              </p>
              <p className='text-xs text-muted-foreground mt-2 px-2'>— {quote.author}</p>
              <div className='w-full h-px bg-orange-100 my-3' />
              <div className='bg-[#ff832312] rounded-xl px-4 py-3'>
                <p className='text-xs md:text-sm text-gray-700'>{tip}</p>
              </div>
            </div>

            {/* Top Categories */}
            <div className='border border-brand rounded-2xl p-5'>
              <SectionHeading label='Top Categories' />
              {categoryData.length === 0 ? (
                <p className='text-sm text-muted-foreground text-center py-10'>No categories yet</p>
              ) : (
                <div className='flex flex-col gap-1'>
                  <ResponsiveContainer width='100%' height={160}>
                    <PieChart>
                      <Pie data={categoryData} cx='50%' cy='50%' innerRadius={40} outerRadius={65} dataKey='value' paddingAngle={3}>
                        {categoryData.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val, name) => [`${val} goal(s)`, name]} />
                      <Legend iconType='circle' iconSize={8} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className='flex flex-col gap-1 mt-2'>
                    {categoryData.map((cat, idx) => {
                      const Icon = iconMap[cat.name?.toLowerCase()]
                      return (
                        <div key={idx} className='flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#ff832308] transition-all'>
                          <div className='flex items-center gap-2'>
                            <div className='w-6 h-6 rounded-full flex items-center justify-center' style={{ background: COLORS[idx % COLORS.length] + '20' }}>
                              {Icon ? <Icon size={12} style={{ color: COLORS[idx % COLORS.length] }} /> : null}
                            </div>
                            <span className='text-sm font-medium capitalize'>{cat.name}</span>
                          </div>
                          <div className='flex items-center gap-3'>
                            <span className='text-xs text-muted-foreground'>{cat.value} goal{cat.value > 1 ? 's' : ''}</span>
                            <span className='text-xs font-semibold text-brand'>₹{cat.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      <MobileNav />
    </div>
  )
}

export default Dashboard
