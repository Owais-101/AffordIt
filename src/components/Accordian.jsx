import React from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
    {
        value: "how-it-works",
        trigger: "How does AffordIt work?",
        content: "AffordIt analyzes your monthly income, expenses, and savings rate to determine whether you can afford a specific item. Simply enter your financial details, choose a budgeting rule, and we'll tell you if you can afford it now — or how long it will take to save up.",
    },
    {
        value: "budget-rules",
        trigger: "What are budget rules and which one should I use?",
        content: "Budget rules are proven financial frameworks that help you allocate your income wisely. We support the 50/30/20 rule, the 10% rule, and more. If you're just starting out, we recommend the 50/30/20 rule — it's the most balanced and widely used approach.",
    },
    {
        value: "goals",
        trigger: "How do savings goals work?",
        content: "When you can't afford an item right away, AffordIt calculates exactly how many months it will take to save up based on your saving rate. You can track your progress, add money as you save, and mark goals as complete once you've reached your target.",
    },
    {
        value: "data-security",
        trigger: "Is my financial data secure?",
        content: "Yes. Your data is stored securely using Firebase, backed by Google's infrastructure. We never share or sell your personal financial information to any third party.",
    },
    {
        value: "free",
        trigger: "Is AffordIt free to use?",
        content: "AffordIt offers a free plan that includes the core affordability calculator. Create a free account to unlock goal tracking, savings progress, and more advanced budgeting features.",
    },
    {
        value: "delete",
        trigger: "Can I delete my goals or data?",
        content: "Absolutely. You have full control over your data. You can delete individual goals at any time from your Goals dashboard.",
    },
]

export function FaqAccordion() {
    return (
        <div className="h-screen w-full flex flex-col gap-5 justify-center items-center hero-bg">
            <h1 className=" text-lg lg:text-2xl font-semibold bg-[#ff832320] text-brand px-5 py-3 rounded-full">Frequently Asked Questions</h1>
            <Accordion
                type="single"
                collapsible
                className="lg:w-[35%] md:w-[80%] rounded-lg border bg-white"
                defaultValue="billing"
            >
                {faqItems.map((item) => (
                    <AccordionItem
                        key={item.value}
                        value={item.value}
                        className="border-b px-4 last:border-b-0 "
                    >
                        <AccordionTrigger className='lg:text-xl font-semibold hover:text-brand hover:no-underline'>{item.trigger}</AccordionTrigger>
                        <AccordionContent className='lg:text-xl '>{item.content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className='max-w-3xl mx-auto px-6 pb-10 text-center mt-10'>
                <p className='text-xs text-muted-foreground'>© 2026 AffordIt. All rights reserved.</p>
            </div>
        </div>
    )
}