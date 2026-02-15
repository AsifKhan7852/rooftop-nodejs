import CheckIcon from '@mui/icons-material/Check'

const Subscription = () => {
    const subscriptionPlans = [
        {
            name: 'Monthly',
            price: 10000,
            originalPrice: 10000,
            period: '/month',
            discount: null,
            features: [
                'Unlimited slot listings',
                'Basic analytics dashboard',
                'Customer booking management',
                'Email support',
                'Mobile responsive dashboard',
            ],
            popular: false,
        },
        {
            name: 'Quarterly',
            price: 27000,
            originalPrice: 30000,
            period: '/3 months',
            discount: '10% OFF',
            features: [
                'Everything in Monthly',
                'Advanced analytics & reports',
                'Priority customer support',
                'Featured listing badge',
                'SMS notifications',
            ],
            popular: true,
        },
        {
            name: 'Annually',
            price: 96000,
            originalPrice: 120000,
            period: '/year',
            discount: '20% OFF',
            features: [
                'Everything in Quarterly',
                'Premium featured placement',
                'Dedicated account manager',
                'Custom branding options',
                'API access for integrations',
            ],
            popular: false,
        },
    ]

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
                    Subscription <span className="gradient-text">Plans</span>
                </h1>
                <p className="text-gray-400 mt-1">Manage your venue subscription</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
                {subscriptionPlans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`card p-5 relative ${plan.popular ? 'border-emerald-500 ring-1 ring-emerald-500/50' : ''
                            }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-surface-darker text-xs font-semibold px-3 py-1 rounded-full">
                                Most Popular
                            </div>
                        )}
                        {plan.discount && (
                            <div className="absolute top-3 right-3 bg-amber-500/20 text-amber-400 text-xs font-semibold px-2 py-0.5 rounded">
                                {plan.discount}
                            </div>
                        )}

                        <h3 className="text-lg font-semibold text-gray-100 mb-1">{plan.name}</h3>
                        <div className="mb-4">
                            <span className="text-2xl font-bold text-emerald-400">
                                Rs. {plan.price.toLocaleString()}
                            </span>
                            <span className="text-gray-500 text-sm">{plan.period}</span>
                            {plan.originalPrice !== plan.price && (
                                <div className="text-gray-500 text-xs line-through">
                                    Rs. {plan.originalPrice.toLocaleString()}
                                </div>
                            )}
                        </div>

                        <ul className="space-y-2 mb-5">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-xs text-gray-300">
                                    <CheckIcon className="text-emerald-400 text-sm flex-shrink-0 mt-0.5" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`w-full py-2.5 rounded-lg font-medium text-sm text-center block transition-all ${plan.popular
                                ? 'bg-emerald-500 text-surface-darker hover:bg-emerald-400'
                                : 'bg-primary-700 text-gray-100 hover:bg-primary-600'
                                }`}
                        >
                            Choose Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Subscription
