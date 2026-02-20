import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'

const AdminDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const displayName = user?.companyName || user?.name || 'Rooftop Owner'

  const stats = [
    { icon: <CalendarMonthIcon />, value: '156', label: 'Total Bookings', change: '+12%', color: 'from-blue-500 to-blue-600' },
    { icon: <PeopleIcon />, value: '89', label: 'Registered Users', change: '+8%', color: 'from-green-500 to-green-600' },
    { icon: <AttachMoneyIcon />, value: 'Rs. 234K', label: 'Revenue', change: '+24%', color: 'from-purple-500 to-purple-600' },
    { icon: <TrendingUpIcon />, value: '95%', label: 'Slot Utilization', change: '+5%', color: 'from-accent-400 to-accent-600' },
  ]

  const recentBookings = [
    { id: 1, user: 'Ali Hassan', date: '2024-02-20', time: '06:00 PM', amount: 3000, status: 'confirmed' },
    { id: 2, user: 'Sara Khan', date: '2024-02-20', time: '08:00 PM', amount: 3000, status: 'pending' },
    { id: 3, user: 'Usman Ahmed', date: '2024-02-21', time: '10:00 AM', amount: 3000, status: 'confirmed' },
    { id: 4, user: 'Fatima Noor', date: '2024-02-21', time: '02:00 PM', amount: 3000, status: 'confirmed' },
  ]

  const todaySlots = [
    { time: '06:00 AM - 08:00 AM', status: 'booked', user: 'Ali Hassan' },
    { time: '08:00 AM - 10:00 AM', status: 'available', user: null },
    { time: '10:00 AM - 12:00 PM', status: 'blocked', user: null },
    { time: '12:00 PM - 02:00 PM', status: 'available', user: null },
    { time: '02:00 PM - 04:00 PM', status: 'booked', user: 'Sara Khan' },
    { time: '04:00 PM - 06:00 PM', status: 'available', user: null },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
            Welcome, <span className="gradient-text">{displayName}</span>
          </h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your rooftop today</p>
        </div>
        <Link to="/admin/slots" className="btn-primary flex items-center gap-2 w-fit">
          Manage Slots <ArrowForwardIcon fontSize="small" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <div className="text-2xl font-display font-bold text-gray-100">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-primary-700/30">
              <h2 className="text-lg font-semibold text-gray-100">Recent Bookings</h2>
              <Link to="/admin/bookings" className="text-accent-400 text-sm hover:text-accent-300 flex items-center gap-1">
                View All <ArrowForwardIcon fontSize="small" />
              </Link>
            </div>
            <div className="md:hidden space-y-3 p-4">
              {/* Mobile card view */}
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-3 border border-primary-700/30 rounded-lg bg-surface-card">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center text-gray-300 flex-shrink-0">
                      <PersonIcon fontSize="small" />
                    </div>
                    <span className="text-gray-100 text-sm font-medium truncate">{booking.user}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <div className="text-gray-100">{new Date(booking.date).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <div className="text-gray-100">{booking.time}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <div className="text-accent-400 font-medium">Rs. {booking.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <div>
                        <span className={`badge text-[0.6rem] ${booking.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-max">
                <thead className="bg-primary-700/30">
                  <tr>
                    <th className="text-left p-3 text-gray-400 font-medium text-xs sm:text-sm min-w-[100px]">Customer</th>
                    <th className="text-left p-3 text-gray-400 font-medium text-xs sm:text-sm min-w-[100px]">Date & Time</th>
                    <th className="text-left p-3 text-gray-400 font-medium text-xs sm:text-sm min-w-[80px]">Amount</th>
                    <th className="text-left p-3 text-gray-400 font-medium text-xs sm:text-sm min-w-[80px]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-700/30">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-primary-700/20 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center text-gray-300 flex-shrink-0">
                            <PersonIcon fontSize="small" />
                          </div>
                          <span className="text-gray-100 text-xs sm:text-sm truncate max-w-[80px]">{booking.user}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-gray-100 text-xs sm:text-sm truncate">{new Date(booking.date).toLocaleDateString()}</div>
                        <div className="text-gray-500 text-xs truncate">{booking.time}</div>
                      </td>
                      <td className="p-3 text-accent-400 font-medium text-xs sm:text-sm">Rs. {booking.amount.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`badge text-[0.6rem] sm:text-xs ${booking.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Today's Slots */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-primary-700/30">
              <h2 className="text-lg font-semibold text-gray-100">Today's Slots</h2>
              <span className="text-gray-500 text-xs sm:text-sm">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="space-y-2 sm:space-y-3 md:hidden p-4">
              {/* Mobile card view */}
              {todaySlots.map((slot, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${slot.status === 'booked'
                      ? 'bg-green-500/10 border border-green-500/30'
                      : slot.status === 'blocked'
                        ? 'bg-red-500/10 border border-red-500/30'
                        : 'bg-primary-700/30 border border-primary-600/30'
                    }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AccessTimeIcon fontSize="small" className="text-gray-500 flex-shrink-0" />
                    <span className="text-gray-100 text-sm font-medium">{slot.time}</span>
                  </div>
                  <div className="ml-6 text-sm">
                    <div className="text-gray-500">Status:</div>
                    <div className={`font-medium ${slot.status === 'booked' ? 'text-green-400' :
                        slot.status === 'blocked' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                      {slot.status === 'booked' ? slot.user : slot.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:block p-3 sm:p-4 space-y-2 sm:space-y-3">
              {todaySlots.map((slot, index) => (
                <div
                  key={index}
                  className={`p-2 sm:p-3 rounded-lg flex items-center justify-between ${slot.status === 'booked'
                      ? 'bg-green-500/10 border border-green-500/30'
                      : slot.status === 'blocked'
                        ? 'bg-red-500/10 border border-red-500/30'
                        : 'bg-primary-700/30 border border-primary-600/30'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon fontSize="small" className="text-gray-500 flex-shrink-0" />
                    <span className="text-gray-100 text-xs sm:text-sm truncate">{slot.time}</span>
                  </div>
                  <span className={`text-[0.6rem] sm:text-xs font-medium text-center min-w-[60px] ${slot.status === 'booked' ? 'text-green-400' :
                      slot.status === 'blocked' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                    {slot.status === 'booked' ? slot.user : slot.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        <Link to="/admin/slots" className="card p-5 hover:border-accent-500/50 transition-all group">
          <CalendarMonthIcon className="text-accent-400 text-3xl mb-3" />
          <h3 className="text-gray-100 font-medium group-hover:text-accent-400 transition-colors">Create Slots</h3>
          <p className="text-gray-500 text-sm mt-1">Set up available time slots</p>
        </Link>
        <Link to="/admin/bookings" className="card p-5 hover:border-accent-500/50 transition-all group">
          <CalendarMonthIcon className="text-accent-400 text-3xl mb-3" />
          <h3 className="text-gray-100 font-medium group-hover:text-accent-400 transition-colors">Manage Bookings</h3>
          <p className="text-gray-500 text-sm mt-1">View and manage all bookings</p>
        </Link>
        <Link to="/admin/users" className="card p-5 hover:border-accent-500/50 transition-all group">
          <PeopleIcon className="text-accent-400 text-3xl mb-3" />
          <h3 className="text-gray-100 font-medium group-hover:text-accent-400 transition-colors">View Users</h3>
          <p className="text-gray-500 text-sm mt-1">See registered customers</p>
        </Link>
        <Link to="/admin/reports" className="card p-5 hover:border-accent-500/50 transition-all group">
          <TrendingUpIcon className="text-accent-400 text-3xl mb-3" />
          <h3 className="text-gray-100 font-medium group-hover:text-accent-400 transition-colors">View Reports</h3>
          <p className="text-gray-500 text-sm mt-1">Analytics and reports</p>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard
