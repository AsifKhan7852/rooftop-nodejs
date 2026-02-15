import { useState } from 'react'

// Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PeopleIcon from '@mui/icons-material/People'
import DownloadIcon from '@mui/icons-material/Download'

const Reports = () => {
  const [period, setPeriod] = useState('month')

  const stats = [
    { icon: <CalendarMonthIcon />, value: '156', label: 'Total Bookings', change: '+12%' },
    { icon: <AttachMoneyIcon />, value: 'Rs. 468,000', label: 'Total Revenue', change: '+24%' },
    { icon: <PeopleIcon />, value: '89', label: 'Unique Customers', change: '+8%' },
    { icon: <TrendingUpIcon />, value: '92%', label: 'Slot Utilization', change: '+5%' },
  ]

  const dailyData = [
    { date: 'Mon', bookings: 12, revenue: 36000 },
    { date: 'Tue', bookings: 15, revenue: 45000 },
    { date: 'Wed', bookings: 10, revenue: 30000 },
    { date: 'Thu', bookings: 18, revenue: 54000 },
    { date: 'Fri', bookings: 22, revenue: 66000 },
    { date: 'Sat', bookings: 28, revenue: 84000 },
    { date: 'Sun', bookings: 25, revenue: 75000 },
  ]

  const topSlots = [
    { time: '06:00 PM - 08:00 PM', bookings: 45, percentage: 95 },
    { time: '08:00 PM - 10:00 PM', bookings: 42, percentage: 88 },
    { time: '04:00 PM - 06:00 PM', bookings: 38, percentage: 80 },
    { time: '10:00 AM - 12:00 PM', bookings: 28, percentage: 58 },
    { time: '06:00 AM - 08:00 AM', bookings: 22, percentage: 46 },
  ]

  const recentTransactions = [
    { id: 1, user: 'Ali Hassan', amount: 3000, date: '2024-02-20', type: 'booking' },
    { id: 2, user: 'Sara Khan', amount: 3000, date: '2024-02-20', type: 'booking' },
    { id: 3, user: 'Fatima Noor', amount: -3000, date: '2024-02-19', type: 'refund' },
    { id: 4, user: 'Usman Ahmed', amount: 3000, date: '2024-02-19', type: 'booking' },
    { id: 5, user: 'Hassan Raza', amount: 3000, date: '2024-02-18', type: 'booking' },
  ]

  const maxRevenue = Math.max(...dailyData.map(d => d.revenue))

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
            Reports & <span className="gradient-text">Analytics</span>
          </h1>
          <p className="text-gray-400 mt-1">Track your rooftop's performance</p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${period === p
                ? 'bg-accent-500 text-surface-darker'
                : 'bg-primary-700/50 text-gray-300 hover:bg-primary-700'
                }`}
            >
              This {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center text-accent-400">
                {stat.icon}
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <div className="text-2xl font-display font-bold text-gray-100">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-100">Daily Revenue</h3>
            <button className="btn-ghost flex items-center gap-2 text-sm">
              <DownloadIcon fontSize="small" /> Export
            </button>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-48 gap-2">
            {dailyData.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-primary-700/50 rounded-t-lg relative" style={{ height: `${(day.revenue / maxRevenue) * 100}%` }}>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-accent-500 to-accent-400 rounded-t-lg"
                    style={{ height: `${(day.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-gray-500 text-xs">{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Slots */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-6">Most Popular Slots</h3>
          <div className="space-y-4">
            {topSlots.map((slot, index) => (
              <div key={slot.time}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-300 text-sm">{slot.time}</span>
                  <span className="text-accent-400 text-sm font-medium">{slot.bookings} bookings</span>
                </div>
                <div className="h-2 bg-primary-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full transition-all"
                    style={{ width: `${slot.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between p-5 border-b border-primary-700/30">
          <h3 className="text-lg font-semibold text-gray-100">Recent Transactions</h3>
          <button className="btn-ghost flex items-center gap-2 text-sm">
            <DownloadIcon fontSize="small" /> Export Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-700/30">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Customer</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Date</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Type</th>
                <th className="text-right p-4 text-gray-400 font-medium text-sm">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-700/30">
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-primary-700/20 transition-colors">
                  <td className="p-4 text-gray-100">{txn.user}</td>
                  <td className="p-4 text-gray-400">{new Date(txn.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`badge ${txn.type === 'booking' ? 'badge-success' : 'badge-warning'}`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className={`p-4 text-right font-medium ${txn.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {txn.amount > 0 ? '+' : ''}Rs. {Math.abs(txn.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Reports
