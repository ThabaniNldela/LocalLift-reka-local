import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { PropsWithChildren } from "react"

import { ApiError, authApi } from "@/api/client"
import type { SessionUser, UserType } from "@/types"
import { storage } from "@/utils/storage"

type RegisterPayload = {
  email: string
  name: string
  password: string
  phone?: string
  userType: UserType
  businessName?: string
  category?: string
}

type AuthContextValue = {
  error: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (payload: RegisterPayload) => Promise<void>
  token: string | null
  user: SessionUser | null
}

type StoredAuth = {
  token: string
  user: SessionUser
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)
const AUTH_STORAGE_KEY = "reka-local-auth"

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<SessionUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const persisted = storage.get<StoredAuth | null>(AUTH_STORAGE_KEY, null)
    if (persisted) {
      setToken(persisted.token)
      setUser(persisted.user)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (token && user) {
      storage.set(AUTH_STORAGE_KEY, { token, user })
    } else {
      storage.remove(AUTH_STORAGE_KEY)
    }
  }, [token, user])

  const login = async (email: string, password: string) => {
    setError(null)
    const response = await authApi.login(email, password)
    setToken(response.token)
    setUser(response.user)
  }

  const register = async (payload: RegisterPayload) => {
    setError(null)
    try {
      const response = await authApi.register(payload)
      setToken(response.token)
      setUser(response.user)
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message)
      }
      throw error
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setError(null)
  }

  const value = useMemo(() => ({
    error,
    isAuthenticated: Boolean(token && user),
    isLoading,
    login,
    logout,
    register,
    token,
    user,
  }), [error, isLoading, token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
