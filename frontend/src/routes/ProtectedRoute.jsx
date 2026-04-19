import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isCheckingAuth } = useAuthStore()

  if (isCheckingAuth) {
    return (
      <main className="min-h-[50vh] flex items-center justify-center">
        <p className="text-sm font-medium text-slate-600">Checking session...</p>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
