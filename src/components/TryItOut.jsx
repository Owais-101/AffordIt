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
import { SignupForm } from './SignUpForm'
import { Link } from 'react-router-dom'

const schema = z.object({
    income: z.coerce.number().min(1, 'Income is required'),
    expenses: z.coerce.number().min(0, 'Expenses cannot be negative'),
    itemPrice: z.coerce.number().min(1, 'Item price is required'),
}).refine((data) => data.expenses < data.income, {
    message: 'Expenses cannot be greater or same than income',
    path: ['expenses'],
})

const TryItOut = () => {
    const [savingPercent, setSavingPercent] = useState(20)
    const [result, setResult] = useState(null)

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            income: '',
            expenses: '',
            itemPrice: '',
        },
    })

    const onSubmit = (data) => {
        const disposable = data.income - data.expenses
        const canAfford = data.itemPrice <= disposable
        const monthsToSave = canAfford
            ? 0
            : Math.ceil(data.itemPrice / (disposable * (savingPercent / 100)))

        setResult({ canAfford, disposable, monthsToSave, itemPrice: data.itemPrice })
    }

    const handleSliderChange = (val) => {
        setSavingPercent(val[0])
        if (result && !result.canAfford) {
            const monthsToSave = Math.ceil(result.itemPrice / (result.disposable * (val[0] / 100)))
            setResult(prev => ({ ...prev, monthsToSave }))
        }
    }

    return (
        <div className=' border bg-[linear-gradient(145deg,#ffffff08_0%,#ff832312_50%,#ffffff05_100%)] rounded-xl py-10 mx-2 mb-5 '>
            <h1 className='text-center font-sans font-bold mb-2 text-2xl lg:text-3xl text-brand'>Try It Out</h1>
            <p className='text-center mb-4 text-fontBrand' >For more features, please <Link className='hover:text-brand transition-colors duration-300' to={'/signup'}>login</Link></p>
            <Card className='max-w-md mx-auto w-[90%]'>
                <CardHeader>
                    <CardTitle className=' text-lg md:text-2xl text-fontBrand '>Can You Afford It?</CardTitle>
                    <CardDescription className=' text-sm md:text-xl'>Enter your details to find out</CardDescription>
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

                            {/* Slider - only shows after failed result */}
                            {result && !result.canAfford && (
                                <div className='flex flex-col gap-2'>
                                    <FormLabel>Saving Rate: {savingPercent}% of disposable income</FormLabel>
                                    <Slider
                                        min={5}
                                        max={50}
                                        step={5}
                                        value={[savingPercent]}
                                        onValueChange={handleSliderChange}
                                    />
                                </div>
                            )}

                            <Button type='submit' className='w-full'>
                                Check Affordability
                            </Button>

                            {/* Result */}
                            {result && (
                                <div className={`rounded-lg p-4 text-center ${result.canAfford ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {result.canAfford ? (
                                        <>
                                            <p className='text-xl font-bold'>✅ You can afford it!</p>
                                            <p className='text-sm mt-1'>You have ${result.disposable} disposable income this month.</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className='text-xl font-bold'>❌ You can't afford it yet.</p>
                                            <p className='text-sm mt-1'>Your disposable income is ₹{result.disposable}.</p>
                                            <p className='text-sm mt-1'>
                                                Saving <strong>{savingPercent}%</strong> monthly, you'll afford it in{' '}
                                                <strong>{result.monthsToSave} month{result.monthsToSave > 1 ? 's' : ''}</strong>.
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default TryItOut

// class="p-8 bg-radial-[circle_at_top_center] from-25% to-brand-secondary/50 rounded-xl col-span-full"