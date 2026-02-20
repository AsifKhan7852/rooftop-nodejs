import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Sidebar from '../components/layout/Sidebar'
import DashboardHeader from '../components/layout/DashboardHeader'

const AdminLayout = () => {
  const { sidebarCollapsed } = useSelector((state: RootState) => state.ui)


  // For demo purposes, we'll allow access without authentication
  // In production, uncomment the redirect below:
  // if (!isAuthenticated || user?.role !== 'admin') {
  //   return <Navigate to="/login" replace />
  // }

  return (
    <div className="min-h-screen bg-surface-darker flex overflow-x-hidden">
      <Sidebar variant="admin" />
      <div className={`flex-1 flex flex-col transition-all duration-300 overflow-hidden ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto overflow-x-hidden">
          <div className="max-w-full w-full overflow-x-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
