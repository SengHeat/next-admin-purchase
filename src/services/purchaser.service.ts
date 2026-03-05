import { api } from 'src/lib/api'
import { Purchaser, CreatePurchaserRequest, UpdatePurchaserRequest, PurchaserMetrics } from 'src/types/purchaser.types'
import { ApiResponse, ListResponse } from 'src/types/api.types'

export const purchaserService = {
  getPurchasers: async (params?: any): Promise<ListResponse<Purchaser>> => {
    const response = await api.get<any, ApiResponse>('/purchasers', { params })
    return response as ListResponse<Purchaser>
  },

  getPurchaserById: async (id: string | number): Promise<Purchaser> => {
    const response = await api.get<any, ApiResponse<Purchaser>>(`/purchasers/${id}`)
    return response.data as Purchaser
  },

  createPurchaser: async (data: CreatePurchaserRequest): Promise<Purchaser> => {
    const response = await api.post<any, ApiResponse<Purchaser>>('/purchasers', data)
    return response.data as Purchaser
  },

  updatePurchaser: async (data: UpdatePurchaserRequest): Promise<Purchaser> => {
    const response = await api.put<any, ApiResponse<Purchaser>>(
      `/purchasers/${data.purchaser_id}`,
      data,
    )
    return response.data as Purchaser
  },

  getPurchaserMetrics: async (id: string | number): Promise<PurchaserMetrics> => {
    const response = await api.get<any, ApiResponse<PurchaserMetrics>>(
      `/purchasers/${id}/metrics`,
    )
    return response.data as PurchaserMetrics
  },

  getAvailablePurchasers: async (params?: any): Promise<ListResponse<Purchaser>> => {
    const response = await api.get<any, ApiResponse>('/purchasers/available', { params })
    return response as ListResponse<Purchaser>
  },
}
