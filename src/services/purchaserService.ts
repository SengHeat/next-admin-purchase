// services/purchaserService.ts
import { api } from 'src/lib/apiClient'
import type { Purchaser } from 'src/types/purchaser.types'

export interface PurchaserFilters {
  id?:     string | number
  name?:   string
  team?:   string
  status?: 'active' | 'inactive'
  enable?: boolean
}

export interface PurchaserQueryParams {
  page?:     number
  per_page?: number
  search?:   string
  filter?:   PurchaserFilters
}

export const purchaserService = {
  getAll(params?: PurchaserQueryParams) {
    return api.get(`/purchasers${buildQueryString(params ?? {})}`)
  },

  getById: (id: number): Promise<{ data: Purchaser; message: string }> =>
      api.get(`/purchasers/${id}`),

  create: (body: Partial<Purchaser>): Promise<{ data: Purchaser; message: string }> =>
      api.post('/purchasers', body),

  update: (id: number, body: Partial<Purchaser>): Promise<{ data: Purchaser; message: string }> =>
      api.put(`/purchasers/${id}`, body),

  remove: (id: number): Promise<{ message: string }> =>
      api.delete(`/purchasers/${id}`),
}

/**
 * Converts PurchaserQueryParams to URLSearchParams
 *
 * Output: ?page=1&per_page=15&search=kim&filter[id]=3&filter[team]=KH+Team&filter[enable]=true
 */
export function buildQueryString(params: PurchaserQueryParams): string {
  const q = new URLSearchParams()

  if (params.page     != null) q.set('page',     String(params.page))
  if (params.per_page != null) q.set('per_page', String(params.per_page))
  if (params.search)           q.set('search',   params.search)

  if (params.filter) {
    for (const [key, value] of Object.entries(params.filter)) {
      if (value != null && value !== '') {
        q.set(`filter[${key}]`, String(value))
      }
    }
  }

  return q.toString() ? `?${q.toString()}` : ''
}