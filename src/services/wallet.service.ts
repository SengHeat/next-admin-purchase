import { api } from '@/lib/api'
import {
  Wallet,
  Transaction,
  TopupRequest,
  CreateTopupRequest,
  ApproveTopupRequest,
  RejectTopupRequest,
} from '@/types/wallet.types'
import { ApiResponse, ListResponse } from '@/types/api.types'

/**
 * Wallet service
 */
export const walletService = {
  /**
   * Get all wallets
   */
  getWallets: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/wallets', { params })
    return response as ListResponse
  },

  /**
   * Get wallet by ID
   */
  getWalletById: async (id: string | number): Promise<Wallet> => {
    const response = await api.get<any, ApiResponse<Wallet>>(`/wallets/${id}`)
    return response.data as Wallet
  },

  /**
   * Get wallet transactions
   */
  getTransactions: async (walletId: string | number, params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>(
      `/wallets/${walletId}/transactions`,
      { params },
    )
    return response as ListResponse
  },

  /**
   * Create topup request
   */
  createTopupRequest: async (data: CreateTopupRequest): Promise<TopupRequest> => {
    const response = await api.post<any, ApiResponse<TopupRequest>>('/wallets/topup/request', data)
    return response.data as TopupRequest
  },

  /**
   * Get topup requests
   */
  getTopupRequests: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/wallets/topup/requests', { params })
    return response as ListResponse
  },

  /**
   * Approve topup request
   */
  approveTopupRequest: async (data: ApproveTopupRequest): Promise<TopupRequest> => {
    const response = await api.post<any, ApiResponse<TopupRequest>>(
      `/wallets/topup/approve`,
      data,
    )
    return response.data as TopupRequest
  },

  /**
   * Reject topup request
   */
  rejectTopupRequest: async (data: RejectTopupRequest): Promise<TopupRequest> => {
    const response = await api.post<any, ApiResponse<TopupRequest>>(
      `/wallets/topup/reject`,
      data,
    )
    return response.data as TopupRequest
  },
}
