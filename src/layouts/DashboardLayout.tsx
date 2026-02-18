import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Sidebar from '../components/layout/Sidebar'
import DashboardHeader from '../components/layout/DashboardHeader'

const DashboardLayout = () => {
  const { sidebarCollapsed } = useSelector((state: RootState) => state.ui)


  // For demo purposes, we'll allow access without authentication
  // In production, uncomment the redirect below:
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />
  // }

  return (
    <div className="h-screen bg-surface-darker flex overflow-hidden">
      <Sidebar variant="user" />
      <div className={`flex-1 flex flex-col transition-all duration-300 ml-0 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} max-w-[100vw] overflow-x-hidden`}>
        <DashboardHeader />
        <main className="flex-1 p-3 md:p-6 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
