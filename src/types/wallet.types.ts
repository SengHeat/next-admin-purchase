import { BaseEntity } from './api.types'

/**
 * Transaction type enumeration
 */
export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  REFUND = 'refund',
  ADJUSTMENT = 'adjustment',
}

/**
 * Transaction status enumeration
 */
export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

/**
 * Topup request status enumeration
 */
export enum TopupStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

/**
 * Wallet entity
 */
export interface Wallet extends BaseEntity {
  wallet_number: string
  holder_id: string | number
  holder_name: string
  holder_type: 'purchaser' | 'vendor'
  balance: number
  currency: string
  status: 'active' | 'inactive' | 'frozen'
  last_transaction_at?: string | null
}

/**
 * Transaction entity
 */
export interface Transaction extends BaseEntity {
  wallet_id: string | number
  transaction_number: string
  type: TransactionType
  amount: number
  currency: string
  status: TransactionStatus
  description: string
  reference_type?: string
  reference_id?: string | number
  balance_before: number
  balance_after: number
  initiated_by_id?: string | number
  initiated_by_name?: string
}

/**
 * Topup request entity
 */
export interface TopupRequest extends BaseEntity {
  wallet_id: string | number
  topup_number: string
  amount: number
  currency: string
  status: TopupStatus
  reason: string
  requested_by_id: string | number
  requested_by_name: string
  approved_by_id?: string | number
  approved_by_name?: string
  approved_at?: string | null
  rejected_reason?: string
  proof_of_payment_url?: string
  payment_method?: string
}

/**
 * Create topup request payload
 */
export interface CreateTopupRequest {
  wallet_id: string | number
  amount: number
  reason: string
  payment_method?: string
}

/**
 * Approve topup request payload
 */
export interface ApproveTopupRequest {
  topup_request_id: string | number
  notes?: string
}

/**
 * Reject topup request payload
 */
export interface RejectTopupRequest {
  topup_request_id: string | number
  reason: string
}

/**
 * Wallet filter parameters
 */
export interface WalletFilters {
  status?: 'active' | 'inactive' | 'frozen'
  holder_id?: string | number
  holder_type?: 'purchaser' | 'vendor'
}

/**
 * Transaction filter parameters
 */
export interface TransactionFilters {
  wallet_id?: string | number
  type?: TransactionType
  status?: TransactionStatus
  date_from?: string
  date_to?: string
  min_amount?: number
  max_amount?: number
}
