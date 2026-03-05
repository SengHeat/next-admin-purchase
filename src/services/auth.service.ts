import { api, setAuthToken, removeAuthToken } from 'src/lib/api'
import { AUTH_ROUTES } from 'src/lib/constants'
import { LoginRequest, LoginResponse, User, LogoutResponse, RefreshTokenRequest } from 'src/types/auth.types'
import { ApiResponse } from 'src/types/api.types'

/**
 * Authentication service
 */
export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<any, ApiResponse<LoginResponse>>(
      AUTH_ROUTES.LOGIN,
      credentials,
    )

    if (response.data?.access_token) {
      setAuthToken(response.data.access_token)
    }

    return response.data as LoginResponse
  },

  /**
   * Get current user profile
   */
  getMe: async (): Promise<User> => {
    const response = await api.get<any, ApiResponse<User>>(AUTH_ROUTES.ME)
    return response.data as User
  },

  /**
   * Refresh token
   */
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await api.post<any, ApiResponse<LoginResponse>>(
      AUTH_ROUTES.REFRESH,
      { refresh_token: refreshToken } as RefreshTokenRequest,
    )

    if (response.data?.access_token) {
      setAuthToken(response.data.access_token)
    }

    return response.data as LoginResponse
  },

  /**
   * Logout user
   */
  logout: async (): Promise<LogoutResponse> => {
    try {
      const response = await api.post<any, ApiResponse<LogoutResponse>>(
        AUTH_ROUTES.LOGOUT,
        {},
      )
      removeAuthToken()
      return response.data as LogoutResponse
    } catch {
      // Still remove token even if logout request fails
      removeAuthToken()
      return { message: 'Logged out successfully' }
    }
  },
}
