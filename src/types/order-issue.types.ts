import { BaseEntity } from './api.types'

/**
 * Issue type enumeration
 */
export enum IssueType {
  DELAY = 'delay',
  QUALITY = 'quality',
  QUANTITY = 'quantity',
  DAMAGE = 'damage',
  MISSING_ITEMS = 'missing_items',
  WRONG_ITEM = 'wrong_item',
  PRICE_MISMATCH = 'price_mismatch',
  DOCUMENTATION = 'documentation',
  OTHER = 'other',
}

/**
 * Issue severity enumeration
 */
export enum IssueSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Issue status enumeration
 */
export enum IssueStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
  ESCALATED = 'escalated',
}

/**
 * Issue entity
 */
export interface OrderIssue extends BaseEntity {
  issue_number: string
  order_id: string | number
  order_number?: string
  reported_by_id: string | number
  reported_by_name: string
  issue_type: IssueType
  severity: IssueSeverity
  status: IssueStatus
  title: string
  description: string
  expected_resolution: string
  assigned_to_id?: string | number
  assigned_to_name?: string
  resolution?: string | null
  resolved_at?: string | null
  resolution_notes?: string
  attachments?: string[]
}

/**
 * Issue comment entity
 */
export interface IssueComment extends BaseEntity {
  issue_id: string | number
  commented_by_id: string | number
  commented_by_name: string
  comment: string
  attachments?: string[]
}

/**
 * Issue activity log entity
 */
export interface IssueActivity extends BaseEntity {
  issue_id: string | number
  action: string
  previous_value?: string
  new_value?: string
  changed_by_id: string | number
  changed_by_name: string
  description?: string
}

/**
 * Create issue request
 */
export interface CreateIssueRequest {
  order_id: string | number
  issue_type: IssueType
  severity: IssueSeverity
  title: string
  description: string
  expected_resolution: string
  attachments?: File[]
}

/**
 * Update issue request
 */
export interface UpdateIssueRequest {
  issue_id: string | number
  status?: IssueStatus
  assigned_to_id?: string | number
  severity?: IssueSeverity
  title?: string
  description?: string
  expected_resolution?: string
}

/**
 * Resolve issue request
 */
export interface ResolveIssueRequest {
  issue_id: string | number
  resolution: string
  resolution_notes?: string
}

/**
 * Add issue comment request
 */
export interface AddIssueCommentRequest {
  issue_id: string | number
  comment: string
  attachments?: File[]
}

/**
 * Issue filter parameters
 */
export interface IssueFilters {
  status?: IssueStatus
  issue_type?: IssueType
  severity?: IssueSeverity
  reported_by_id?: string | number
  assigned_to_id?: string | number
  order_id?: string | number
  date_from?: string
  date_to?: string
}
