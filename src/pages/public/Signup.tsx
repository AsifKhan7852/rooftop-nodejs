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
import LockIcon from '@mui/icons-material/Lock'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import GoogleIcon from '@mui/icons-material/Google'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const Signup = () => {
  const [signupType, setSignupType] = useState<'user' | 'admin'>('user')
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Admin fields

    companyName: '',
    location: '',
    address: '',
    openTime: '06:00',
    closeTime: '22:00',
    pricePerHour: '',
  })

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
        companyName: signupType === 'admin' ? formData.companyName : undefined,
        role: signupType as 'user' | 'admin',
      }

      dispatch(loginSuccess(user))
      toast.success('Account created successfully!')
      navigate(signupType === 'admin' ? '/admin' : '/dashboard')
      setIsLoading(false)
    }, 1000)
  }

  const handleGoogleSignup = () => {
    toast.success('Google signup coming soon!')
  }



  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg mb-3">
            <SportsCricketIcon className="text-surface-darker text-xl" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-100 mb-1">Create Account</h1>
          <p className="text-gray-400 text-sm">Join RoofTop Cricket today</p>
        </div>

        {/* Signup Type Toggle */}
        <div className="flex bg-surface-card rounded-lg p-1 mb-5">
          <button
            onClick={() => { setSignupType('user'); setStep(1) }}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${signupType === 'user'
              ? 'bg-emerald-500 text-surface-darker'
              : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            User Signup
          </button>
          <button
            onClick={() => { setSignupType('admin'); setStep(1) }}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${signupType === 'admin'
              ? 'bg-emerald-500 text-surface-darker'
              : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            Rooftop Owner
          </button>
        </div>

        {/* Progress Steps for Admin */}
        {signupType === 'admin' && (
          <div className="flex items-center justify-center gap-3 mb-5">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= s
                    ? 'bg-emerald-500 text-surface-darker'
                    : 'bg-primary-700 text-gray-400'
                    }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-10 h-0.5 rounded-full transition-all ${step > s ? 'bg-emerald-500' : 'bg-primary-700'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-5 space-y-4">
          {/* USER SIGNUP - Single Step */}
          {signupType === 'user' && (
            <>
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1.5">Full Name</label>
                <div className="relative">
                  <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input-field pl-9 text-sm py-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1.5">Email Address</label>
                <div className="relative">
                  <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="input-field pl-9 text-sm py-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1.5">Phone Number</label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="input-field pl-9 text-sm py-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1.5">Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="input-field pl-9 pr-9 text-sm py-2.5"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <VisibilityOffIcon className="text-lg" /> : <VisibilityIcon className="text-lg" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1.5">Confirm Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="input-field pl-9 pr-9 text-sm py-2.5"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <VisibilityOffIcon className="text-lg" /> : <VisibilityIcon className="text-lg" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-0.5 w-4 h-4 rounded border-primary-600 bg-surface-darker text-emerald-500" required />
                <label htmlFor="terms" className="text-xs text-gray-400">
                  I agree to the <Link to="/terms" className="text-emerald-400 hover:underline">Terms of Service</Link> and <Link to="/terms" className="text-emerald-400 hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <button type="submit" disabled={isLoading} className="w-full btn-primary py-2.5 text-sm disabled:opacity-50">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary-700/50"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-surface-card text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-2 bg-surface-darker border border-primary-600 rounded-lg py-2.5 text-gray-100 text-sm font-medium hover:bg-primary-700/50 transition-all"
              >
                <GoogleIcon className="text-lg" /> Continue with Google
              </button>
            </>
          )}

          {/* ADMIN SIGNUP - Step 1: Personal Info */}
          {signupType === 'admin' && step === 1 && (
            <>
              <h2 className="text-base font-semibold text-gray-100">Personal Information</h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1.5">Full Name *</label>
                  <div className="relative">
                    <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="input-field pl-9 text-sm py-2.5" required />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1.5">Email *</label>
                  <div className="relative">
                    <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" className="input-field pl-9 text-sm py-2.5" required />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1.5">Phone *</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" className="input-field pl-9 text-sm py-2.5" required />
                  </div>
                </div>

              </div>

              <button type="button" onClick={handleNext} className="w-full btn-primary py-2.5 text-sm">Next</button>
            </>
          )}

          {/* ADMIN SIGNUP - Step 2: Rooftop Info */}
          {signupType === 'admin' && step === 2 && (
            <>
              <h2 className="text-base font-semibold text-gray-100">Rooftop Details</h2>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1.5">Rooftop Name *</label>
                <div className="relative">
                  <BusinessIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Your rooftop name" className="input-field pl-9 text-sm py-2.5" required />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1.5">City/Location *</label>
                <div className="relative">
                  <LocationOnIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Karachi, Pakistan" className="input-field pl-9 text-sm py-2.5" required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1.5">Opening</label>
                  <input type="time" name="openTime" value={formData.openTime} onChange={handleChange} className="input-field text-sm py-2.5" />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1.5">Closing</label>
                  <input type="time" name="closeTime" value={formData.closeTime} onChange={handleChange} className="input-field text-sm py-2.5" />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1.5">Price/hr</label>
                  <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} placeholder="1500" className="input-field text-sm py-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1.5">Rooftop Images</label>
                <div className="border-2 border-dashed border-primary-600 rounded-lg p-4 text-center hover:border-emerald-500/50 transition-colors cursor-pointer">
                  <CloudUploadIcon className="text-gray-500 text-2xl mb-1" />
                  <p className="text-gray-400 text-xs">Drag & drop or click to upload</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={handleBack} className="flex-1 btn-secondary py-2.5 text-sm">Back</button>
                <button type="button" onClick={handleNext} className="flex-1 btn-primary py-2.5 text-sm">Next</button>
              </div>
            </>
          )}

          {/* ADMIN SIGNUP - Step 3: Password */}
          {signupType === 'admin' && step === 3 && (
            <>
              <h2 className="text-base font-semibold text-gray-100">Create Password</h2>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1.5">Password *</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="input-field pl-9 pr-9 text-sm py-2.5"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                    {showPassword ? <VisibilityOffIcon className="text-lg" /> : <VisibilityIcon className="text-lg" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-medium mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" className="input-field pl-9 text-sm py-2.5" required />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-0.5 w-4 h-4 rounded border-primary-600 bg-surface-darker text-emerald-500" required />
                <label htmlFor="terms" className="text-xs text-gray-400">
                  I agree to the <Link to="/terms" className="text-emerald-400 hover:underline">Terms of Service</Link> and <Link to="/terms" className="text-emerald-400 hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={handleBack} className="flex-1 btn-secondary py-2.5 text-sm">Back</button>
                <button type="submit" disabled={isLoading} className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-50">
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </>
          )}
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
