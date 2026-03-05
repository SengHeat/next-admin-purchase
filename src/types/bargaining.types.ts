import { BaseEntity, StatusType } from './api.types'

/**
 * Bargaining status enumeration
 */
export enum BargainingStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  NEGOTIATION = 'negotiation',
  COMPLETED = 'completed',
}

/**
 * Bargaining round entity
 */
export interface BargainingRound {
  id: string | number
  bargaining_id: string | number
  round_number: number
  initiated_by_id: string | number
  initiated_by_name: string
  proposal: string
  counter_proposal?: string
  status: BargainingStatus
  accepted: boolean
  created_at: string
  updated_at: string
}

/**
 * Bargaining entity
 */
export interface Bargaining extends BaseEntity {
  bargaining_number: string
  order_id: string | number
  order_number?: string
  purchaser_id: string | number
  purchaser_name: string
  vendor_id: string | number
  vendor_name: string
  item_name: string
  original_price: number
  proposed_price: number
  final_price?: number | null
  status: BargainingStatus
  discount_percentage: number
  reason?: string
  approved_by_id?: string | number
  approved_by_name?: string
  approved_at?: string | null
  rejected_reason?: string
  rounds: BargainingRound[]
}

/**
 * Create bargaining request
 */
export interface CreateBargainingRequest {
  order_id: string | number
  item_name: string
  original_price: number
  proposed_price: number
  reason?: string
  vendor_id: string | number
}

/**
 * Approve bargaining request
 */
export interface ApproveBargainingRequest {
  bargaining_id: string | number
  final_price: number
  notes?: string
}

/**
 * Reject bargaining request
 */
export interface RejectBargainingRequest {
  bargaining_id: string | number
  reason: string
}

/**
 * Bargaining filter parameters
 */
export interface BargainingFilters {
  status?: BargainingStatus
  purchaser_id?: string | number
  vendor_id?: string | number
  date_from?: string
  date_to?: string
  min_discount?: number
  max_discount?: number
}
