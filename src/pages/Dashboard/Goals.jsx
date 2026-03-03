import LaptopNav from '@/components/dashboard/LaptopNav';
import MobileNav from '@/components/dashboard/MobileNav';
import MobileNavbar from '@/components/MobileNavbar';
import Navbar from '@/components/Navbar';
import { useItems } from '@/context/ItemsContext'
import React, { useEffect, useState } from 'react'
import { Car, Bike, Home, Plane, GraduationCap, Smartphone, Heart, Building2, Shirt, Gamepad2, Dumbbell, Utensils, Target, HandCoins, PiggyBank } from 'lucide-react';
import logo from '../../assets/images/logo.png'
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"













const Goals = () => {

    const { items } = useItems();
    const navigate = useNavigate();

    useEffect(() => {
        if (!items) {
            console.error("no user found")
        } else {
            console.log("user found", items);


        }
    }, [])

    const iconMap = {
        car: Car,
        bike: Bike,
        home: Home,
        travel: Plane,
        education: GraduationCap,
        phone: Smartphone,
        wedding: Heart,
        property: Building2,
        fashion: Shirt,
        gaming: Gamepad2,
        fitness: Dumbbell,
        food: Utensils,
    }


    const calculateProgress = (item) => {
        const disposableIncome = item.monthlyIncome - item.monthlyExpenses
        const monthlySavings = disposableIncome * (item.savingRate / 100)
        const createdAt = item.createdAt?.toDate()
        const now = new Date()
        const monthsPassed = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24 * 30))
        const savedSoFar = monthlySavings * monthsPassed
        const progress = Math.min(Math.round((savedSoFar / item.targetPrice) * 100), 100)
        const totalMonths = Math.ceil(item.targetPrice / monthlySavings)
        const monthsRemaining = Math.max(totalMonths - monthsPassed, 0)
        console.log(progress);

        return { progress, monthsRemaining }
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

                {/* Main Content Div */}
                <div className='w-full lg:w-[84%] rounded-xl bg-white p-5 py-10 overflow-auto border-3 border-brand'>

                    <div>
                        <h1 className='text-3xl text-brand font-heading uppercase'>
                            Goals
                        </h1>
                        <p className='text-sm text-black/60 mb-5 md:text-lg'>
                            Track your goals from here and crush them
                        </p>
                    </div>

                    {/* card */}

                    {items.length < 1
                        ?
                        <div className='w-full h-[88%] flex flex-col justify-center items-center' >

                            <h2 className='text-2xl md:text-3xl uppercase mb-2'>No items yet</h2>
                            <Button onClick={() => navigate('/dashboard/calculator')} variant='primaryBtn' className='md:text-xl py-5 px-10'>Add Item</Button>

                        </div>
                        :

                        <div className=' w-full grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            {items.map((item, idx) => {
                                const Icon = iconMap[item?.goalCategory?.toLowerCase()];
                                const { progress, monthsRemaining } = calculateProgress(item);

                                return <div className='  border rounded-xl mb-4 overflow-hidden'>
                                    <div className='w-[98%] bg-[#ff832320] mx-auto rounded-xl mt-1 px-5 py-4 flex'>
                                        <div className='w-[80%]  pr-2'>
                                            <div className='w-8 h-8 flex justify-center items-center bg-orange-400/30 rounded-full mb-5 '>
                                                {Icon ? <Icon key={idx} size={20} className=' text-brand w-4.5 h-4.5' /> : null}
                                            </div>
                                            <div>
                                                <h1 className='text-lg md:text-xl'>{item?.itemName}</h1>
                                                <p className='text-xs md:text-base text-muted-foreground mb-5'>"{item?.motiveText}"</p>
                                                <div className='flex flex-col gap-3'>
                                                    <div className='flex  gap-2'>
                                                        <Target className='text-brand' />
                                                        <p>${item?.targetPrice} Target Price</p>
                                                    </div>

                                                    <div className='flex gap-2'>
                                                        <PiggyBank className='text-brand' />
                                                        <p className=''>{item?.savingRate}% Saving Rate</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='mt-10 flex justify-between'>
                                                <p>Progress</p>
                                                <span>{progress}%</span>
                                            </div>
                                            <Progress value={progress} className={` ${progress < 50 ? `[&>div]:bg-red-500` : `[&>div]:bg-green-500`} `} />
                                        </div>

                                        <div className='w-[20%] flex justify-center' >
                                            <img src={logo} alt="logo" className=' h-16 md:h-24 lg:h-32' />
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center mt-5 mb-2 md:mb-4 px-3'>
                                        <p className='bg-[#ff832326] px-5 py-1 rounded-md border text-sm'>
                                            {item?.createdAt?.toDate?.()?.toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            }) || 'Just now'}
                                        </p>
                                        <div className='flex gap-2'>
                                            <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <Button variant="default" className='bg-green-500 text-white'>Add Money</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-sm">
                                                        <DialogHeader>
                                                            <DialogTitle>SAVING</DialogTitle>
                                                            <DialogDescription>
                                                                Add money to see your progess.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <FieldGroup>
                                                            <Field>
                                                                <Input id="name-1" name="name" defaultValue="" placeholder='eg. $500' />
                                                            </Field>
                                                        </FieldGroup>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </DialogClose>
                                                            <Button type="submit" className='bg-green-500 text-white'>ADD</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog>


                                            <Button variant='destructive' >Delete</Button>
                                        </div>

                                    </div>

                                    <p className='text-sm md:text-base mb-5 px-5'>Months Remaining: {monthsRemaining}</p>

                                </div>
                            })}
                        </div>
                    }

                </div>
            </div>

            <MobileNav />
        </div>

    )
}

export default Goals