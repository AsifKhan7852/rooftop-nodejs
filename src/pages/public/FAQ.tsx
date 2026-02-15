import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      category: 'Booking',
      questions: [
        {
          q: 'How do I book a slot at a rooftop cricket venue?',
          a: 'Simply browse our available venues, select your preferred rooftop, choose a date and time slot, and complete the payment. You\'ll receive instant confirmation via email and SMS.',
        },
        {
          q: 'Can I cancel or reschedule my booking?',
          a: 'Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled time. Go to "My Bookings" in your dashboard to manage your reservations.',
        },
        {
          q: 'What payment methods are accepted?',
          a: 'We accept all major payment methods including credit/debit cards, JazzCash, EasyPaisa, and bank transfers for your convenience.',
        },
        {
          q: 'How far in advance can I book a slot?',
          a: 'You can book slots up to 30 days in advance. We recommend booking early, especially for weekends and popular venues.',
        },
      ],
    },
    {
      category: 'Venues',
      questions: [
        {
          q: 'Are the venues verified?',
          a: 'Yes, all rooftop cricket venues on our platform are verified for quality, safety, and equipment standards before being listed.',
        },
        {
          q: 'What amenities are typically available at venues?',
          a: 'Most venues offer cricket equipment (bats, balls, stumps), nets, proper lighting, seating areas, and some have refreshment facilities.',
        },
        {
          q: 'Can I visit a venue before booking?',
          a: 'Absolutely! You can contact venue owners directly through our platform to arrange a visit before making a booking.',
        },
      ],
    },
    {
      category: 'For Venue Owners',
      questions: [
        {
          q: 'How can I register my rooftop cricket venue?',
          a: 'Click on "Register Your Venue" and fill out the registration form with your details, venue information, photos, and pricing. Our team will review and approve your listing within 24-48 hours.',
        },
        {
          q: 'What commission does RoofTop Cricket charge?',
          a: 'We charge a minimal commission on each booking. Contact our sales team for detailed pricing information based on your venue and location.',
        },
        {
          q: 'How do I manage my bookings?',
          a: 'Once registered, you\'ll have access to an admin dashboard where you can manage bookings, create slots, view reports, and handle customer inquiries.',
        },
      ],
    },
    {
      category: 'Account & Support',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on "Sign Up" at the top right corner of the page. You can register using your email or phone number, or sign up with Google for quick access.',
        },
        {
          q: 'I forgot my password. How can I reset it?',
          a: 'Click on "Forgot Password" on the login page and enter your registered email. You\'ll receive a password reset link within a few minutes.',
        },
        {
          q: 'How can I contact customer support?',
          a: 'You can reach us via email at support@rooftopcricket.pk, call us at +92 300 1234567, or use the contact form on our Contact Us page.',
        },
      ],
    },
  ]

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-100 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-lg text-gray-400">
            Find answers to common questions about RoofTop Cricket
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-12">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12 py-4 text-lg"
          />
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {filteredFaqs.map((category, categoryIndex) => (
            <div key={category.category}>
              <h2 className="text-xl font-display font-semibold text-accent-400 mb-4">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex
                  const isOpen = openIndex === globalIndex
                  
                  return (
                    <div
                      key={faqIndex}
                      className="card overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-primary-700/30 transition-colors"
                      >
                        <span className="font-medium text-gray-100 pr-4">{faq.q}</span>
                        <ExpandMoreIcon
                          className={`text-accent-400 flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-gray-400 animate-fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 card p-8 text-center bg-gradient-to-br from-primary-800 to-surface-card">
          <h3 className="text-2xl font-display font-bold text-gray-100 mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-400 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a href="/contact" className="btn-primary inline-flex">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQ
