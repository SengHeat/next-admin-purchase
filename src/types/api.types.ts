/**
 * Generic API Response wrapper for all endpoints
 */
export interface ApiResponse<T = any> {
  success: boolean
  status: number
  message: string
  data?: T
  errors?: Record<string, string[]>
}

/**
 * Pagination metadata
 */
export interface Pagination {
  page: number
  per_page: number
  total: number
  total_pages: number
  from: number
  to: number
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}

/**
 * Sorting and filtering parameters
 */
export interface QueryParams {
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, any>
}

/**
 * Generic list response
 */
export interface ListResponse<T> extends ApiResponse {
  data: {
    items: T[]
    pagination: Pagination
  }
}

/**
 * Error response
 */
export interface ErrorResponse {
  success: false
  status: number
  message: string
  errors?: Record<string, string[]>
}

/**
 * User roles in the system
 */
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  PURCHASER = 'purchaser',
  VENDOR = 'vendor',
  ACCOUNTANT = 'accountant',
  AUDITOR = 'auditor',
}

/**
 * Common status types
 */
export enum StatusType {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
}

/**
 * Timestamp format for all API responses
 */
export interface TimestampedEntity {
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

/**
 * Base entity with ID and timestamps
 */
export interface BaseEntity extends TimestampedEntity {
  id: string | number
}
