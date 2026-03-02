import BasicDetails from '@/components/dashboard-calculator/BasicDetails';
import { BudgetRulePresets } from '@/components/dashboard-calculator/BudgetRule';
import Motive from '@/components/dashboard-calculator/Motive';
import YourGoals from '@/components/dashboard-calculator/YourGoals';
import LaptopNav from '@/components/dashboard/LaptopNav';
import MobileNav from '@/components/dashboard/MobileNav';
import MobileNavbar from '@/components/MobileNavbar';
import Navbar from '@/components/Navbar';


const Dashboard = () => {
  return (
    <>
      <div className='h-screen flex flex-col hero-bg'>

        <div className='container mx-auto border-l-2 border-r-2 border-b-2 border-brand  bg-white rounded-b-xl' >
          <Navbar />
        </div>
        <MobileNavbar />


        <div className='flex justify-between w-[95%] h-[86%] mx-auto my-auto rounded-2xl overflow-hidden mt-4 '>

          {/* SIDEBAR ONLY ON LAPTOP */}
          <div className='hidden lg:block w-[15%] lg:rounded-3xl bg-white border-2 px-5  border-brand' >
            <LaptopNav />
          </div>

          {/* MAIN CONTENT - 80% */}
          <div className='w-full lg:w-[84%] rounded-xl bg-white p-5 py-10 overflow-auto border-2 border-brand '>

            <div>
              <h1 className='text-3xl text-brand font-heading uppercase'>Add Item</h1>
              <p className='text-sm text-black/60 mb-5 md:text-lg'>Enter your full financial picture to see what you can afford.</p>
            </div>

            <div className='lg:w-full flex flex-1 max-lg:flex-col justify-between gap-2'>
              <BasicDetails />
              <BudgetRulePresets />
            </div>

            <div className='w-full mt-2 lg:flex gap-2' >
              <YourGoals />
              <Motive />
            </div>




          </div>

        </div>

        {/* MOBILE BOTTOM NAV */}
        <div>
          <MobileNav />
        </div>
      </div>
    </>

  )
}

export default Dashboard