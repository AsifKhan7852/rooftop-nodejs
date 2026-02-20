import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'

// Icons
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import BusinessIcon from '@mui/icons-material/Business'

import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'

const AdminSignup = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',

    companyName: '',
    location: '',
    address: '',
    openTime: '06:00',
    closeTime: '22:00',
    pricePerHour: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error('Please fill all required fields')
        return
      }
    }
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const user = {
        id: '1',
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        companyName: formData.companyName,
        role: 'admin' as const,
      }

      dispatch(loginSuccess(user))
      toast.success('Rooftop registered successfully!')
      navigate('/admin')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl shadow-glow mb-4">
            <SportsCricketIcon className="text-surface-darker text-3xl" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-100 mb-2">Register Your Rooftop</h1>
          <p className="text-gray-400">Join our platform and start accepting bookings</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step >= s
                    ? 'bg-accent-500 text-surface-darker'
                    : 'bg-primary-700 text-gray-400'
                  }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 rounded-full transition-all ${step > s ? 'bg-accent-500' : 'bg-primary-700'
                    }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-6 space-y-5">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Personal Information</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Full Name *</label>
                  <div className="relative">
                    <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email Address *</label>
                  <div className="relative">
                    <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number *</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

              </div>
            </>
          )}

          {/* Step 2: Rooftop Info */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Rooftop Details</h2>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Rooftop/Company Name *</label>
                <div className="relative">
                  <BusinessIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter your rooftop name"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">City/Location *</label>
                <div className="relative">
                  <LocationOnIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Karachi, Pakistan"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Full Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                  className="input-field min-h-[80px] resize-none"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Opening Time</label>
                  <div className="relative">
                    <AccessTimeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="time"
                      name="openTime"
                      value={formData.openTime}
                      onChange={handleChange}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Closing Time</label>
                  <div className="relative">
                    <AccessTimeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="time"
                      name="closeTime"
                      value={formData.closeTime}
                      onChange={handleChange}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Price/Hour (Rs.)</label>
                  <div className="relative">
                    <AttachMoneyIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="number"
                      name="pricePerHour"
                      value={formData.pricePerHour}
                      onChange={handleChange}
                      placeholder="1500"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Rooftop Images</label>
                <div className="border-2 border-dashed border-primary-600 rounded-xl p-8 text-center hover:border-accent-500/50 transition-colors cursor-pointer">
                  <CloudUploadIcon className="text-gray-500 text-4xl mb-2" />
                  <p className="text-gray-400">Drag & drop images here or click to upload</p>
                  <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 5MB each</p>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Create Password</h2>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Password *</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="input-field pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Confirm Password *</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 rounded border-primary-600 bg-surface-darker text-accent-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{' '}
                  <Link to="/terms" className="text-accent-400 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/terms" className="text-accent-400 hover:underline">Privacy Policy</Link>
                </label>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 btn-secondary"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register Rooftop'}
              </button>
            )}
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-accent-400 font-medium hover:text-accent-300 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AdminSignup
