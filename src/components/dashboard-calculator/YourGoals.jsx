import { useFormContext } from 'react-hook-form'
import { Car, Bike, Home, Plane, GraduationCap, Smartphone, Heart, Building2, Shirt, Gamepad2, Dumbbell, Utensils, Goal, Info } from 'lucide-react'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'

const categories = [
  { id: 'Car', label: 'Car', icon: Car },
  { id: 'Bike', label: 'Bike', icon: Bike },
  { id: 'Home', label: 'Home', icon: Home },
  { id: 'Travel', label: 'Travel', icon: Plane },
  { id: 'Education', label: 'Education', icon: GraduationCap },
  { id: 'Phone', label: 'Phone', icon: Smartphone },
  { id: 'Wedding', label: 'Wedding', icon: Heart },
  { id: 'Property', label: 'Property', icon: Building2 },
  { id: 'Fashion', label: 'Fashion', icon: Shirt },
  { id: 'Gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'Fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'Food', label: 'Food', icon: Utensils },
]

const YourGoals = () => {

  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()

  const selectedCategory = watch("goalCategory")
  // const savingRate = watch("savingRate") || 15

  // const min = 10
  // const max = 100

  return (
    <div className='w-full lg:w-[60%] bg-card rounded-2xl px-6 py-5 shadow border border-brand'>

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ff832320]">
          <Goal className="w-4.5 h-4.5 text-brand" />
        </div>
        <div>
          <h3 className="text-base font-semibold">
            What's your goal
          </h3>
          <p className="text-sm text-muted-foreground">
            Tell us more about your savings goal
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className='flex flex-wrap gap-2 mb-2'>
        {categories.map((item) => {
          const Icon = item.icon
          const isActive = selectedCategory === item.id

          return (
            <div
              key={item.id}
              onClick={() => {
                setValue("goalCategory", item.id)
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer border transition
                ${isActive
                  ? 'bg-[#ff832320] text-brand border-brand'
                  : 'text-muted-foreground border-brand hover:bg-[#ff832320] hover:text-brand'
                }`}
            >
              <Icon size={15} />
              <p className='text-xs'>{item.label}</p>
            </div>
          )
        })}
      </div>

      {/* Category Error */}
      {errors.goalCategory && (
        <p className="text-sm text-red-500 mb-3">
          {errors.goalCategory.message}
        </p>
      )}

      {/* Target Price */}
      <p className='text-sm font-medium mt-10'>Target Price</p>

      <FormField
        control={control}
        name='targetPrice'
        render={({ field }) => (
          <FormItem className='w-1/2'>
            <FormControl>
              <Input
                type='number'
                placeholder='e.g. 50000'
                className='w-full mb-5'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Saving Rate Slider */}
      {/* <div className='flex justify-between'>
        <p className='text-sm mb-3'>Saving Rate</p>
        <p className='text-sm font-bold text-brand'>{savingRate}%</p>
      </div> */}

      {/* <Slider
        min={min}
        max={max}
        step={1}
        value={[savingRate]}
        onValueChange={(val) =>
          setValue("savingRate", val[0], {
            shouldValidate: true,
            shouldDirty: true
          })
        }
      /> */}

      {/* <div className='flex justify-between mt-3'>
        <p className='text-black/60 text-sm font-semibold'>{min}%</p>
        <p className='text-black/60 text-sm font-semibold'>{max}%</p>
      </div>

      <div className='flex items-center gap-2 mt-5'>
        <Info size={17} />
        <p className='text-muted-foreground text-sm md:text-md'>
          Saving rate will be calculated based on your Disposable income.
        </p>
      </div> */}

    </div>
  )
}

export default YourGoals