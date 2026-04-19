import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, 
  Home, 
  BarChart3, 
  History, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const navigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'History', href: '/history', icon: History },
    { name: 'Profile', href: '/profile', icon: User },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#faf7ee', color: '#2f4858' }}>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ backgroundColor: '#2f4858', opacity: 0.75 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg 
          lg:translate-x-0 lg:static lg:inset-0 lg:block
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b flex-shrink-0" style={{ borderColor: '#dcf9fe' }}>
            <div className="flex items-center">
              <Code2 className="w-8 h-8" style={{ color: '#336699' }} />
              <span className="ml-2 text-xl font-bold" style={{ color: '#2f4858' }}>CodeSage</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md transition-colors hover:bg-gray-100"
            >
              <X className="w-5 h-5" style={{ color: '#6b7280' }} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'shadow-sm' 
                        : 'hover:bg-gray-50'
                      }
                    `}
                    style={{
                      backgroundColor: isActive ? '#dde9f3' : 'transparent',
                      color: isActive ? '#2a5287' : '#374151'
                    }}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User section */}
          <div className="border-t flex-shrink-0 p-3" style={{ borderColor: '#dcf9fe' }}>
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium truncate" style={{ color: '#2f4858' }}>{user?.name}</p>
              <p className="text-xs truncate" style={{ color: '#6b7280' }}>{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
              style={{ color: '#374151' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#fef2f2'
                e.target.style.color = '#dc2626'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#374151'
              }}
            >
              <LogOut className="mr-3 h-4 w-4 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md transition-colors lg:hidden hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" style={{ color: '#6b7280' }} />
            </button>
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              <span className="text-sm hidden sm:block" style={{ color: '#6b7280' }}>AI-Powered Code Analysis</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children || <Outlet />}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
