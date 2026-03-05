import { BaseEntity } from './api.types'

/**
 * Dashboard overview statistics
 */
export interface DashboardStats {
  total_orders: number
  pending_orders: number
  completed_orders: number
  total_bargainings: number
  pending_bargainings: number
  total_wallet_balance: number
  total_issues: number
  unresolved_issues: number
  today_orders: number
  week_orders: number
  month_orders: number
}

/**
 * Order report data
 */
export interface OrderReport {
  date: string
  total_orders: number
  total_amount: number
  average_order_value: number
  completed_orders: number
  pending_orders: number
  cancelled_orders: number
}

/**
 * Bargaining report data
 */
export interface BargainingReport {
  date: string
  total_bargainings: number
  total_savings: number
  average_discount_percentage: number
  approved_bargainings: number
  pending_bargainings: number
  rejected_bargainings: number
}

/**
 * Wallet transaction report data
 */
export interface WalletTransactionReport {
  date: string
  total_transactions: number
  total_credits: number
  total_debits: number
  average_transaction_value: number
  transaction_count_by_type: Record<string, number>
}

/**
 * Purchaser performance report
 */
export interface PurchaserPerformanceReport {
  purchaser_id: string | number
  purchaser_name: string
  total_orders: number
  total_spent: number
  average_order_value: number
  on_time_delivery_rate: number
  quality_score: number
  payment_on_time_rate: number
  issue_count: number
  average_issue_resolution_time: number
  trend: 'up' | 'down' | 'stable'
}

/**
 * Daily spending report
 */
export interface DailySpendingReport {
  date: string
  total_spending: number
  by_category: Record<string, number>
  top_vendors: Array<{
    vendor_name: string
    amount: number
    order_count: number
  }>
}

/**
 * Audit log entry
 */
export interface AuditLog extends BaseEntity {
  action: string
  entity_type: string
  entity_id: string | number
  user_id: string | number
  user_name: string
  previous_values?: Record<string, any>
  new_values?: Record<string, any>
  ip_address?: string
  user_agent?: string
  status: 'success' | 'failed'
  error_message?: string
}

/**
 * Audit filter parameters
 */
export interface AuditFilters {
  action?: string
  entity_type?: string
  user_id?: string | number
  status?: 'success' | 'failed'
  date_from?: string
  date_to?: string
}

/**
 * Queue status entity
 */
export interface QueueStatus extends BaseEntity {
  queue_name: string
  total_items: number
  pending_items: number
  in_progress_items: number
  completed_items: number
  average_processing_time: number
  longest_waiting_item_time: number
}

/**
 * Performance metric entity
 */
export interface PerformanceMetric extends BaseEntity {
  metric_name: string
  metric_value: number
  metric_unit: string
  threshold_value?: number
  status: 'healthy' | 'warning' | 'critical'
  date: string
}

/**
 * Report export format
 */
export type ExportFormat = 'pdf' | 'csv' | 'excel' | 'json'

/**
 * Report request parameters
 */
export interface GenerateReportRequest {
  report_type: string
  date_from: string
  date_to: string
  format: ExportFormat
  filters?: Record<string, any>
}
