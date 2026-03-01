import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
// import { SignupForm } from './SignUpForm'
import { Link } from 'react-router-dom'

const schema = z.object({
    income: z.coerce.number().min(1, 'Income is required'),
    expenses: z.coerce.number().min(0, 'Expenses cannot be negative'),
    itemPrice: z.coerce.number().min(1, 'Item price is required'),
}).refine((data) => data.expenses < data.income, {
    message: 'Expenses cannot be greater or same than income',
    path: ['expenses'],
})

const TryItOut = ({ dashboard }) => {

    const [result, setResult] = useState(null);


    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            income: '',
            expenses: '',
            itemPrice: '',
        },
    })

    const itemPrice = form.watch("itemPrice");

    const onSubmit = (data) => {
        const disposable = data.income - data.expenses;
        const canAfford = data.itemPrice <= disposable;
        setResult({ canAfford, disposable, itemPrice: data.itemPrice });
    }

    return (

        <>
            <Card className={`max-w-md w-[90%] `}>
                <CardHeader>
                    {dashboard
                        ?
                        <h1 className='text-xl text-brand text-center font-semibold border-b pb-1' >Check or Add your item</h1>
                        :
                        <>
                            <h1 className='text-center font-sans font-bold text-md lg:text-2xl text-brand'>Try It Out</h1>
                            <p className='text-center mb-4 text-fontBrand text-sm' >For more features, please <Link className='hover:text-brand transition-colors duration-300' to={'/signup'}>login</Link></p>
                            <CardTitle className=' text-md md:text-lg text-fontBrand '>Can You Afford It?</CardTitle>
                            <CardDescription className=' text-sm md:text-md  text-black'>Enter your details to find out</CardDescription>
                        </>
                    }
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                            <FormField
                                control={form.control}
                                name='income'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Monthly Income (₹)</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder='e.g. 3000' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='expenses'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Monthly Expenses (₹)</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder='e.g. 1500' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='itemPrice'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item Price (₹)</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder='e.g. 500' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Result */}
                            {result && (
                                <div className={`rounded-lg p-4 text-center ${result.canAfford ? 'bg-green-300/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {result.canAfford ? (
                                        <>
                                            <p className='text-sm font-semibold'>✅ You can afford it, Check another</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className='text-sm font-semibold'> ❌ You can't afford it yet.</p>
                                        </>
                                    )}
                                </div>
                            )}

                            {result && !result.canAfford && Number(itemPrice) > result.disposable
                                ? <Link to={'/dashboard/calculator'} >
                                    <Button type='submit' variant='primaryBtn' className='w-full'>
                                        Add Item to Tracker
                                    </Button>
                                </Link>
                                : <Button type='submit' variant='primaryBtn' className='w-full'>
                                    Check Affordability
                                </Button>
                            }


                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>

    )
}

export default TryItOut

// class="p-8 bg-radial-[circle_at_top_center] from-25% to-brand-secondary/50 rounded-xl col-span-full"