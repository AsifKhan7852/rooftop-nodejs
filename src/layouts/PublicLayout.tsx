import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import AuthModal from '../components/auth/AuthModal'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-darker">
      <AuthModal />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
