import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { z } from 'zod'
import { useForm, } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const schema = z.object({
    itemName: z.string().min(1, "field cant be empty").max(20, "Length exceeding"),
    itemPrice: z.coerce.number().min(1, 'field cant be empty').max(100000000000000, 'Enter a realistic amount'),
    monthlyIncome: z.coerce.number().min(1, "field cant be empty").max(100000000, "Enter a realistic amount"),
    monthlyExpenses: z.coerce.number().min(1, "field cant be empty")
}).refine((data) => data.monthlyIncome > data.monthlyExpenses, {
    message: "Expenses cannot be greater than Income",
    path: ['monthlyExpenses']
})


const CalculatorPro = () => {

    const [result, setResult] = useState(null);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            itemName: '',
            itemPrice: '',
            monthlyIncome: '',
            monthlyExpenses: ''
        },
    })

    const onSubmit = ({ monthlyIncome, monthlyExpenses, itemPrice }) => {
        const disposableIncome = monthlyIncome - monthlyExpenses;
        const canAfford = itemPrice <= disposableIncome;
        setResult({ disposableIncome, canAfford });
    }

    useEffect(() => {
        console.log(result);
    }, [result])

    return (

        <Card className='lg:w-[35%] md:w-[80%] md:mx-auto lg:mx-0 '>

            <CardHeader>
                <div className='text-center'>
                    <h2 className='text-brand'>Affordablity Calculator</h2>
                    <p className='border-b text-black/60 text-sm'>"Can you afford it? Let's find out"</p>
                </div>
            </CardHeader>

            <CardContent>
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div className='md:flex justify-center md:gap-10 items-center w-full mb-5'>
                            <FormField
                                control={form.control}
                                name='itemName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel style={{ color: '#6b7280' }}>Name of the item</FormLabel>
                                        <FormControl>
                                            <Input className='w-full mb-5 md:mb-0' type='text' placeholder='Name...' {...field} />
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
                                        <FormLabel style={{ color: '#6b7280' }}>Price of the item</FormLabel>
                                        <FormControl>
                                            <Input className='w-full' type='number' placeholder='Price...' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='md:flex justify-center md:gap-10 items-center w-full mb-5'>
                            <FormField
                                control={form.control}
                                name='monthlyIncome'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel style={{ color: '#6b7280' }}>Monthly Income</FormLabel>
                                        <FormControl>
                                            <Input className='w-full mb-5 md:mb-0' type='number' placeholder='Income...' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='monthlyExpenses'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel style={{ color: '#6b7280' }}>Monthly expenses</FormLabel>
                                        <FormControl>
                                            <Input className='w-full' type='number' placeholder='Expenses...' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {result && (
                            <div>
                                {result.canAfford
                                    ?
                                    <div>
                                        <h1 className='bg-green-500/20 text-center py-2 rounded-xl text-green-600 border border-green-600'> ✅ You can afford this item! <br /> Check another... </h1>
                                    </div>
                                    :
                                    <div>
                                        <h1 className='bg-red-500/20 text-center py-2 rounded-xl text-red-500 border border-red-500'> ❌ You can't afford this item, <br /> add it to the tracker </h1>
                                    </div>
                                }
                            </div>
                        )}

                        {!result || result.canAfford
                            ? <Button className='mt-5' type='submit' variant='primaryBtn'>Check</Button>
                            : <Link to={'/dashboard/calculator'}>
                                <Button className='mt-5' variant='primaryBtn' type='button'>ADD</Button>
                            </Link>
                        }


                    </form>

                </Form>
            </CardContent>



        </Card>

    )
}

export default CalculatorPro