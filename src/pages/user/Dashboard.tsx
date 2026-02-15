import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ExploreIcon from '@mui/icons-material/Explore'
import EventNoteIcon from '@mui/icons-material/EventNote'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const UserDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const displayName = user?.name || 'Cricket Enthusiast'

  const stats = [
    { icon: <CalendarMonthIcon />, value: '12', label: 'Total Bookings', color: 'from-blue-500 to-blue-600' },
    { icon: <EventNoteIcon />, value: '3', label: 'Upcoming', color: 'from-green-500 to-green-600' },
    { icon: <ExploreIcon />, value: '8', label: 'Venues Visited', color: 'from-purple-500 to-purple-600' },
    { icon: <TrendingUpIcon />, value: '45hrs', label: 'Hours Played', color: 'from-accent-400 to-accent-600' },
  ]

  const upcomingBookings = [
    {
      id: 1,
      rooftop: 'Elite Cricket Arena',
      date: '2024-02-20',
      time: '06:00 PM - 08:00 PM',
      status: 'confirmed',
    },
    {
      id: 2,
      rooftop: 'Sky High Nets',
      date: '2024-02-25',
      time: '04:00 PM - 06:00 PM',
      status: 'pending',
    },
  ]

  const recommendedRooftops = [
    {
      id: 1,
      name: 'Elite Cricket Arena',
      location: 'Karachi',
      rating: 4.9,
      price: 1500,
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Sky High Nets',
      location: 'Lahore',
      rating: 4.7,
      price: 1200,
      image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Urban Cricket Hub',
      location: 'Islamabad',
      rating: 4.8,
      price: 1800,
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&h=200&fit=crop',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
            Welcome back, <span className="gradient-text">{displayName}</span>!
          </h1>
          <p className="text-gray-400 mt-1">Ready for your next cricket session?</p>
        </div>
        <Link to="/explore" className="btn-primary flex items-center gap-2 w-fit">
          Book a Slot <ArrowForwardIcon fontSize="small" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-display font-bold text-gray-100">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between p-5 border-b border-primary-700/30">
              <h2 className="text-lg font-semibold text-gray-100">Upcoming Bookings</h2>
              <Link to="/my-bookings" className="text-accent-400 text-sm hover:text-accent-300 flex items-center gap-1">
                View All <ArrowForwardIcon fontSize="small" />
              </Link>
            </div>
            <div className="divide-y divide-primary-700/30">
              {upcomingBookings.length === 0 ? (
                <div className="p-8 text-center">
                  <CalendarMonthIcon className="text-gray-600 text-4xl mb-2" />
                  <p className="text-gray-400">No upcoming bookings</p>
                  <Link to="/explore" className="text-accent-400 text-sm mt-2 inline-block hover:underline">
                    Book your first slot
                  </Link>
                </div>
              ) : (
                upcomingBookings.map((booking) => (
                  <div key={booking.id} className="p-5 flex items-center justify-between hover:bg-primary-700/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center text-accent-400">
                        <CalendarMonthIcon />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-100">{booking.rooftop}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                          <span>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                          <span className="flex items-center gap-1">
                            <AccessTimeIcon fontSize="small" /> {booking.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                      {booking.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/explore"
                className="flex items-center gap-3 p-3 rounded-lg bg-primary-700/30 hover:bg-primary-700/50 transition-colors group"
              >
                <ExploreIcon className="text-accent-400" />
                <span className="text-gray-100 group-hover:text-accent-400 transition-colors">Explore Rooftops</span>
              </Link>
              <Link
                to="/my-bookings"
                className="flex items-center gap-3 p-3 rounded-lg bg-primary-700/30 hover:bg-primary-700/50 transition-colors group"
              >
                <EventNoteIcon className="text-accent-400" />
                <span className="text-gray-100 group-hover:text-accent-400 transition-colors">My Bookings</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-lg bg-primary-700/30 hover:bg-primary-700/50 transition-colors group"
              >
                <CalendarMonthIcon className="text-accent-400" />
                <span className="text-gray-100 group-hover:text-accent-400 transition-colors">Booking History</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Rooftops */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-100">Recommended for You</h2>
          <Link to="/explore" className="text-accent-400 text-sm hover:text-accent-300 flex items-center gap-1">
            View All <ArrowForwardIcon fontSize="small" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendedRooftops.map((rooftop) => (
            <Link
              key={rooftop.id}
              to={`/rooftop/${rooftop.id}`}
              className="card overflow-hidden group hover:border-accent-500/50 transition-all"
            >
              <div className="h-32 overflow-hidden">
                <img
                  src={rooftop.image}
                  alt={rooftop.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-100 group-hover:text-accent-400 transition-colors">
                  {rooftop.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <LocationOnIcon fontSize="small" /> {rooftop.location}
                  </span>
                  <span className="text-accent-400 text-sm flex items-center gap-1">
                    <StarIcon fontSize="small" /> {rooftop.rating}
                  </span>
                </div>
                <div className="text-accent-400 font-semibold mt-2">
                  Rs. {rooftop.price.toLocaleString()}/hr
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
