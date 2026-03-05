import { BaseEntity, StatusType } from './api.types'

/**
 * Order status enumeration
 */
export enum OrderStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  IN_PROGRESS = 'in_progress',
  PARTIALLY_RECEIVED = 'partially_received',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  ON_HOLD = 'on_hold',
}

/**
 * Order priority levels
 */
export enum OrderPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

/**
 * Order item line
 */
export interface OrderItem {
  id: string | number
  order_id: string | number
  product_id: string | number
  product_name: string
  product_sku: string
  quantity: number
  unit_price: number
  total_price: number
  specification?: string
  received_quantity?: number
  status: OrderStatus
}

/**
 * Order entity
 */
export interface Order extends BaseEntity {
  order_number: string
  purchaser_id: string | number
  purchaser_name: string
  vendor_id?: string | number
  vendor_name?: string
  status: OrderStatus
  priority: OrderPriority
  total_amount: number
  currency: string
  expected_delivery: string
  actual_delivery?: string | null
  notes?: string
  items: OrderItem[]
  timeline?: OrderTimeline[]
  assigned_to_id?: string | number
  assigned_to_name?: string
  approval_by_id?: string | number
  approval_at?: string | null
}

/**
 * Order timeline entry
 */
export interface OrderTimeline extends BaseEntity {
  order_id: string | number
  event_type: string
  description: string
  changed_by_id: string | number
  changed_by_name: string
  previous_value?: string
  new_value?: string
}

/**
 * Order assignment
 */
export interface OrderAssignment {
  order_id: string | number
  assigned_to_id: string | number
  assigned_by_id: string | number
  notes?: string
}

/**
 * Create/Update order request
 */
export interface CreateOrderRequest {
  purchaser_id: string | number
  vendor_id?: string | number
  priority: OrderPriority
  expected_delivery: string
  notes?: string
  items: Array<{
    product_id: string | number
    quantity: number
    unit_price: number
    specification?: string
  }>
}

/**
 * Order filter parameters
 */
export interface OrderFilters {
  status?: OrderStatus
  priority?: OrderPriority
  purchaser_id?: string | number
  assigned_to_id?: string | number
  date_from?: string
  date_to?: string
}
