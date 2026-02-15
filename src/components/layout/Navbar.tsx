import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { openAuthModal } from '../../store/slices/uiSlice'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Rooftops', href: '#rooftops' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)

    if (href.startsWith('/')) {
      navigate(href)
      return
    }

    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/' + href)
      return
    }

    // Scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface-dark/98 backdrop-blur-md shadow-lg' : 'bg-surface-dark/95 backdrop-blur-md'
      } border-b border-primary-700/30`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-emerald-500/30">
              <SportsCricketIcon className="text-surface-darker text-lg" />
            </div>
            <span className="text-base font-display font-bold text-emerald-400">
              RoofTop<span className="text-gray-100">Cricket</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-gray-300 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 hover:text-emerald-400 hover:bg-primary-700/30"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => dispatch(openAuthModal('login'))}
              className="text-gray-300 text-sm font-medium px-3 py-1.5 rounded-lg hover:text-emerald-400 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => dispatch(openAuthModal('signup'))}
              className="bg-emerald-500 text-surface-darker text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1.5 text-gray-300 hover:text-emerald-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-dark border-t border-primary-700/30 animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-primary-700/50 hover:text-emerald-400 transition-colors text-sm"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-3 border-t border-primary-700/30 space-y-2">
              <div className="pt-3 border-t border-primary-700/30 space-y-2">
                <button
                  onClick={() => {
                    dispatch(openAuthModal('login'))
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-center py-2 text-gray-300 hover:text-emerald-400 text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    dispatch(openAuthModal('signup'))
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-center bg-emerald-500 text-surface-darker py-2 rounded-lg font-semibold text-sm"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
