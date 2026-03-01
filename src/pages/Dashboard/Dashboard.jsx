import CalculatorPro from '@/components/CalculatorPro';
import LaptopNav from '@/components/dashboard/LaptopNav';
import MobileNav from '@/components/dashboard/MobileNav';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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

          <div className='md:flex items-center justify-between mb-5'>
            <div className='bg-[#ff832320] border-0 py-2 px-4 rounded-xl w-fit flex items-center gap-3 mx-auto md:mx-0'>
              <div className='w-8 h-8 bg-subBrand rounded-full' >
                {/* image  */}
              </div>
              <div>
                <h2 className=' text-md md:text-xl text-brand font-'>Owais Ali</h2>
                <p className='text-black/70 text-sm md:text-md'>owaisali5371@gmail.com</p>
              </div>
            </div>

            <div>
              <Link to={'/dashboard/calculator'}>
                <Button variant='primaryBtn' className='lg:h-12 md:h-11 mt-5 md:mt-0 mx-auto block rounded-full'>Add a New Item</Button>
              </Link>
            </div>
          </div>

          <div>
            <CalculatorPro />
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