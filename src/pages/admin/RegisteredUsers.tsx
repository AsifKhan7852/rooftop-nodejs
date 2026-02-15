import { useState } from 'react'
import { toast } from 'react-toastify'

// Icons
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

const RegisteredUsers = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Ali Hassan',
      email: 'ali@example.com',
      phone: '+92 300 1234567',
      bookings: 12,
      joinedAt: '2024-01-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Sara Khan',
      email: 'sara@example.com',
      phone: '+92 301 2345678',
      bookings: 8,
      joinedAt: '2024-01-20',
      status: 'active',
    },
    {
      id: '3',
      name: 'Usman Ahmed',
      email: 'usman@example.com',
      phone: '+92 302 3456789',
      bookings: 5,
      joinedAt: '2024-02-01',
      status: 'active',
    },
    {
      id: '4',
      name: 'Fatima Noor',
      email: 'fatima@example.com',
      phone: '+92 303 4567890',
      bookings: 3,
      joinedAt: '2024-02-05',
      status: 'blocked',
    },
    {
      id: '5',
      name: 'Hassan Raza',
      email: 'hassan@example.com',
      phone: '+92 304 5678901',
      bookings: 15,
      joinedAt: '2023-12-10',
      status: 'active',
    },
    {
      id: '6',
      name: 'Ayesha Malik',
      email: 'ayesha@example.com',
      phone: '+92 305 6789012',
      bookings: 7,
      joinedAt: '2024-01-25',
      status: 'active',
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
    const matchesFilter = filter === 'all' || user.status === filter
    return matchesSearch && matchesFilter
  })

  const handleToggleBlock = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'blocked' ? 'active' : 'blocked' }
        : user
    ))
    toast.success('User status updated!')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
          Registered <span className="gradient-text">Users</span>
        </h1>
        <p className="text-gray-400 mt-1">View and manage customers who have booked at your rooftop</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12 w-full"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'blocked'].map((status) => (
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-accent-400">{users.length}</div>
          <div className="text-gray-400 text-sm">Total Users</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{users.filter(u => u.status === 'active').length}</div>
          <div className="text-gray-400 text-sm">Active</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{users.filter(u => u.status === 'blocked').length}</div>
          <div className="text-gray-400 text-sm">Blocked</div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card p-5 hover:border-accent-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-surface-darker font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">{user.name}</h3>
                  <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <EmailIcon fontSize="small" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <PhoneIcon fontSize="small" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <CalendarMonthIcon fontSize="small" />
                <span>{user.bookings} bookings</span>
              </div>
            </div>

            <div className="pt-4 border-t border-primary-700/30 flex items-center justify-between">
              <span className="text-gray-500 text-sm">
                Joined {new Date(user.joinedAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleToggleBlock(user.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${user.status === 'blocked'
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  }`}
              >
                {user.status === 'blocked' ? (
                  <><CheckCircleIcon fontSize="small" /> Unblock</>
                ) : (
                  <><BlockIcon fontSize="small" /> Block</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="card p-12 text-center">
          <PersonIcon className="text-gray-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-100 mb-2">No users found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

export default RegisteredUsers
