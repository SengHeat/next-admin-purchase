'use client'

import { useAuthStore } from 'src/store/auth.store'
import { UserRole } from 'src/types/api.types'

/**
 * Custom hook for authentication
 */
export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    setUser,
    checkAuth,
  } = useAuthStore()

  /**
   * Check if user has specific role
   */
  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false
    if (Array.isArray(role)) {
      return role.includes(user.role)
    }
    return user.role === role
  }

  /**
   * Check if user has specific permission
   */
  const hasPermission = (permission: string | string[]): boolean => {
    if (!user) return false
    if (Array.isArray(permission)) {
      return permission.some((p) => user.permissions?.includes(p))
    }
    return user.permissions?.includes(permission) ?? false
  }

  /**
   * Check if user can perform action
   */
  const can = (action: string): boolean => {
    return hasPermission(action)
  }

  /**
   * Get user's initials
   */
  const getInitials = (): string => {
    if (!user) return 'U'
    return user.name
      .split(' ')
      .map((n: any[]) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    logout,
    setUser,
    checkAuth,

    // Helpers
    hasRole,
    hasPermission,
    can,
    getInitials,
  }
}
