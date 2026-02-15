import { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addBooking } from '../../store/slices/bookingSlice'
import toast from 'react-hot-toast'

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'

const BookSlot = () => {
  const { rooftopId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const selectedDate = searchParams.get('date') || new Date().toISOString().split('T')[0]
  
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState(1)

  // Mock slots
  const slots = [
    { id: '1', time: '06:00 AM - 08:00 AM', available: true },
    { id: '2', time: '08:00 AM - 10:00 AM', available: true },
    { id: '3', time: '10:00 AM - 12:00 PM', available: false },
    { id: '4', time: '12:00 PM - 02:00 PM', available: true },
    { id: '5', time: '02:00 PM - 04:00 PM', available: true },
    { id: '6', time: '04:00 PM - 06:00 PM', available: false },
    { id: '7', time: '06:00 PM - 08:00 PM', available: true },
    { id: '8', time: '08:00 PM - 10:00 PM', available: true },
  ]

  const rooftop = {
    name: 'Elite Cricket Arena',
    location: 'Karachi, Pakistan',
    pricePerHour: 1500,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=200&fit=crop',
  }

  const selectedSlotData = slots.find(s => s.id === selectedSlot)
  const totalHours = 2
  const totalAmount = rooftop.pricePerHour * totalHours

  const handleContinue = () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot')
      return
    }
    setStep(2)
  }

  const handlePayment = () => {
    setIsProcessing(true)
    
    setTimeout(() => {
      const booking = {
        id: Date.now().toString(),
        userId: '1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        rooftopId: rooftopId || '1',
        rooftopName: rooftop.name,
        slotId: selectedSlot || '1',
        date: selectedDate,
        startTime: selectedSlotData?.time.split(' - ')[0] || '',
        endTime: selectedSlotData?.time.split(' - ')[1] || '',
        status: 'confirmed' as const,
        amount: totalAmount,
        paymentStatus: 'paid' as const,
        createdAt: new Date().toISOString(),
      }
      
      dispatch(addBooking(booking))
      toast.success('Booking confirmed successfully!')
      setIsProcessing(false)
      navigate('/my-bookings')
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-accent-400 transition-colors"
      >
        <ArrowBackIcon /> Back
      </button>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-accent-400' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-accent-500 text-surface-darker' : 'bg-primary-700'}`}>
            1
          </div>
          <span className="hidden sm:inline">Select Slot</span>
        </div>
        <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-accent-500' : 'bg-primary-700'}`} />
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-accent-400' : 'text-gray-500'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-accent-500 text-surface-darker' : 'bg-primary-700'}`}>
            2
          </div>
          <span className="hidden sm:inline">Payment</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="card p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-100 mb-2">Select a Time Slot</h2>
                <p className="text-gray-400">
                  Date: <span className="text-accent-400">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedSlot(slot.id)}
                    disabled={!slot.available}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedSlot === slot.id
                        ? 'border-accent-500 bg-accent-500/10'
                        : slot.available
                        ? 'border-primary-600 hover:border-accent-500/50'
                        : 'border-primary-700 bg-primary-800/50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <AccessTimeIcon fontSize="small" className={selectedSlot === slot.id ? 'text-accent-400' : 'text-gray-500'} />
                      <span className={`font-medium ${selectedSlot === slot.id ? 'text-accent-400' : 'text-gray-100'}`}>
                        {slot.time}
                      </span>
                    </div>
                    <span className={`text-sm ${slot.available ? 'text-green-400' : 'text-red-400'}`}>
                      {slot.available ? 'Available' : 'Booked'}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleContinue}
                disabled={!selectedSlot}
                className="w-full btn-primary disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="card p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-100">Payment Method</h2>

              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                    paymentMethod === 'card' ? 'border-accent-500 bg-accent-500/10' : 'border-primary-600 hover:border-accent-500/50'
                  }`}
                >
                  <CreditCardIcon className={paymentMethod === 'card' ? 'text-accent-400' : 'text-gray-500'} />
                  <div className="text-left">
                    <div className={`font-medium ${paymentMethod === 'card' ? 'text-accent-400' : 'text-gray-100'}`}>
                      Credit/Debit Card
                    </div>
                    <div className="text-gray-500 text-sm">Visa, Mastercard, etc.</div>
                  </div>
                  {paymentMethod === 'card' && <CheckCircleIcon className="ml-auto text-accent-400" />}
                </button>

                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                    paymentMethod === 'wallet' ? 'border-accent-500 bg-accent-500/10' : 'border-primary-600 hover:border-accent-500/50'
                  }`}
                >
                  <AccountBalanceWalletIcon className={paymentMethod === 'wallet' ? 'text-accent-400' : 'text-gray-500'} />
                  <div className="text-left">
                    <div className={`font-medium ${paymentMethod === 'wallet' ? 'text-accent-400' : 'text-gray-100'}`}>
                      Mobile Wallet
                    </div>
                    <div className="text-gray-500 text-sm">JazzCash, EasyPaisa</div>
                  </div>
                  {paymentMethod === 'wallet' && <CheckCircleIcon className="ml-auto text-accent-400" />}
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-4 border-t border-primary-700/30">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(1)} className="flex-1 btn-secondary">
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : `Pay Rs. ${totalAmount.toLocaleString()}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Booking Summary</h3>
            
            <img
              src={rooftop.image}
              alt={rooftop.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />

            <h4 className="font-medium text-gray-100">{rooftop.name}</h4>
            <p className="text-gray-400 text-sm mb-4">{rooftop.location}</p>

            <div className="space-y-2 pt-4 border-t border-primary-700/30">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Date</span>
                <span className="text-gray-100">{new Date(selectedDate).toLocaleDateString()}</span>
              </div>
              {selectedSlotData && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Time</span>
                  <span className="text-gray-100">{selectedSlotData.time}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="text-gray-100">{totalHours} hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Rate</span>
                <span className="text-gray-100">Rs. {rooftop.pricePerHour}/hr</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 mt-4 border-t border-primary-700/30">
              <span className="font-semibold text-gray-100">Total</span>
              <span className="font-bold text-accent-400 text-xl">Rs. {totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookSlot
