import { useState } from 'react'
import HelpIcon from '@mui/icons-material/Help'
import SearchIcon from '@mui/icons-material/Search'
import BookOnlineIcon from '@mui/icons-material/BookOnline'
import PaymentIcon from '@mui/icons-material/Payment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import EmailIcon from '@mui/icons-material/Email'
import ChatIcon from '@mui/icons-material/Chat'

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const helpTopics = [
    {
      icon: <BookOnlineIcon />,
      title: 'Booking Help',
      articles: [
        'How to book a slot',
        'Cancellation policy',
        'Rescheduling a booking',
        'Booking confirmation',
      ],
    },
    {
      icon: <PaymentIcon />,
      title: 'Payments & Refunds',
      articles: [
        'Payment methods',
        'Refund process',
        'Payment issues',
        'Invoice & receipts',
      ],
    },
    {
      icon: <AccountCircleIcon />,
      title: 'Account Management',
      articles: [
        'Update profile',
        'Change password',
        'Delete account',
        'Privacy settings',
      ],
    },
    {
      icon: <HelpIcon />,
      title: 'General FAQ',
      articles: [
        'What is RoofTop Cricket?',
        'How it works',
        'Venue requirements',
        'Contact support',
      ],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl shadow-glow mb-4">
          <SupportAgentIcon className="text-surface-darker text-3xl" />
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
          How can we <span className="gradient-text">help you?</span>
        </h1>
        <p className="text-gray-400 mt-2">Search our knowledge base or browse topics below</p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-12 py-4 text-lg"
        />
      </div>

      {/* Help Topics */}
      <div className="grid md:grid-cols-2 gap-6">
        {helpTopics.map((topic) => (
          <div key={topic.title} className="card p-6 hover:border-accent-500/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center text-accent-400">
                {topic.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-100">{topic.title}</h3>
            </div>
            <ul className="space-y-2">
              {topic.articles.map((article) => (
                <li key={article}>
                  <button className="text-gray-400 hover:text-accent-400 transition-colors text-sm text-left w-full py-1">
                    → {article}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="card p-8 bg-gradient-to-br from-primary-800 to-surface-card text-center">
        <h3 className="text-xl font-display font-bold text-gray-100 mb-2">
          Still need help?
        </h3>
        <p className="text-gray-400 mb-6">Our support team is available 24/7</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:support@rooftopcricket.pk"
            className="btn-primary flex items-center gap-2"
          >
            <EmailIcon /> Email Support
          </a>
          <button className="btn-secondary flex items-center gap-2">
            <ChatIcon /> Live Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter
