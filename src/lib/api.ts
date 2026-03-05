import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG, TOKEN_KEY } from './constants'
import { ApiResponse } from 'src/types/api.types'

/**
 * Create axios instance with interceptors
 */
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  /**
   * Request interceptor - add token to headers
   */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    },
  )

  /**
   * Response interceptor - handle errors globally
   */
  instance.interceptors.response.use(
    (response) => {
      // Transform response data if needed
      return response.data as ApiResponse
    },
    (error: AxiosError<ApiResponse>) => {
      // Handle 401 Unauthorized - redirect to login
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(TOKEN_KEY)
          window.location.href = '/login'
        }
      }

      // Handle other errors
      const errorData = error.response?.data as ApiResponse | undefined
      const errorMessage = errorData?.message || error.message || 'An error occurred'

      return Promise.reject({
        status: error.response?.status,
        message: errorMessage,
        errors: errorData?.errors,
        originalError: error,
      })
    },
  )

  return instance
}

/**
 * Export API instance
 */
export const api = createApiInstance()

/**
 * Helper function to get auth token
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Helper function to set auth token
 */
export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * Helper function to remove auth token
 */
export const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Helper function for retry logic
 */
export const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries: number = API_CONFIG.RETRY_COUNT,
  delay: number = API_CONFIG.RETRY_DELAY,
): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
      return retryRequest(fn, retries - 1, delay * 2)
    }
    throw error
  }
}
