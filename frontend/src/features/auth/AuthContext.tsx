import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { UserDTO } from '../../types/api'
import { getMe, loginRequest } from './authApi'
import {
  clearTokens,
  getAccessToken,
  setTokens,
} from './tokenStorage'

type AuthContextValue = {
  user: UserDTO | null
  token: string | null
  loading: boolean
  isAdmin: boolean
  isOperator: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshMe: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function decodeAuthorities(token: string): string[] {
  try {
    const payload = JSON.parse(atob(token.split('.')[1] ?? '')) as {
      authorities?: string[]
    }
    return payload.authorities ?? []
  } catch {
    return []
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getAccessToken())
  const [user, setUser] = useState<UserDTO | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshMe = useCallback(async () => {
    if (!getAccessToken()) {
      setUser(null)
      return
    }
    const me = await getMe()
    setUser(me)
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        if (token) await refreshMe()
      } catch {
        if (!cancelled) {
          clearTokens()
          setToken(null)
          setUser(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [token, refreshMe])

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginRequest(email, password)
    setTokens(res.access_token, res.refresh_token)
    setToken(res.access_token)
    const me = await getMe()
    setUser(me)
  }, [])

  const logout = useCallback(() => {
    clearTokens()
    setToken(null)
    setUser(null)
  }, [])

  const authorities = useMemo(() => {
    if (user?.roles?.length) return user.roles.map((r) => r.authority)
    if (token) return decodeAuthorities(token)
    return []
  }, [user, token])

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAdmin: authorities.includes('ROLE_ADMIN'),
      isOperator:
        authorities.includes('ROLE_OPERATOR') ||
        authorities.includes('ROLE_ADMIN'),
      login,
      logout,
      refreshMe,
    }),
    [user, token, loading, authorities, login, logout, refreshMe],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
