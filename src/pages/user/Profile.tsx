import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { updateProfile, logout } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// Icons
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import LockIcon from '@mui/icons-material/Lock'

const UserProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: user?.phone || '+92 300 1234567',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    dispatch(updateProfile(formData))
    toast.success('Profile updated successfully')
    setIsEditing(false)
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      dispatch(logout())
      toast.success('Account deleted successfully')
      navigate('/')
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-100">
        Account <span className="gradient-text">Settings</span>
      </h1>

      {/* Profile Card */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-100">Profile Information</h2>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto"
          >
            {isEditing ? <><SaveIcon fontSize="small" /> Save Changes</> : 'Edit Profile'}
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 text-center sm:text-left">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
              <PersonIcon className="text-surface-darker text-4xl" />
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-primary-600 border-2 border-surface-card">
                <CameraAltIcon fontSize="small" />
              </button>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-100">{formData.name}</h3>
            <p className="text-gray-400">{formData.email}</p>
            <span className="badge badge-info mt-2 inline-block">User Account</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="input-field pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="input-field pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="input-field pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">Security</h2>
        <button className="w-full flex items-center justify-between p-4 rounded-lg bg-primary-700/30 hover:bg-primary-700/50 transition-colors">
          <div className="flex items-center gap-3">
            <LockIcon className="text-accent-400" />
            <div className="text-left">
              <div className="text-gray-100 font-medium">Change Password</div>
              <div className="text-gray-500 text-sm">Update your password regularly</div>
            </div>
          </div>
          <span className="text-gray-400">→</span>
        </button>
      </div>

      {/* Danger Zone */}
      <div className="card p-6 border-red-500/30">
        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="text-center md:text-left">
            <div className="text-gray-100 font-medium">Delete Account</div>
            <div className="text-gray-500 text-sm">Permanently delete your account and all data</div>
          </div>
          <button
            onClick={handleDeleteAccount}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full md:w-auto"
          >
            <DeleteIcon fontSize="small" /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
