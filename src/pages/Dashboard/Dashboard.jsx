
import LaptopNav from '@/components/dashboard/LaptopNav';
import MobileNav from '@/components/dashboard/MobileNav';
import MobileNavbar from '@/components/MobileNavbar';
import Navbar from '@/components/Navbar';
import TryItOut from '@/components/TryItOut';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


const Dashboard = () => {


  // Logged in User Data/Credentials from firebase through a custom hook
  const user = useAuth()

 
  return (
    <>

      {
        !user
          ?
          (<>

            <div className='w-full h-screen flex items-center justify-center overflow-hidden'>
              <Card className="w-[90%] h-[90%] overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="aspect-video lg:h-[73%] w-full" />
                </CardContent>
              </Card>
            </div>

          </>)
          :
          (<>
            <Navbar />

            <MobileNavbar />

            <div className='h-screen flex flex-col bg-linear-to-r from-amber-500 via-orange-500 to-red-500'>

              <div className='flex justify-between w-[95%] h-[95%] mx-auto my-auto rounded-2xl overflow-hidden mt-4 '>

                {/* SIDEBAR ONLY ON LAPTOP */}
                <div className='hidden lg:block w-[15%] lg:rounded-3xl bg-white border px-5' >
                  <LaptopNav />
                </div>

                {/* MAIN CONTENT - 80% */}
                <div className='w-full lg:w-[84.5%] lg:rounded-3xl bg-white p-5 overflow-auto '>

                  <div className='md:flex items-center justify-between mb-5'>
                    {!user ?

                      (<>
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-40" />
                          </div>
                        </div>
                      </>)
                      :
                      (<>
                        <div className='bg-[#ff832320] border-0 py-2 px-4 rounded-xl w-fit flex items-center gap-3 mx-auto md:mx-0'>
                          <div className='w-8 h-8 ' >
                            <img src={user?.photoURL} className='rounded-full' referrerPolicy="no-referrer" alt="" />
                          </div>
                          <div>
                            <h2 className=' text-md md:text-xl text-brand '>{user?.displayName}</h2>
                            <p className='text-black/70 text-sm md:text-md'>{user?.email}</p>
                          </div>
                        </div>
                      </>)
                    }

                    <div>
                      <Link to={'/dashboard/calculator'}>
                        <Button variant='primaryBtn' className='lg:h-12 md:h-11 mt-5 md:mt-0 mx-auto  rounded-full flex items-center'> <Plus /> Add a New Item</Button>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <TryItOut className='w-full' dashboard={true} />
                  </div>

                </div>

              </div>

              {/* MOBILE BOTTOM NAV */}
              <div>
                <MobileNav />
              </div>
            </div>

          </>)
      }

    </>
  )
}

export default Dashboard