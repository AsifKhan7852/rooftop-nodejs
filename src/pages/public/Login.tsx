import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess, loginStart } from '../../store/slices/authSlice'
import { RootState } from '../../store/store'
import { toast } from 'react-toastify'

// Icons
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import GoogleIcon from '@mui/icons-material/Google'
import SportsCricketIcon from '@mui/icons-material/SportsCricket'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state: RootState) => state.auth)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginStart())

    setTimeout(() => {
      const user = {
        id: '1',
        email: formData.email,
        name: formData.email.split('@')[0],
        role: loginType as 'user' | 'admin',
      }
      
      dispatch(loginSuccess(user))
      toast.success('Login successful!')
      navigate(loginType === 'admin' ? '/admin' : '/dashboard')
    }, 1000)
  }

  const handleGoogleLogin = () => {
    toast.success('Google login coming soon!')
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg mb-3">
            <SportsCricketIcon className="text-surface-darker text-xl" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-100 mb-1">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Sign in to continue</p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex bg-surface-card rounded-lg p-1 mb-5">
          <button
            onClick={() => setLoginType('user')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              loginType === 'user'
                ? 'bg-emerald-500 text-surface-darker'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => setLoginType('admin')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              loginType === 'admin'
                ? 'bg-emerald-500 text-surface-darker'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-5 space-y-4">
          <div>
            <label className="block text-gray-300 text-xs font-medium mb-1.5">Email or Phone</label>
            <div className="relative">
              <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email or phone"
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
                placeholder="Enter your password"
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

          <div className="text-right">
            <Link to="/forgot-password" className="text-emerald-400 text-xs hover:text-emerald-300 transition-colors">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={isLoading} className="w-full btn-primary py-2.5 text-sm disabled:opacity-50">
            {isLoading ? 'Signing in...' : 'Sign In'}
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
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-surface-darker border border-primary-600 rounded-lg py-2.5 text-gray-100 text-sm font-medium hover:bg-primary-700/50 transition-all"
          >
            <GoogleIcon className="text-lg" /> Continue with Google
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
