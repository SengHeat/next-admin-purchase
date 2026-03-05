import { cn } from '@/lib/utils'
import { Badge } from './badge'

export interface StatusBadgeProps {
  status: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}

/**
 * Status badge component for displaying status with colors
 */
export function StatusBadge({ status, variant = 'default', className }: StatusBadgeProps) {
  const variantClasses: Record<string, string> = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  }

  // Auto-detect variant based on status
  let autoVariant = variant
  if (variant === 'default') {
    const statusLower = status.toLowerCase()
    if (statusLower.includes('completed') || statusLower.includes('approved') || statusLower.includes('active')) {
      autoVariant = 'success'
    } else if (statusLower.includes('pending') || statusLower.includes('on_hold') || statusLower.includes('warning')) {
      autoVariant = 'warning'
    } else if (statusLower.includes('rejected') || statusLower.includes('cancelled') || statusLower.includes('error')) {
      autoVariant = 'error'
    } else if (statusLower.includes('progress') || statusLower.includes('info')) {
      autoVariant = 'info'
    }
  }

  const displayStatus = status
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return (
    <Badge
      variant="outline"
      className={cn(variantClasses[autoVariant], className)}
    >
      {displayStatus}
    </Badge>
  )
}
