import { StatusBadge } from '@/components/ui/status-badge'
import { OrderStatus } from '@/types/order.types'

interface OrderStatusBadgeProps {
  status: OrderStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const variantMap: Record<OrderStatus, 'success' | 'warning' | 'error' | 'info'> = {
    [OrderStatus.DRAFT]: 'info',
    [OrderStatus.PENDING_APPROVAL]: 'warning',
    [OrderStatus.APPROVED]: 'info',
    [OrderStatus.IN_PROGRESS]: 'info',
    [OrderStatus.PARTIALLY_RECEIVED]: 'warning',
    [OrderStatus.COMPLETED]: 'success',
    [OrderStatus.CANCELLED]: 'error',
    [OrderStatus.ON_HOLD]: 'warning',
  }

  return <StatusBadge status={status} variant={variantMap[status]} />
}
