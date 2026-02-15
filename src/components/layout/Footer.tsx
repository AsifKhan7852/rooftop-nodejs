import { Link } from 'react-router-dom'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/#about' },
      { name: 'Contact', path: '/#contact' },
      { name: 'Careers', path: '#' },
    ],
    support: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Help Center', path: '/help' },
      { name: 'Terms', path: '/terms' },
    ],
    forOwners: [
      { name: 'Register Venue', path: '/signup' },
      { name: 'Pricing', path: '/#pricing' },
    ],
  }

  const socialLinks = [
    { icon: <FacebookIcon fontSize="small" />, url: '#', label: 'Facebook' },
    { icon: <TwitterIcon fontSize="small" />, url: '#', label: 'Twitter' },
    { icon: <InstagramIcon fontSize="small" />, url: '#', label: 'Instagram' },
    { icon: <LinkedInIcon fontSize="small" />, url: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-surface-dark border-t border-primary-700/30">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <SportsCricketIcon className="text-surface-darker text-lg" />
              </div>
              <span className="text-sm font-display font-bold text-emerald-400">
                RoofTop<span className="text-gray-100">Cricket</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs mb-3">
              Book indoor cricket sessions at premium rooftop venues across Pakistan.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="w-8 h-8 rounded-lg bg-primary-700/50 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-surface-darker transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-100 text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-emerald-400 transition-colors text-xs">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-gray-100 text-sm font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-emerald-400 transition-colors text-xs">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h3 className="text-gray-100 text-sm font-semibold mb-3">For Owners</h3>
            <ul className="space-y-2">
              {footerLinks.forOwners.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-emerald-400 transition-colors text-xs">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-primary-700/30 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {currentYear} RoofTop Cricket. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-gray-500 hover:text-emerald-400 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-emerald-400 text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
