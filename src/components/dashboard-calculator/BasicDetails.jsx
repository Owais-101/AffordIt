import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Banknote, Info, NotebookTabs } from 'lucide-react'

const schema = z.object({
    itemName: z.string().min(1, "field cant be empty").max(20, "Length exceeding"),
    itemPrice: z.coerce.number().min(1, 'field cant be empty').max(100000000000000, 'Enter a realistic amount'),
    monthlyIncome: z.coerce.number().min(1, "field cant be empty").max(100000000, "Enter a realistic amount"),
    monthlyExpenses: z.coerce.number().min(1, "field cant be empty")
}).refine((data) => data.monthlyIncome > data.monthlyExpenses, {
    message: "Expenses cannot be greater than Income",
    path: ['monthlyExpenses']
})

const BasicDetails = () => {

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

    // For realtime calculation of Disposable Income
    const monthlyIncome = form.watch('monthlyIncome')
    const monthlyExpenses = form.watch('monthlyExpenses')
    const disposableIncome = monthlyIncome && monthlyExpenses
        ? monthlyIncome - monthlyExpenses
        : 0


    const onSubmit = (data) => {
        const disposableIncome = data.monthlyIncome - data.monthlyExpenses
        const canAfford = data.itemPrice <= disposableIncome
        setResult({ disposableIncome, canAfford })
    }

    return (
        <Card className='border border-brand w-full lg:mx-0'>

            <CardHeader className='pb-0 flex items-center'>

                <div className='w-9 h-9 bg-[#ff832320] flex items-center justify-center rounded-full text-brand'>
                    <NotebookTabs className='w-4.5 h-4.5' />
                </div>
                <div>
                    <h1 className='font-semibold text-base'>Basic Details</h1>
                    <p className='text-muted-foreground text-sm'>Enter your basic details here</p>
                </div>

            </CardHeader>

            <CardContent >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        {/* Item Name + Item Price */}
                        <div className='flex gap-4 items-start w-full mb-5'>
                            <FormField
                                control={form.control}
                                name='itemName'
                                render={({ field }) => (
                                    <FormItem className='w-1/2'>
                                        <FormLabel>Name of the item</FormLabel>
                                        <FormControl>
                                            <Input className='w-full' type='text' placeholder='Name...' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='itemPrice'
                                render={({ field }) => (
                                    <FormItem className='w-1/2'>
                                        <FormLabel>Price of the item</FormLabel>
                                        <FormControl>
                                            <Input className='w-full' type='number' placeholder='Price...' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Monthly Income + Monthly Expenses */}
                        <div className='flex gap-4 items-start w-full mb-5'>
                            <FormField
                                control={form.control}
                                name='monthlyIncome'
                                render={({ field }) => (
                                    <FormItem className='w-1/2'>
                                        <FormLabel>Monthly Income</FormLabel>
                                        <FormControl>
                                            <Input className='w-full' type='number' placeholder='Income...' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='monthlyExpenses'
                                render={({ field }) => (
                                    <FormItem className='w-1/2'>
                                        <FormLabel>Monthly expenses</FormLabel>
                                        <FormControl>
                                            <Input className='w-full' type='number' placeholder='Expenses...' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </form>
                </Form>


            </CardContent>

            <div className='flex-col mt-10 pl-5' >
                <div className='flex gap-2 mb-2 '>
                    <Banknote size={17} />
                    <p className='text-sm md:text-md text-muted-foreground'>Disposable Income - <span className='text-sm text-black'>₹ {disposableIncome  ? disposableIncome : "..."}</span></p>
                </div>
                <div className='flex items-center gap-2 mb-2'>
                    <Info size={17} />
                    <p className='text-muted-foreground text-sm md:text-md ' > Disposable income = (Monthly income - Monthly expenses) </p>
                </div>
                <div className='flex items-center gap-2'>
                    <Info size={17} />
                    <p className='text-muted-foreground text-sm md:text-md ' > Saving rate will be calculated from your Disposable income. </p>
                </div>
            </div>
        </Card>
    )
}

export default BasicDetails