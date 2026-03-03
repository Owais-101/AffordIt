import { MessageCircleHeart } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useFormContext } from "react-hook-form";

const Motive = () => {

    const { control, watch } = useFormContext();
    const motiveValue = watch("motiveText") || "";

    return (
        <div className='w-full lg:w-[40%] lg:mt-0 mt-2 bg-card rounded-2xl px-6 py-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] border border-brand'>

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ff832320]">
                    <MessageCircleHeart className="w-4.5 h-4.5 text-brand" />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-card-foreground">Motive</h3>
                    <p className="text-sm text-muted-foreground">
                        Remind yourself why you are doing it
                    </p>
                </div>
            </div>

            {/* Textarea Field */}
            <FormField
                control={control}
                name="motiveText"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                className='h-40 border-brand'
                                placeholder='Type your reason here'
                                maxLength={100}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Character Counter */}
            <p className='mt-5'>
                Characters Remaining:&nbsp;
                <span
                    className={
                        motiveValue.length >= 75
                            ? "text-red-500"
                            : motiveValue.length >= 50
                                ? "text-yellow-500"
                                : "text-green-500"
                    }
                >
                    {100 - motiveValue.length}
                </span>
            </p>

        </div>
    )
}

export default Motive