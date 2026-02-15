import { useState } from 'react'
import { toast } from 'react-toastify'

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AddIcon from '@mui/icons-material/Add'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const ManageSlots = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  // Mock slots data
  const [slots, setSlots] = useState([
    { id: '1', time: '06:00 AM - 08:00 AM', status: 'available', bookedBy: null },
    { id: '2', time: '08:00 AM - 10:00 AM', status: 'booked', bookedBy: 'Ali Hassan' },
    { id: '3', time: '10:00 AM - 12:00 PM', status: 'available', bookedBy: null },
    { id: '4', time: '12:00 PM - 02:00 PM', status: 'blocked', bookedBy: null },
    { id: '5', time: '02:00 PM - 04:00 PM', status: 'booked', bookedBy: 'Sara Khan' },
    { id: '6', time: '04:00 PM - 06:00 PM', status: 'available', bookedBy: null },
    { id: '7', time: '06:00 PM - 08:00 PM', status: 'available', bookedBy: null },
    { id: '8', time: '08:00 PM - 10:00 PM', status: 'available', bookedBy: null },
  ])

  const handleBlockSlot = (slotId: string) => {
    setSlots(slots.map(slot =>
      slot.id === slotId
        ? { ...slot, status: slot.status === 'blocked' ? 'available' : 'blocked' }
        : slot
    ))
    toast.success('Slot updated successfully')
  }

  const handleCreateSlots = () => {
    toast.success('Slots created for the month!')
    setShowCreateModal(false)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    return { days, firstDay }
  }

  const { days, firstDay } = getDaysInMonth(selectedMonth)
  const today = new Date()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
            Manage <span className="gradient-text">Slots</span>
          </h1>
          <p className="text-gray-400 mt-1">Create, block, and manage time slots</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2 w-fit"
        >
          <AddIcon /> Create Monthly Slots
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
                className="p-2 rounded-lg hover:bg-primary-700/50 text-gray-400 hover:text-accent-400 transition-colors"
              >
                <ChevronLeftIcon />
              </button>
              <h3 className="font-semibold text-gray-100">
                {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
                className="p-2 rounded-lg hover:bg-primary-700/50 text-gray-400 hover:text-accent-400 transition-colors"
              >
                <ChevronRightIcon />
              </button>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="text-center text-gray-500 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {[...Array(firstDay)].map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {[...Array(days)].map((_, i) => {
                const day = i + 1
                const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day)
                const isSelected = date.toDateString() === selectedDate.toDateString()
                const isToday = date.toDateString() === today.toDateString()
                const isPast = date < today && !isToday

                return (
                  <button
                    key={day}
                    onClick={() => !isPast && setSelectedDate(date)}
                    disabled={isPast}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${isSelected
                        ? 'bg-accent-500 text-white font-semibold'
                        : isToday
                          ? 'bg-primary-700 text-accent-400 font-semibold'
                          : isPast
                            ? 'text-gray-600 cursor-not-allowed'
                            : 'text-gray-300 hover:bg-primary-700/50'
                      }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Slots for selected date */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between p-5 border-b border-primary-700/30">
              <div>
                <h2 className="text-lg font-semibold text-gray-100">
                  Slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
                <p className="text-gray-500 text-sm mt-1">Click on a slot to block/unblock</p>
              </div>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-4 rounded-xl border-2 transition-all ${slot.status === 'booked'
                      ? 'border-green-500/30 bg-green-500/10'
                      : slot.status === 'blocked'
                        ? 'border-red-500/30 bg-red-500/10'
                        : 'border-primary-600 hover:border-accent-500/50'
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AccessTimeIcon fontSize="small" className="text-gray-500" />
                      <span className="font-medium text-gray-100">{slot.time}</span>
                    </div>
                    <span className={`badge ${slot.status === 'booked' ? 'badge-success' :
                        slot.status === 'blocked' ? 'badge-error' : 'badge-info'
                      }`}>
                      {slot.status}
                    </span>
                  </div>

                  {slot.bookedBy && (
                    <p className="text-gray-400 text-sm mb-2">Booked by: {slot.bookedBy}</p>
                  )}

                  <div className="flex gap-2 mt-3">
                    {slot.status !== 'booked' && (
                      <button
                        onClick={() => handleBlockSlot(slot.id)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${slot.status === 'blocked'
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          }`}
                      >
                        {slot.status === 'blocked' ? (
                          <><CheckCircleIcon fontSize="small" /> Unblock</>
                        ) : (
                          <><BlockIcon fontSize="small" /> Block</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Slots Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md p-6 animate-slide-up">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Create Monthly Slots</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Select Month</label>
                <input
                  type="month"
                  className="input-field"
                  defaultValue={`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`}
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Slot Duration</label>
                <select className="input-field">
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>3 hours</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Start Time</label>
                  <input type="time" defaultValue="06:00" className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">End Time</label>
                  <input type="time" defaultValue="22:00" className="input-field" />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Price per Slot (Rs.)</label>
                <input type="number" placeholder="1500" className="input-field" />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="flex-1 btn-secondary">
                Cancel
              </button>
              <button onClick={handleCreateSlots} className="flex-1 btn-primary">
                Create Slots
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageSlots
