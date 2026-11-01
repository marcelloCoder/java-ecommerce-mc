import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext'
import { useI18n } from '../../i18n/I18nProvider'

type Props = {
  children: React.ReactNode
  adminOnly?: boolean
}

export function ProtectedRoute({ children, adminOnly = false }: Props) {
  const { token, loading, isAdmin } = useAuth()
  const location = useLocation()
  const { t } = useI18n()

  if (loading) {
    return (
      <p className="p-10 text-center text-[var(--ink-muted)]">
        {t.common.loading}
      </p>
    )
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}
