import type { BaseEntity, StatusType } from './api.types'

/**
 * Purchaser entity
 */
export interface DailyAmounts {
  cny: number
  thb: number
  usd: number
}

export interface DailyCurrencies {
  cny: number
  thb: number
  usd: number
}

export interface Purchaser {
  id:                  number
  user_id:             number
  purchase_name:       string
  team:                string | null
  active_orders_count: number
  max_orders_per_day:  number
  daily_limits:        DailyAmounts
  daily_totals:        DailyAmounts
  enable:              boolean
}

export type CreatePurchaserDto = {
  user_id:            number
  purchase_name:      string
  team?:              string | null
  max_orders_per_day: number
  daily_limits:       DailyCurrencies
  enable:             boolean
}

export type UpdatePurchaserDto = Partial<Omit<CreatePurchaserDto, 'user_id'>>