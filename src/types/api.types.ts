// types/api.ts

export interface TimestampedEntity {
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

export interface BaseEntity extends TimestampedEntity {
  id: string | number
}

export enum StatusType {
  PENDING     = 'pending',
  APPROVED    = 'approved',
  REJECTED    = 'rejected',
  COMPLETED   = 'completed',
  CANCELLED   = 'cancelled',
  IN_PROGRESS = 'in_progress',
  ON_HOLD     = 'on_hold',
}

export enum UserRole {
  ADMIN      = 'admin',
  MANAGER    = 'manager',
  PURCHASER  = 'purchaser',
  VENDOR     = 'vendor',
  ACCOUNTANT = 'accountant',
  AUDITOR    = 'auditor',
}

export interface Pagination {
  page: number
  per_page: number
  total: number
  total_pages: number
  from: number
  to: number
}

export interface ApiResponse<T = any> {
  success: boolean
  status: number
  message: string
  data?: T
  errors?: Record<string, string[]>
}

export interface ListResponse<T> extends ApiResponse {
  data: {
    items: T[]
    pagination: Pagination
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}

export interface QueryParams {
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, any>
}

export interface ErrorResponse {
  success: false
  status: number
  message: string
  errors?: Record<string, string[]>
}

// ── Laravel pagination meta ──────────────────────────────────────────────────
export interface PaginationMetaLink {
  url:    string | null
  label:  string
  page:   number | null
  active: boolean
}

export interface PaginationMeta {
  current_page: number
  from:         number
  last_page:    number
  per_page:     number
  to:           number
  total:        number
  path:         string
  links:        PaginationMetaLink[]
}

export interface PaginationLinks {
  first: string | null
  last:  string | null
  prev:  string | null
  next:  string | null
}

export interface LaravelPaginatedResponse<T> {
  data:    T[]
  links:   PaginationLinks
  meta:    PaginationMeta
  message: string
}

// ── Single item response ─────────────────────────────────────────────────────
export interface LaravelResponse<T> {
  data:    T
  message: string
}
