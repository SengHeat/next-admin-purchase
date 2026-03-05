import { BaseEntity } from './api.types'

/**
 * Purchaser entity
 */
export interface Purchaser extends BaseEntity {
  purchaser_code: string
  name: string
  email: string
  phone: string
  company_name: string
  company_registration: string
  address: string
  city: string
  state: string
  postal_code: string
  country: string
  contact_person: string
  status: 'active' | 'inactive' | 'suspended'
  credit_limit?: number
  total_spent?: number
  total_orders?: number
  average_order_value?: number
  last_order_date?: string
  rating?: number
  notes?: string
}

/**
 * Purchaser performance metrics
 */
export interface PurchaserMetrics extends BaseEntity {
  purchaser_id: string | number
  total_orders: number
  total_amount_spent: number
  average_order_value: number
  on_time_delivery_rate: number
  quality_score: number
  payment_on_time_rate: number
  issue_count: number
  average_issue_resolution_time: number
}

/**
 * Purchaser payment history entity
 */
export interface PurchaserPaymentHistory extends BaseEntity {
  purchaser_id: string | number
  payment_number: string
  amount: number
  currency: string
  payment_date: string
  due_date?: string
  status: 'pending' | 'completed' | 'overdue' | 'cancelled'
  payment_method?: string
  reference?: string
}

/**
 * Create purchaser request
 */
export interface CreatePurchaserRequest {
  name: string
  email: string
  phone: string
  company_name: string
  company_registration: string
  address: string
  city: string
  state: string
  postal_code: string
  country: string
  contact_person: string
  credit_limit?: number
  notes?: string
}

/**
 * Update purchaser request
 */
export interface UpdatePurchaserRequest {
  purchaser_id: string | number
  name?: string
  email?: string
  phone?: string
  company_name?: string
  address?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  contact_person?: string
  status?: 'active' | 'inactive' | 'suspended'
  credit_limit?: number
  notes?: string
}

/**
 * Purchaser filter parameters
 */
export interface PurchaserFilters {
  status?: 'active' | 'inactive' | 'suspended'
  country?: string
  min_total_spent?: number
  max_total_spent?: number
  min_credit_limit?: number
  max_credit_limit?: number
  has_pending_issues?: boolean
}
