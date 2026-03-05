import { api } from '@/lib/api'
import {
  Bargaining,
  CreateBargainingRequest,
  ApproveBargainingRequest,
  RejectBargainingRequest,
  BargainingFilters,
} from '@/types/bargaining.types'
import { ApiResponse, ListResponse } from '@/types/api.types'

/**
 * Bargaining service
 */
export const bargainingService = {
  /**
   * Get all bargainings with pagination and filters
   */
  getBargainings: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/bargainings', { params })
    return response as ListResponse
  },

  /**
   * Get single bargaining by ID
   */
  getBargainingById: async (id: string | number): Promise<Bargaining> => {
    const response = await api.get<any, ApiResponse<Bargaining>>(`/bargainings/${id}`)
    return response.data as Bargaining
  },

  /**
   * Create new bargaining
   */
  createBargaining: async (data: CreateBargainingRequest): Promise<Bargaining> => {
    const response = await api.post<any, ApiResponse<Bargaining>>('/bargainings', data)
    return response.data as Bargaining
  },

  /**
   * Approve bargaining
   */
  approveBargaining: async (data: ApproveBargainingRequest): Promise<Bargaining> => {
    const response = await api.post<any, ApiResponse<Bargaining>>(
      `/bargainings/${data.bargaining_id}/approve`,
      data,
    )
    return response.data as Bargaining
  },

  /**
   * Reject bargaining
   */
  rejectBargaining: async (data: RejectBargainingRequest): Promise<Bargaining> => {
    const response = await api.post<any, ApiResponse<Bargaining>>(
      `/bargainings/${data.bargaining_id}/reject`,
      data,
    )
    return response.data as Bargaining
  },

  /**
   * Get pending bargainings for approval
   */
  getPendingBargainings: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/bargainings/pending', { params })
    return response as ListResponse
  },

  /**
   * Get my bargaining submissions
   */
  getMySubmissions: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/bargainings/my-submissions', { params })
    return response as ListResponse
  },

  /**
   * Submit counter proposal
   */
  submitCounterProposal: async (
    id: string | number,
    counter_proposal: string,
  ): Promise<Bargaining> => {
    const response = await api.post<any, ApiResponse<Bargaining>>(
      `/bargainings/${id}/counter-proposal`,
      { counter_proposal },
    )
    return response.data as Bargaining
  },
}
