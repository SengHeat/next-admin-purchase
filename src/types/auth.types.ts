import { UserRole } from './api.types'

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * Login response with token
 */
export interface LoginResponse {
  access_token: string
  token_type: 'Bearer'
  expires_in: number
  user: User
}

/**
 * User profile information
 */
export interface User {
  id: string | number
  email: string
  name: string
  phone?: string
  avatar_url?: string
  role: UserRole
  status: 'active' | 'inactive' | 'suspended'
  is_verified: boolean
  permissions: string[]
  preferences?: {
    theme: 'light' | 'dark'
    language: string
    notifications_enabled: boolean
  }
  created_at: string
  updated_at: string
}

/**
 * JWT decoded token payload
 */
export interface JWTPayload {
  sub: string | number
  email: string
  role: UserRole
  permissions: string[]
  iat: number
  exp: number
}

/**
 * Logout response
 */
export interface LogoutResponse {
  message: string
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refresh_token: string
}

/**
 * Auth store state
 */
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
