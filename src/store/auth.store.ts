import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { authService } from '@/services/auth.service'
import { LoginRequest, User } from '@/types/auth.types'
import { getAuthToken, removeAuthToken } from '@/lib/api'
import { TOKEN_KEY } from '@/lib/constants'

interface AuthStore {
  // State
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  checkAuth: () => Promise<void>
}

/**
 * Auth store with Zustand
 */
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        token: getAuthToken(),
        isAuthenticated: !!getAuthToken(),
        isLoading: false,
        error: null,

        // Actions
        login: async (credentials: LoginRequest) => {
          set({ isLoading: true, error: null })
          try {
            const response = await authService.login(credentials)
            set({
              user: response.user,
              token: response.access_token,
              isAuthenticated: true,
              isLoading: false,
            })
          } catch (error: any) {
            set({
              error: error.message || 'Login failed',
              isLoading: false,
            })
            throw error
          }
        },

        logout: async () => {
          set({ isLoading: true })
          try {
            await authService.logout()
          } catch (error) {
            // Continue logout even if API call fails
            console.error('Logout error:', error)
          } finally {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            })
            removeAuthToken()
          }
        },

        setUser: (user: User | null) => {
          set({ user })
        },

        setToken: (token: string | null) => {
          set({ token, isAuthenticated: !!token })
        },

        setLoading: (loading: boolean) => {
          set({ isLoading: loading })
        },

        setError: (error: string | null) => {
          set({ error })
        },

        checkAuth: async () => {
          const token = get().token
          if (!token) {
            set({ isAuthenticated: false })
            return
          }

          try {
            const user = await authService.getMe()
            set({ user, isAuthenticated: true })
          } catch {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            })
            removeAuthToken()
          }
        },
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          token: state.token,
          user: state.user,
        }),
      },
    ),
  ),
)
