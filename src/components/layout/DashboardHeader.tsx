import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { toggleSidebar } from '../../store/slices/uiSlice'

// Icons

import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuIcon from '@mui/icons-material/Menu'

const DashboardHeader = () => {
  const dispatch = useDispatch()

  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)
  const { notifications } = useSelector((state: RootState) => state.ui)

  const unreadCount = notifications.filter(n => !n.read).length

  // Mock user for demo
  const displayUser = user || {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    role: 'user',
  }

  return (
    <header className="h-16 bg-surface-dark/95 backdrop-blur-md border-b border-primary-700/30 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 w-full">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="md:hidden p-2 text-gray-400 hover:text-emerald-400 hover:bg-primary-700/50 rounded-lg transition-colors"
        >
          <MenuIcon />
        </button>


      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-gray-400 hover:text-accent-400 hover:bg-primary-700/50 transition-all"
          >
            <NotificationsIcon />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent-500 rounded-full text-xs text-surface-darker font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-surface-card border border-primary-700/50 rounded-xl shadow-card overflow-hidden animate-fade-in">
              <div className="p-4 border-b border-primary-700/30">
                <h3 className="font-semibold text-gray-100">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications yet
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-primary-700/30 hover:bg-primary-700/30 transition-colors cursor-pointer ${!notification.read ? 'bg-primary-700/20' : ''
                        }`}
                    >
                      <p className="text-sm text-gray-100">{notification.message}</p>
                      <span className="text-xs text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 border-t border-primary-700/30">
                <button className="w-full text-center text-sm text-accent-400 hover:text-accent-300 transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary-700/50 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
              {displayUser.avatar ? (
                <img
                  src={displayUser.avatar}
                  alt={displayUser.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <PersonIcon className="text-surface-darker" fontSize="small" />
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-100">{displayUser.name}</p>
              <p className="text-xs text-gray-500 capitalize">{displayUser.role}</p>
            </div>
            <KeyboardArrowDownIcon className="text-gray-500 hidden md:block" fontSize="small" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-surface-card border border-primary-700/50 rounded-xl shadow-card overflow-hidden animate-fade-in">
              <div className="p-4 border-b border-primary-700/30">
                <p className="font-medium text-gray-100">{displayUser.name}</p>
                <p className="text-sm text-gray-500">{displayUser.email}</p>
              </div>
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-primary-700/50 hover:text-accent-400 transition-all text-sm">
                  View Profile
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-primary-700/50 hover:text-accent-400 transition-all text-sm">
                  Settings
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-all text-sm">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
