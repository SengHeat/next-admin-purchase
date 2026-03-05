import React from 'react'
import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  action?: React.ReactNode
}

/**
 * Page container wrapper component
 */
export function PageContainer({
  children,
  className,
  title,
  description,
  action,
}: PageContainerProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      {(title || action) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h1 className="text-3xl font-bold tracking-tight">{title}</h1>}
            {description && <p className="text-muted-foreground mt-2">{description}</p>}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  )
}
