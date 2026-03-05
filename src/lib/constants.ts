import { UserRole, StatusType } from '@/types/api.types'
import { OrderStatus, OrderPriority } from '@/types/order.types'

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
}

/**
 * Authentication Routes
 */
export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
}

/**
 * Dashboard Routes
 */
export const DASHBOARD_ROUTES = {
  // Orders
  ORDERS: '/orders',
  ORDER_DETAIL: (id: string | number) => `/orders/${id}`,
  ORDER_TIMELINE: (id: string | number) => `/orders/${id}/timeline`,
  ORDER_ASSIGN: '/orders/assign',

  // Bargainings
  BARGAININGS: '/bargainings',
  BARGAINING_DETAIL: (id: string | number) => `/bargainings/${id}`,
  BARGAINING_PENDING: '/bargainings/pending',
  BARGAINING_SUBMISSIONS: '/bargainings/my-submissions',

  // Wallets
  WALLETS: '/wallets',
  WALLET_DETAIL: (id: string | number) => `/wallets/${id}`,
  WALLET_TRANSACTIONS: (id: string | number) => `/wallets/${id}/transactions`,
  WALLET_TOPUP_REQUEST: '/wallets/topup/request',
  WALLET_TOPUP_APPROVE: '/wallets/topup/approve',

  // Order Issues
  ORDER_ISSUES: '/order-issues',
  ISSUE_DETAIL: (id: string | number) => `/order-issues/${id}`,
  ISSUE_PENDING: '/order-issues/pending',
  ISSUE_MY_ISSUES: '/order-issues/my-issues',

  // Purchasers
  PURCHASERS: '/purchasers',
  PURCHASER_DETAIL: (id: string | number) => `/purchasers/${id}`,
  PURCHASER_AVAILABLE: '/purchasers/available',

  // Monitor
  MONITOR_DASHBOARD: '/monitor/dashboard',
  MONITOR_REPORTS_BARGAINING: '/monitor/reports/bargaining',
  MONITOR_REPORTS_WALLET: '/monitor/reports/wallet-transactions',
  MONITOR_REPORTS_PURCHASER: '/monitor/reports/purchaser-performance',
  MONITOR_REPORTS_SPENDING: '/monitor/reports/daily-spending',
  MONITOR_AUDIT_DASHBOARD: '/monitor/audit/dashboard',
  MONITOR_AUDIT_PENDING: '/monitor/audit/pending-approvals',
}

/**
 * User Role Labels
 */
export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrator',
  [UserRole.MANAGER]: 'Manager',
  [UserRole.PURCHASER]: 'Purchaser',
  [UserRole.VENDOR]: 'Vendor',
  [UserRole.ACCOUNTANT]: 'Accountant',
  [UserRole.AUDITOR]: 'Auditor',
}

/**
 * Status Labels and Colors
 */
export const STATUS_LABELS: Record<StatusType, string> = {
  [StatusType.PENDING]: 'Pending',
  [StatusType.APPROVED]: 'Approved',
  [StatusType.REJECTED]: 'Rejected',
  [StatusType.COMPLETED]: 'Completed',
  [StatusType.CANCELLED]: 'Cancelled',
  [StatusType.IN_PROGRESS]: 'In Progress',
  [StatusType.ON_HOLD]: 'On Hold',
}

/**
 * Order Status Labels and Colors
 */
export const ORDER_STATUS_LABELS: Record<OrderStatus, { label: string; color: string }> = {
  [OrderStatus.DRAFT]: { label: 'Draft', color: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100' },
  [OrderStatus.PENDING_APPROVAL]: { label: 'Pending Approval', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' },
  [OrderStatus.APPROVED]: { label: 'Approved', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' },
  [OrderStatus.IN_PROGRESS]: { label: 'In Progress', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100' },
  [OrderStatus.PARTIALLY_RECEIVED]: { label: 'Partially Received', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' },
  [OrderStatus.COMPLETED]: { label: 'Completed', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' },
  [OrderStatus.CANCELLED]: { label: 'Cancelled', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' },
  [OrderStatus.ON_HOLD]: { label: 'On Hold', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' },
}

/**
 * Order Priority Labels and Colors
 */
export const ORDER_PRIORITY_LABELS: Record<OrderPriority, { label: string; color: string }> = {
  [OrderPriority.LOW]: { label: 'Low', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' },
  [OrderPriority.MEDIUM]: { label: 'Medium', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' },
  [OrderPriority.HIGH]: { label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' },
  [OrderPriority.URGENT]: { label: 'Urgent', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' },
}

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
}

/**
 * Token storage key
 */
export const TOKEN_KEY = 'drsb_auth_token'

/**
 * Cache duration in minutes
 */
export const CACHE_DURATION = {
  SHORT: 5,
  MEDIUM: 15,
  LONG: 60,
}
