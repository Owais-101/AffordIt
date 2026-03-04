import { Calculator, Target, PiggyBank, TrendingUp, ShieldCheck, Zap } from 'lucide-react'

const features = [
  {
    icon: Calculator,
    title: 'Smart Affordability Calculator',
    description: 'Enter your income, expenses, and savings rate — AffordIt instantly tells you if you can afford it now or exactly how long it will take to save up.',
    color: '#ff8323',
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set financial goals for anything — a car, phone, vacation, or home. Track your progress in real time and stay motivated every step of the way.',
    color: '#22c55e',
  },
  {
    icon: PiggyBank,
    title: 'Add Money & Watch It Grow',
    description: 'Manually add money to your goals as you save. Watch your progress bar fill up and see exactly how many months are left to reach your target.',
    color: '#3b82f6',
  },
  {
    icon: TrendingUp,
    title: 'Budget Rule Presets',
    description: 'Choose from proven budgeting frameworks like 50/30/20, 60/20/20, or set a custom saving rate — tailored to your unique financial situation.',
    color: '#a855f7',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    description: 'Your financial data is stored securely using Firebase, backed by Google infrastructure. We never share or sell your personal information.',
    color: '#f43f5e',
  },
  {
    icon: Zap,
    title: 'Instant Analytics',
    description: 'Get a full picture of your finances — income vs expenses, savings potential, category breakdowns, and goal progress all in one place.',
    color: '#ff8323',
  },
]

const Features = () => {
  return (
    <section className='w-full py-20 bg-white'>
      <div className='container mx-auto px-5'>

        {/* Header */}
        <div className='text-center mb-14'>
          <span className='inline-block bg-[#ff832320] text-brand text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-brand/20'>
            Why AffordIt?
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4'>
            Everything you need to <br />
            <span className='text-brand'>spend smarter</span>
          </h2>
          <p className='text-muted-foreground text-base md:text-lg max-w-xl mx-auto'>
            AffordIt gives you the tools to make confident financial decisions — no guesswork, no regret.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className='group relative border border-gray-100 rounded-2xl p-6 hover:border-brand hover:shadow-[4px_4px_0px_0px_#ff8323] transition-all duration-300 hover:-translate-y-1 bg-white cursor-default'
              >
                {/* Icon */}
                <div
                  className='w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300'
                  style={{ background: feature.color + '15' }}
                >
                  <Icon size={22} style={{ color: feature.color }} />
                </div>

                {/* Text */}
                <h3 className='text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors'>
                  {feature.title}
                </h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  {feature.description}
                </p>

                {/* Corner accent */}
                <div
                  className='absolute top-0 right-0 w-16 h-16 rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  style={{ background: feature.color + '10' }}
                />
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Features
