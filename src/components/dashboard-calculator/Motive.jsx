import { MessageCircleHeart } from 'lucide-react'
import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

const schema = z.object({
    motiveText: z.string().min(2, 'Atleast write a word').max(200, 'Too long')
})

const Motive = () => {
    const [remainingText, setRemainingText] = useState("")

    console.log(remainingText.length);


    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            motiveText: ''
        }
    })


    return (
        <div className='w-full lg:w-[40%] bg-card rounded-2xl px-6 py-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] border border-brand md:mt-0'>

            <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ff832320]">
                    <MessageCircleHeart className="w-4.5 h-4.5 text-brand" />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-card-foreground">Motive</h3>
                    <p className="text-sm text-muted-foreground">Remind yourself why you are doing it</p>
                </div>
            </div>

            <Form {...form}>
                <form>
                    <FormField
                        control={form.control}
                        name='motiveText'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        className='h-52 border-brand'
                                        placeholder='Type your reason here'
                                        {...field}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 100) {
                                                field.onChange(e)
                                                setRemainingText(e.target.value);
                                            }
                                        }}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <p className='mt-5'>Chracters Remaining :&nbsp;   
                <span className={`${(
                    remainingText.length >= 50 && remainingText.length < 75) ? `text-brand`
                    :
                    (remainingText.length >= 75) ? `text-red-500`
                        :
                    `text-green-500`} `}>
                    {100 - remainingText.length}
                </span></p>

        </div >
    )
}

export default Motive