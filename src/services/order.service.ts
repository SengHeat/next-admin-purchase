import { api } from '@/lib/api'
import { Order, OrderAssignment, CreateOrderRequest, OrderFilters, OrderTimeline } from '@/types/order.types'
import { ApiResponse, ListResponse } from '@/types/api.types'

/**
 * Order service
 */
export const orderService = {
  /**
   * Get all orders with pagination and filters
   */
  getOrders: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/orders', { params })
    return response as ListResponse
  },

  /**
   * Get single order by ID
   */
  getOrderById: async (id: string | number): Promise<Order> => {
    const response = await api.get<any, ApiResponse<Order>>(`/orders/${id}`)
    return response.data as Order
  },

  /**
   * Create new order
   */
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await api.post<any, ApiResponse<Order>>('/orders', data)
    return response.data as Order
  },

  /**
   * Update order
   */
  updateOrder: async (id: string | number, data: Partial<Order>): Promise<Order> => {
    const response = await api.put<any, ApiResponse<Order>>(`/orders/${id}`, data)
    return response.data as Order
  },

  /**
   * Get order timeline
   */
  getOrderTimeline: async (id: string | number): Promise<OrderTimeline[]> => {
    const response = await api.get<any, ApiResponse<OrderTimeline[]>>(`/orders/${id}/timeline`)
    return response.data as OrderTimeline[]
  },

  /**
   * Assign order to user
   */
  assignOrder: async (data: OrderAssignment): Promise<Order> => {
    const response = await api.post<any, ApiResponse<Order>>('/orders/assign', data)
    return response.data as Order
  },

  /**
   * Cancel order
   */
  cancelOrder: async (id: string | number, reason?: string): Promise<Order> => {
    const response = await api.post<any, ApiResponse<Order>>(`/orders/${id}/cancel`, { reason })
    return response.data as Order
  },

  /**
   * Approve order
   */
  approveOrder: async (id: string | number, notes?: string): Promise<Order> => {
    const response = await api.post<any, ApiResponse<Order>>(`/orders/${id}/approve`, { notes })
    return response.data as Order
  },

  /**
   * Reject order
   */
  rejectOrder: async (id: string | number, reason: string): Promise<Order> => {
    const response = await api.post<any, ApiResponse<Order>>(`/orders/${id}/reject`, { reason })
    return response.data as Order
  },

  /**
   * Get my orders (assigned to current user)
   */
  getMyOrders: async (params?: any): Promise<ListResponse> => {
    const response = await api.get<any, ApiResponse>('/orders/my-queue', { params })
    return response as ListResponse
  },
}
