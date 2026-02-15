import { useState } from 'react'
import { toast } from 'react-toastify'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import SubjectIcon from '@mui/icons-material/Subject'
import SendIcon from '@mui/icons-material/Send'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsLoading(false)
    }, 1000)
  }

  const contactInfo = [
    { icon: <EmailIcon />, title: 'Email', value: 'support@rooftopcricket.pk', link: 'mailto:support@rooftopcricket.pk' },
    { icon: <PhoneIcon />, title: 'Phone', value: '+92 300 1234567', link: 'tel:+923001234567' },
    { icon: <LocationOnIcon />, title: 'Office', value: 'Karachi, Pakistan', link: '#' },
  ]

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-100 mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to us anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info) => (
              <a
                key={info.title}
                href={info.link}
                className="card p-6 flex items-center gap-4 hover:border-accent-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center text-accent-400 group-hover:bg-accent-500 group-hover:text-surface-darker transition-all">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">{info.title}</h3>
                  <p className="text-gray-100 font-medium">{info.value}</p>
                </div>
              </a>
            ))}

            {/* Map placeholder */}
            <div className="card h-48 overflow-hidden">
              <div className="w-full h-full bg-primary-800 flex items-center justify-center text-gray-500">
                <LocationOnIcon className="text-4xl" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-8 space-y-6">
              <h2 className="text-2xl font-display font-bold text-gray-100 mb-2">Send us a Message</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Your Name</label>
                  <div className="relative">
                    <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                <div className="relative">
                  <SubjectIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="input-field min-h-[150px] resize-none"
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
                <SendIcon fontSize="small" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
