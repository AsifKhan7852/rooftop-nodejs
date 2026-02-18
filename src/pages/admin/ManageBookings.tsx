import { useState } from 'react'
import { toast } from 'react-toastify'

// Icons
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ReceiptIcon from '@mui/icons-material/Receipt'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

const ManageBookings = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const bookings = [
    {
      id: '1',
      user: 'Ali Hassan',
      email: 'ali@example.com',
      phone: '+92 300 1234567',
      date: '2024-02-20',
      time: '06:00 PM - 08:00 PM',
      amount: 3000,
      status: 'confirmed',
      paymentStatus: 'paid',
    },
    {
      id: '2',
      user: 'Sara Khan',
      email: 'sara@example.com',
      phone: '+92 301 2345678',
      date: '2024-02-20',
      time: '08:00 PM - 10:00 PM',
      amount: 3000,
      status: 'pending',
      paymentStatus: 'pending',
    },
    {
      id: '3',
      user: 'Usman Ahmed',
      email: 'usman@example.com',
      phone: '+92 302 3456789',
      date: '2024-02-21',
      time: '10:00 AM - 12:00 PM',
      amount: 3000,
      status: 'confirmed',
      paymentStatus: 'paid',
    },
    {
      id: '4',
      user: 'Fatima Noor',
      email: 'fatima@example.com',
      phone: '+92 303 4567890',
      date: '2024-02-21',
      time: '02:00 PM - 04:00 PM',
      amount: 3000,
      status: 'cancelled',
      paymentStatus: 'refunded',
    },
    {
      id: '5',
      user: 'Hassan Raza',
      email: 'hassan@example.com',
      phone: '+92 304 5678901',
      date: '2024-02-22',
      time: '04:00 PM - 06:00 PM',
      amount: 3000,
      status: 'confirmed',
      paymentStatus: 'paid',
    },
  ]

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || booking.status === filter
    return matchesSearch && matchesFilter
  })

  const handleConfirm = (_id: string) => {
    toast.success('Booking confirmed!')
    setOpenMenu(null)
  }

  const handleCancel = (_id: string) => {
    toast.success('Booking cancelled!')
    setOpenMenu(null)
  }

  const handleGenerateReceipt = (_id: string) => {
    toast.success('Receipt generated!')
    setOpenMenu(null)
  }


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return 'badge-success'
      case 'pending': return 'badge-warning'
      case 'cancelled': return 'badge-error'
      default: return 'badge-info'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
          Manage <span className="gradient-text">Bookings</span>
        </h1>
        <p className="text-gray-400 mt-1">View and manage all customer bookings</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12 w-full"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'confirmed', 'pending', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${filter === status
                ? 'bg-accent-500 text-white'
                : 'bg-primary-700/50 text-gray-300 hover:bg-primary-700'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      {/* Desktop Table View */}
      <div className="card overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-700/30">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Customer</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Date & Time</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Amount</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Payment</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-700/30">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-primary-700/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center text-gray-300">
                        <PersonIcon />
                      </div>
                      <div>
                        <div className="text-gray-100 font-medium">{booking.user}</div>
                        <div className="text-gray-500 text-sm">{booking.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-100">{new Date(booking.date).toLocaleDateString()}</div>
                    <div className="text-gray-500 text-sm">{booking.time}</div>
                  </td>
                  <td className="p-4 text-accent-400 font-medium">
                    Rs. {booking.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={`badge ${booking.paymentStatus === 'paid' ? 'badge-success' :
                      booking.paymentStatus === 'refunded' ? 'badge-info' : 'badge-warning'
                      }`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`badge ${getStatusBadge(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === booking.id ? null : booking.id)}
                        className="p-2 rounded-lg hover:bg-primary-700/50 text-gray-400 hover:text-accent-400 transition-colors"
                      >
                        <MoreVertIcon />
                      </button>
                      {openMenu === booking.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-surface-card border border-primary-700/50 rounded-lg shadow-card overflow-hidden z-10">
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => handleConfirm(booking.id)}
                              className="w-full text-left px-4 py-2 text-gray-300 hover:bg-primary-700/50 flex items-center gap-2"
                            >
                              <CheckCircleIcon fontSize="small" className="text-green-400" /> Confirm
                            </button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <button
                              onClick={() => handleCancel(booking.id)}
                              className="w-full text-left px-4 py-2 text-gray-300 hover:bg-primary-700/50 flex items-center gap-2"
                            >
                              <CancelIcon fontSize="small" className="text-red-400" /> Cancel
                            </button>
                          )}
                          <button
                            onClick={() => handleGenerateReceipt(booking.id)}
                            className="w-full text-left px-4 py-2 text-gray-300 hover:bg-primary-700/50 flex items-center gap-2"
                          >
                            <ReceiptIcon fontSize="small" className="text-accent-400" /> Receipt
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="p-12 text-center">
            <CalendarMonthIcon className="text-gray-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">No bookings found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="card p-12 text-center">
            <CalendarMonthIcon className="text-gray-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-100 mb-2">No bookings found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="card p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center text-gray-300">
                    <PersonIcon />
                  </div>
                  <div>
                    <div className="text-gray-100 font-medium">{booking.user}</div>
                    <div className="text-gray-500 text-xs">{booking.email}</div>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === booking.id ? null : booking.id)}
                    className="p-2 rounded-lg hover:bg-primary-700/50 text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    <MoreVertIcon />
                  </button>
                  {openMenu === booking.id && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-surface-card border border-primary-700/50 rounded-lg shadow-card overflow-hidden z-10">
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleConfirm(booking.id)}
                          className="w-full text-left px-4 py-2 text-gray-300 hover:bg-primary-700/50 flex items-center gap-2 text-sm"
                        >
                          <CheckCircleIcon fontSize="small" className="text-green-400" /> Confirm
                        </button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="w-full text-left px-4 py-2 text-gray-300 hover:bg-primary-700/50 flex items-center gap-2 text-sm"
                        >
                          <CancelIcon fontSize="small" className="text-red-400" /> Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleGenerateReceipt(booking.id)}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-primary-700/50 flex items-center gap-2 text-sm"
                      >
                        <ReceiptIcon fontSize="small" className="text-accent-400" /> Receipt
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Date & Time</span>
                  <div className="text-right">
                    <div className="text-gray-100">{new Date(booking.date).toLocaleDateString()}</div>
                    <div className="text-gray-500 text-xs">{booking.time}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-accent-400 font-medium">Rs. {booking.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Payment</span>
                  <span className={`badge ${booking.paymentStatus === 'paid' ? 'badge-success' :
                    booking.paymentStatus === 'refunded' ? 'badge-info' : 'badge-warning'
                    }`}>
                    {booking.paymentStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className={`badge ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ManageBookings
