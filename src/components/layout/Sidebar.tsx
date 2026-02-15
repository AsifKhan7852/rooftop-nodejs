import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { toggleSidebarCollapse, setSidebarOpen } from '../../store/slices/uiSlice'
import { logout } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'

// Icons
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ExploreIcon from '@mui/icons-material/Explore'
import EventNoteIcon from '@mui/icons-material/EventNote'
import LogoutIcon from '@mui/icons-material/Logout'

import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PeopleIcon from '@mui/icons-material/People'
import AssessmentIcon from '@mui/icons-material/Assessment'
import BookOnlineIcon from '@mui/icons-material/BookOnline'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HelpIcon from '@mui/icons-material/Help'

interface SidebarProps {
  variant: 'user' | 'admin'
}

const Sidebar = ({ variant }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { sidebarCollapsed, sidebarOpen } = useSelector((state: RootState) => state.ui)

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon fontSize="small" /> },
    { name: 'Explore Rooftops', path: '/explore', icon: <ExploreIcon fontSize="small" /> },
    { name: 'My Bookings', path: '/my-bookings', icon: <EventNoteIcon fontSize="small" /> },
  ]

  const userBottomLinks = [
    { name: 'Help Center', path: '/help', icon: <HelpIcon fontSize="small" /> },
    { name: 'Account Info', path: '/profile', icon: <AccountCircleIcon fontSize="small" /> },
  ]

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: <DashboardIcon fontSize="small" /> },
    { name: 'Manage Slots', path: '/admin/slots', icon: <CalendarMonthIcon fontSize="small" /> },
    { name: 'Manage Bookings', path: '/admin/bookings', icon: <BookOnlineIcon fontSize="small" /> },
    { name: 'Registered Users', path: '/admin/users', icon: <PeopleIcon fontSize="small" /> },
    { name: 'Reports', path: '/admin/reports', icon: <AssessmentIcon fontSize="small" /> },
  ]

  const adminBottomLinks = [
    { name: 'Subscription', path: '/admin/subscription', icon: <SubscriptionsIcon fontSize="small" /> },
    { name: 'Account Info', path: '/admin/profile', icon: <AccountCircleIcon fontSize="small" /> },
  ]

  const links = variant === 'admin' ? adminLinks : userLinks
  const bottomLinks = variant === 'admin' ? adminBottomLinks : userBottomLinks

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/')
  }

  const handleContactUs = () => {
    toast.success('Contact: support@rooftopcricket.pk | +92 300 1234567')
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen bg-surface-dark border-r border-primary-700/30 flex flex-col transition-all duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          ${sidebarCollapsed ? 'md:w-16' : 'md:w-56'} w-64
        `}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-3 border-b border-primary-700/30">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
              <SportsCricketIcon className="text-surface-darker text-lg" />
            </div>
            <span className={`text-sm font-display font-bold text-emerald-400 whitespace-nowrap ${sidebarCollapsed ? 'md:hidden' : ''}`}>
              RoofTop<span className="text-gray-100">Cricket</span>
            </span>
          </Link>
          {/* Mobile Close Button */}
          <button
            onClick={() => dispatch(setSidebarOpen(false))}
            className="p-1 rounded-md text-gray-400 hover:text-emerald-400 hover:bg-primary-700/50 transition-all md:hidden"
          >
            <CloseIcon fontSize="small" />
          </button>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => dispatch(toggleSidebarCollapse())}
            className="hidden md:block p-1 rounded-md text-gray-400 hover:text-emerald-400 hover:bg-primary-700/50 transition-all"
          >
            {sidebarCollapsed ? <MenuIcon fontSize="small" /> : <MenuOpenIcon fontSize="small" />}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto">
          <ul className="space-y-0.5">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-all duration-200 text-sm ${isActive(link.path)
                    ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500'
                    : 'text-gray-300 hover:bg-primary-700/50 hover:text-emerald-400'
                    }`}
                  title={sidebarCollapsed ? link.name : undefined}
                >
                  <span className="flex-shrink-0">{link.icon}</span>
                  <span className={`font-medium ${sidebarCollapsed ? 'md:hidden' : ''}`}>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-primary-700/30 py-3 px-2">
          <ul className="space-y-0.5">
            <li>
              <button
                onClick={handleContactUs}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-gray-300 hover:bg-primary-700/50 hover:text-emerald-400 transition-all duration-200 text-sm"
                title={sidebarCollapsed ? 'Contact Us' : undefined}
              >
                <span className="flex-shrink-0"><ContactSupportIcon fontSize="small" /></span>
                <span className={`font-medium ${sidebarCollapsed ? 'md:hidden' : ''}`}>Contact Us</span>
              </button>
            </li>
            {bottomLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-all duration-200 text-sm ${isActive(link.path)
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-gray-300 hover:bg-primary-700/50 hover:text-emerald-400'
                    }`}
                  title={sidebarCollapsed ? link.name : undefined}
                >
                  <span className="flex-shrink-0">{link.icon}</span>
                  <span className={`font-medium ${sidebarCollapsed ? 'md:hidden' : ''}`}>{link.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 text-sm"
                title={sidebarCollapsed ? 'Logout' : undefined}
              >
                <span className="flex-shrink-0"><LogoutIcon fontSize="small" /></span>
                <span className={`font-medium ${sidebarCollapsed ? 'md:hidden' : ''}`}>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
