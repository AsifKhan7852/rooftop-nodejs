import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { cancelBooking } from '../../store/slices/bookingSlice'
import toast from 'react-hot-toast'

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import ReceiptIcon from '@mui/icons-material/Receipt'
import FilterListIcon from '@mui/icons-material/FilterList'

const MyBookings = () => {
  const dispatch = useDispatch()
  const { bookings } = useSelector((state: RootState) => state.bookings)
  const [filter, setFilter] = useState('all')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  // Mock bookings if empty
  const displayBookings = bookings.length > 0 ? bookings : [
    {
      id: '1',
      rooftopName: 'Elite Cricket Arena',
      date: '2024-02-20',
      startTime: '06:00 PM',
      endTime: '08:00 PM',
      status: 'confirmed' as const,
      amount: 3000,
      paymentStatus: 'paid' as const,
      createdAt: '2024-02-15',
    },
    {
      id: '2',
      rooftopName: 'Sky High Nets',
      date: '2024-02-25',
      startTime: '04:00 PM',
      endTime: '06:00 PM',
      status: 'pending' as const,
      amount: 2400,
      paymentStatus: 'pending' as const,
      createdAt: '2024-02-14',
    },
    {
      id: '3',
      rooftopName: 'Urban Cricket Hub',
      date: '2024-02-10',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      status: 'completed' as const,
      amount: 3600,
      paymentStatus: 'paid' as const,
      createdAt: '2024-02-05',
    },
    {
      id: '4',
      rooftopName: 'Premier Cricket Zone',
      date: '2024-02-08',
      startTime: '02:00 PM',
      endTime: '04:00 PM',
      status: 'cancelled' as const,
      amount: 2000,
      paymentStatus: 'refunded' as const,
      createdAt: '2024-02-01',
    },
  ]

  const filteredBookings = displayBookings.filter((booking) => {
    if (filter === 'all') return true
    return booking.status === filter
  })

  const handleCancelBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelBooking(id))
      toast.success('Booking cancelled successfully')
      setOpenMenu(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'badge-success'
      case 'pending': return 'badge-warning'
      case 'completed': return 'badge-info'
      case 'cancelled': return 'badge-error'
      default: return 'badge-info'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
            My <span className="gradient-text">Bookings</span>
          </h1>
          <p className="text-gray-400 mt-1">Manage all your cricket session bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${filter === status
              ? 'bg-accent-500 text-surface-darker'
              : 'bg-primary-700/50 text-gray-300 hover:bg-primary-700'
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="card p-12 text-center">
            <CalendarMonthIcon className="text-gray-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">No bookings found</h3>
            <p className="text-gray-400">
              {filter === 'all'
                ? "You haven't made any bookings yet"
                : `No ${filter} bookings`
              }
            </p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="card p-3 md:p-5 hover:border-accent-500/30 transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-500/10 rounded-xl flex items-center justify-center text-accent-400 flex-shrink-0">
                    <CalendarMonthIcon />
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-semibold text-gray-100 text-lg truncate pr-2">{booking.rooftopName}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <CalendarMonthIcon fontSize="small" />
                        {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <AccessTimeIcon fontSize="small" />
                        {booking.startTime} - {booking.endTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className={`badge ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      <span className="text-accent-400 font-semibold">
                        Rs. {booking.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                  {booking.status === 'confirmed' && (
                    <>
                      <button className="btn-ghost flex items-center gap-2 text-sm">
                        <EditIcon fontSize="small" /> Reschedule
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="btn-ghost flex items-center gap-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <CancelIcon fontSize="small" /> Cancel
                      </button>
                    </>
                  )}
                  {booking.status === 'completed' && (
                    <button className="btn-ghost flex items-center gap-2 text-sm">
                      <ReceiptIcon fontSize="small" /> Receipt
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyBookings
