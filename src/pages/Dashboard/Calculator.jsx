import BasicDetails from '@/components/dashboard-calculator/BasicDetails';
import { BudgetRule } from '@/components/dashboard-calculator/BudgetRule';
import Motive from '@/components/dashboard-calculator/Motive';
import LaptopNav from '@/components/dashboard/LaptopNav';
import MobileNav from '@/components/dashboard/MobileNav';
import MobileNavbar from '@/components/MobileNavbar';
import YourGoals from '@/components/dashboard-calculator/YourGoals';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from "@/components/ui/form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useNavigate } from 'react-router-dom';
import { useItems } from '@/context/ItemsContext';

const schema = z.object({
  itemName: z.string().min(1, "Field can't be empty").max(20).regex(/^[A-Za-z\s]+$/, "Only letters are allowed"),
  itemPrice: z.coerce.number().min(1, 'field cannot be empty').max(10000000000, 'value cannot be more than this'),
  monthlyIncome: z.coerce.number().min(1, 'field cannot be empty').max(10000000,'income cannot be more than this'),
  monthlyExpenses: z.coerce.number().min(1, 'field cannot be empty').max(100000, 'expenses cannot be more than this'),
  targetPrice: z.coerce.number().min(1, "field cannot be empty").max(10000000000, 'value cannot be more than this'),
  goalCategory: z.string().min(1, "Please select a category"),
  savingRate: z.number().min(10).max(100),
  motiveText: z.string().min(2, 'field cannot be empty or atleast write a word').regex(/^[A-Za-z\s]+$/, "Only letters are allowed"),
  budgetRule: z.string().optional().or(z.literal(""))
}).refine((data) => data.monthlyIncome > data.monthlyExpenses, {
  message: "Expenses cannot be greater than Income",
  path: ['monthlyExpenses'],
})

const Calculator = () => {

  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      itemName: "",
      itemPrice: "",
      monthlyIncome: "",
      monthlyExpenses: "",
      targetPrice: "",
      goalCategory: "",
      savingRate: 15,
      motiveText: "",
      budgetRule: "",
    },
  })

  const { addItem } = useItems()

  const onSubmit = async (data) => {
    const user = auth.currentUser
    if (!user) {
      console.error("User not logged in")
      navigate('/login')
      return
    }

    try {
      const docRef = await addDoc(collection(db, "users", user.uid, "items"), {
        ...data,
        createdAt: serverTimestamp(),
      })
      addItem({ id: docRef.id, ...data, createdAt: new Date() })
      form.reset()
      navigate('/dashboard/goals')
    } catch (error) {
      console.error("Error saving:", error)
    }
  }

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

        <div className='w-full lg:w-[84%] rounded-xl bg-white p-5 py-10 overflow-auto border-2 border-brand'>

          <div>
            <h1 className='text-3xl text-brand font-heading uppercase'>
              Add Item
            </h1>
            <p className='text-sm text-black/60 mb-5 md:text-lg'>
              Enter your full financial picture to see what you can afford.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <div className='lg:w-full flex flex-1 max-lg:flex-col justify-between gap-2'>
                <BasicDetails />
                <BudgetRule />
              </div>

              <div className='w-full mt-2 lg:flex gap-2'>
                <YourGoals />
                <Motive />
              </div>

              <Button
                type="submit"
                variant='primaryBtn'
                className='w-[50%] mx-auto block mt-6'
              >
                Add your item
              </Button>

            </form>
          </Form>

        </div>
      </div>

      <MobileNav />
    </div>
  )
}

export default Calculator