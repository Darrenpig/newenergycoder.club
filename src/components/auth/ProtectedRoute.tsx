import { Navigate, useLocation } from 'react-router-dom'
import { AUTH_IMPLEMENTATION, useAuthStore } from '@/store/auth-store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    console.warn(
      `[ProtectedRoute] blocked unauthenticated access in ${AUTH_IMPLEMENTATION} mode`,
      location.pathname
    )
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}
