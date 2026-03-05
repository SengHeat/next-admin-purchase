import { api } from '@/lib/api'
import {
  OrderIssue,
  CreateIssueRequest,
  UpdateIssueRequest,
  ResolveIssueRequest,
  AddIssueCommentRequest,
} from '@/types/order-issue.types'
import { ApiResponse, ListResponse } from '@/types/api.types'

export const orderIssueService = {
  getIssues: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/order-issues', { params })
    return response as ListResponse
  },

  getIssueById: async (id: string | number): Promise<OrderIssue> => {
    const response = await api.get<any, ApiResponse<OrderIssue>>(`/order-issues/${id}`)
    return response.data as OrderIssue
  },

  createIssue: async (data: CreateIssueRequest): Promise<OrderIssue> => {
    const response = await api.post<any, ApiResponse<OrderIssue>>('/order-issues', data)
    return response.data as OrderIssue
  },

  updateIssue: async (data: UpdateIssueRequest): Promise<OrderIssue> => {
    const response = await api.put<any, ApiResponse<OrderIssue>>(
      `/order-issues/${data.issue_id}`,
      data,
    )
    return response.data as OrderIssue
  },

  resolveIssue: async (data: ResolveIssueRequest): Promise<OrderIssue> => {
    const response = await api.post<any, ApiResponse<OrderIssue>>(
      `/order-issues/${data.issue_id}/resolve`,
      data,
    )
    return response.data as OrderIssue
  },

  getPendingIssues: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/order-issues/pending', { params })
    return response as ListResponse
  },

  getMyIssues: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/order-issues/my-issues', { params })
    return response as ListResponse
  },

  addComment: async (data: AddIssueCommentRequest): Promise<any> => {
    const response = await api.post<any, ApiResponse>(
      `/order-issues/${data.issue_id}/comments`,
      data,
    )
    return response.data
  },
}
