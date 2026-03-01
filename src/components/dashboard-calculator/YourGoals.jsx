import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Car, Bike, Home, Plane, GraduationCap, Smartphone, Heart, Building2, Shirt, Gamepad2, Dumbbell, Utensils, Goal } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'

const schema = z.object({
    targetPrice: z.coerce.number().min(1, 'Target price is required').max(100000000, 'Enter a realistic amount'),
})

const categories = [
    { id: 'car', label: 'Car', icon: Car },
    { id: 'bike', label: 'Bike', icon: Bike },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'travel', label: 'Travel', icon: Plane },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'phone', label: 'Phone', icon: Smartphone },
    { id: 'wedding', label: 'Wedding', icon: Heart },
    { id: 'property', label: 'Property', icon: Building2 },
    { id: 'fashion', label: 'Fashion', icon: Shirt },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'food', label: 'Food', icon: Utensils },
]

const GoalSelector = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sliderValue, setSliderValue] = useState([15]);
    const min = 10;
    const max = 100;

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            targetPrice: '',
        },
    })

    const onSubmit = (data) => {
        console.log({ category: selectedCategory, ...data })
    }

    return (
        <div className='w-full lg:w-[33%] bg-card rounded-2xl px-6 py-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] border border-brand md:mt-0'>

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ff832320]">
                    <Goal className="w-4.5 h-4.5 text-brand" />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-card-foreground">What's your goal</h3>
                    <p className="text-sm text-muted-foreground">Tell us more about your savings goal</p>
                </div>
            </div>

            {/* Categories */}
            <div className='flex flex-wrap gap-2 mb-4'>
                {categories.map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedCategory(item.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer border transition-all duration-200
              ${selectedCategory === item.id
                                ? 'bg-[#ff832320] text-brand border-brand'
                                : 'text-muted-foreground border-brand hover:bg-[#ff832320] hover:text-brand'
                            }`}>
                        <item.icon size={15} />
                        <p className='text-xs'>{item.label}</p>
                    </div>
                ))}
            </div>

            {/* Target Price */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <p className='text-sm font-medium mb-1'>Target Price</p>
                    <FormField
                        control={form.control}
                        name='targetPrice'
                        render={({ field }) => (
                            <FormItem className='w-1/2'>
                                <FormControl>
                                    <Input type='number' placeholder='e.g. 50000' className='w-full mb-5' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <div className='flex justify-between'>
                <p className='text-sm mb-3' >Saving Rate</p>
                <p className='text-sm font-bold text-brand' >{sliderValue}%</p>
            </div>
            <Slider
                min={min}
                max={max}
                step={1}
                defaultValue={[15]}
                value={sliderValue}
                onValueChange={setSliderValue}
            />
            <div className='flex justify-between mt-3' >
                <p className='text-black/60 text-sm font-semibold'>{min}%</p>
                <p className='text-black/60 text-sm font-semibold'>{max}%</p>
            </div>

        </div>
    )
}

export default GoalSelector