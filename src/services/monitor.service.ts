import { api } from '@/lib/api'
import {
  DashboardStats,
  OrderReport,
  BargainingReport,
  WalletTransactionReport,
  PurchaserPerformanceReport,
  AuditLog,
  GenerateReportRequest,
} from '@/types/monitor.types'
import { ApiResponse, ListResponse } from '@/types/api.types'

export const monitorService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get<any, ApiResponse<DashboardStats>>('/monitor/dashboard/stats')
    return response.data as DashboardStats
  },

  getOrderReports: async (params?: any): Promise<OrderReport[]> => {
    const response = await api.get<any, ApiResponse<OrderReport[]>>(
      '/monitor/reports/orders',
      { params },
    )
    return response.data as OrderReport[]
  },

  getBargainingReports: async (params?: any): Promise<BargainingReport[]> => {
    const response = await api.get<any, ApiResponse<BargainingReport[]>>(
      '/monitor/reports/bargaining',
      { params },
    )
    return response.data as BargainingReport[]
  },

  getWalletReports: async (params?: any): Promise<WalletTransactionReport[]> => {
    const response = await api.get<any, ApiResponse<WalletTransactionReport[]>>(
      '/monitor/reports/wallet-transactions',
      { params },
    )
    return response.data as WalletTransactionReport[]
  },

  getPurchaserPerformance: async (params?: any): Promise<PurchaserPerformanceReport[]> => {
    const response = await api.get<any, ApiResponse<PurchaserPerformanceReport[]>>(
      '/monitor/reports/purchaser-performance',
      { params },
    )
    return response.data as PurchaserPerformanceReport[]
  },

  getDailySpendingReports: async (params?: any): Promise<any> => {
    const response = await api.get<any, ApiResponse>(
      '/monitor/reports/daily-spending',
      { params },
    )
    return response.data
  },

  getAuditLogs: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/monitor/audit/logs', { params })
    return response as ListResponse
  },

  getPendingApprovals: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/monitor/audit/pending-approvals', { params })
    return response as ListResponse
  },

  generateReport: async (data: GenerateReportRequest): Promise<Blob> => {
    const response = await api.post('/monitor/reports/generate', data, {
      responseType: 'blob',
    })
    return response as any
  },
}
