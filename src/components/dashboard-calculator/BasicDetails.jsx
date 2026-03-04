import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Banknote, Info, NotebookTabs } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

const BasicDetails = () => {

    const { control, watch } = useFormContext()

    const monthlyIncome = watch('monthlyIncome')
    const monthlyExpenses = watch('monthlyExpenses')

    const disposableIncome =
        monthlyIncome && monthlyExpenses
            ? monthlyIncome - monthlyExpenses
            : 0

    return (
        <Card className='border border-brand w-full lg:mx-0'>

            <CardHeader className='pb-0 flex items-center'>
                <div className='w-9 h-9 bg-[#ff832320] flex items-center justify-center rounded-full text-brand'>
                    <NotebookTabs className='w-4.5 h-4.5' />
                </div>
                <div>
                    <h1 className='font-semibold text-base'>Basic Details</h1>
                    <p className='text-muted-foreground text-sm'>
                        Enter your basic details here
                    </p>
                </div>
            </CardHeader>

            <CardContent>

                {/* Item Name + Item Price */}
                <div className='flex gap-4 items-start w-full mb-5'>
                    <FormField
                        control={control}
                        name='itemName'
                        render={({ field }) => (
                            <FormItem className='w-1/2'>
                                <FormLabel>Name of the item</FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        placeholder='Name...'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name='itemPrice'
                        render={({ field }) => (
                            <FormItem className='w-1/2'>
                                <FormLabel>Price of the item ₹</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='Price...'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Monthly Income + Monthly Expenses */}
                <div className='flex gap-4 items-start w-full mb-5'>
                    <FormField
                        control={control}
                        name='monthlyIncome'
                        render={({ field }) => (
                            <FormItem className='w-1/2'>
                                <FormLabel>Monthly Income ₹</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='Income...'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name='monthlyExpenses'
                        render={({ field }) => (
                            <FormItem className='w-1/2'>
                                <FormLabel>Monthly expenses ₹</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='Expenses...'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

            </CardContent>

            {/* Disposable Income Display */}
            <div className='flex-col mt-10 pl-5'>
                <div className='flex gap-2 mb-2'>
                    <Banknote size={17} />
                    <p className='text-sm md:text-md text-muted-foreground'>
                        Disposable Income : &nbsp;
                        <span className='text-sm text-black'>
                            ₹ {disposableIncome ? disposableIncome : "..."}
                        </span>
                    </p>
                </div>

                <div className='flex items-center gap-2 mb-2'>
                    <Info size={17} />
                    <p className='text-muted-foreground text-sm md:text-md'>
                        Disposable income : (Monthly income - Monthly expenses)
                    </p>
                </div>

                
            </div>

        </Card>
    )
}

export default BasicDetails