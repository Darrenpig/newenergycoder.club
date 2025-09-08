import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to home page while preserving the intended destination
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}