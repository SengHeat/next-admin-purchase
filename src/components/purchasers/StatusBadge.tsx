// components/purchasers/StatusBadge.tsx
import { StatusType } from 'src/types/api.types'

const STYLE: Record<StatusType, { bg: string; dot: string; text: string }> = {
    [StatusType.PENDING]:     { bg: '#FFF7ED', dot: '#F59E0B', text: '#92400E' },
    [StatusType.APPROVED]:    { bg: '#F0FDF4', dot: '#22C55E', text: '#166534' },
    [StatusType.REJECTED]:    { bg: '#FEF2F2', dot: '#EF4444', text: '#991B1B' },
    [StatusType.COMPLETED]:   { bg: '#EFF6FF', dot: '#3B82F6', text: '#1E40AF' },
    [StatusType.CANCELLED]:   { bg: '#F9FAFB', dot: '#9CA3AF', text: '#374151' },
    [StatusType.IN_PROGRESS]: { bg: '#EEF2FF', dot: '#6366F1', text: '#3730A3' },
    [StatusType.ON_HOLD]:     { bg: '#FFF7ED', dot: '#F97316', text: '#9A3412' },
}

interface Props {
    status: StatusType
}

/**
 * StatusBadge({ status })
 * -----------------------
 * Coloured pill badge for any StatusType value.
 *
 * Usage:
 *   <StatusBadge status={purchaser.status} />
 */
export function StatusBadge({ status }: Props) {
    const s = STYLE[status] ?? STYLE[StatusType.PENDING]
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: s.bg,
                color: s.text,
                padding: '2px 10px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.03em',
                textTransform: 'capitalize',
                whiteSpace: 'nowrap',
            }}
        >
      <span
          style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: s.dot,
              flexShrink: 0,
          }}
      />
            {status.replace('_', ' ')}
    </span>
    )
}