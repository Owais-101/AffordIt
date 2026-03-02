import BasicDetails from '@/components/dashboard-calculator/BasicDetails';
import { BudgetRulePresets } from '@/components/dashboard-calculator/BudgetRule';
import YourGoals from '@/components/dashboard-calculator/YourGoals';
import LaptopNav from '@/components/dashboard/LaptopNav';
import MobileNav from '@/components/dashboard/MobileNav';


const Dashboard = () => {


  return (
    <div className='h-screen flex flex-col bg-linear-to-r from-amber-500 via-orange-500 to-red-500'>

      <div className='flex justify-between w-[95%] h-[95%] mx-auto my-auto rounded-2xl overflow-hidden mt-4 '>

        {/* SIDEBAR ONLY ON LAPTOP */}
        <div className='hidden lg:block w-[15%] lg:rounded-3xl bg-white border px-5' >
          <LaptopNav />
        </div>

        {/* MAIN CONTENT - 80% */}
        <div className='w-full lg:w-[84.5%] lg:rounded-3xl bg-white p-5 overflow-auto '>

          <div>
            <h1 className='text-3xl text-brand font-semibold' >Add Your Item</h1>
            <p className='text-sm text-black/60 mb-5 md:text-lg'>Enter your full financial picture to see what you can afford.</p>
          </div>

          <div className='lg:w-full flex flex-1 max-lg:flex-col justify-between gap-2'>
            <BasicDetails />
            <BudgetRulePresets />
          </div>

          <div className='w-full h-96 mt-5' >
            <YourGoals />
          </div>


        </div>

      </div>

      {/* MOBILE BOTTOM NAV */}
      <div>
        <MobileNav />
      </div>
    </div>
  )
}

export default Dashboard