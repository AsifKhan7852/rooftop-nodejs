import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import Landing from './pages/public/Landing'
import AboutUs from './pages/public/AboutUs'
import Contact from './pages/public/Contact'
import FAQ from './pages/public/FAQ'
import Terms from './pages/public/Terms'
import AuthRedirect from './components/auth/AuthRedirect'

// User Dashboard Pages
import UserDashboard from './pages/user/Dashboard'
import ExploreRooftops from './pages/user/ExploreRooftops'
import RooftopDetail from './pages/user/RooftopDetail'
import MyBookings from './pages/user/MyBookings'
import BookSlot from './pages/user/BookSlot'
import UserProfile from './pages/user/Profile'
import HelpCenter from './pages/user/HelpCenter'

// Admin Dashboard Pages
import AdminDashboard from './pages/admin/Dashboard'
import ManageSlots from './pages/admin/ManageSlots'
import ManageBookings from './pages/admin/ManageBookings'
import RegisteredUsers from './pages/admin/RegisteredUsers'
import Reports from './pages/admin/Reports'
import AdminProfile from './pages/admin/Profile'
import Subscription from './pages/admin/Subscription'

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthRedirect mode="login" />} />
        <Route path="/signup" element={<AuthRedirect mode="signup" />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      {/* User Dashboard Routes - Protected */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/explore" element={<ExploreRooftops />} />
        <Route path="/rooftop/:id" element={<RooftopDetail />} />
        <Route path="/book/:rooftopId" element={<BookSlot />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/help" element={<HelpCenter />} />
      </Route>

      {/* Admin Dashboard Routes - Protected */}
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/slots" element={<ManageSlots />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/admin/users" element={<RegisteredUsers />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/subscription" element={<Subscription />} />
      </Route>
    </Routes>
  )
}

export default App
