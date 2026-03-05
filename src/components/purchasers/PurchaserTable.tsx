// components/purchasers/PurchaserTable.tsx
import { PurchaserRow }   from './PurchaserRow'
import { SkeletonRow }    from './SkeletonRow'
import { EmptyState }     from './EmptyState'
import type { Purchaser } from 'src/types/purchaser.types'

const COLUMNS = [
    { label: '#',       width: 70,  align: 'left'  as const },
    { label: 'Name',    width: 200, align: 'left'  as const },
    { label: 'Team',    width: 140, align: 'left'  as const },
    { label: 'Orders',  width: 120, align: 'left'  as const },
    { label: 'CNY',     width: 150, align: 'left'  as const },
    { label: 'THB',     width: 150, align: 'left'  as const },
    { label: 'USD',     width: 150, align: 'left'  as const },
    { label: 'Status',  width: 110, align: 'left'  as const },
    { label: 'Actions', width: 200, align: 'right' as const },
]

interface Props {
    items:      Purchaser[]
    loading:    boolean
    hasSearch:  boolean
    total?:     number
    onDelete:   (p: Purchaser) => void
    onEdit?:    (p: Purchaser) => void
    onToggle?:  (p: Purchaser, enabled: boolean) => void
    deletingId: number | null
}

export function PurchaserTable({ items, loading, hasSearch, total, onDelete, onEdit, onToggle, deletingId }: Props) {
    return (
        <div style={{
            background:   '#141c2b',
            borderRadius: 12,
            border:       '1px solid #23293a',
            overflow:     'hidden',
        }}>
            <div style={{ padding: '16px 20px 12px' }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>
                    All Purchasers
                </h2>
                {!loading && total != null && (
                    <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
                        {total} {total === 1 ? 'purchaser' : 'purchasers'} found
                    </p>
                )}
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
                    <thead>
                    <tr style={{ borderTop: '1px solid #23293a', borderBottom: '1px solid #23293a' }}>
                        {COLUMNS.map(({ label, width, align }) => (
                            <th key={label} style={{
                                padding:    '11px 20px',
                                textAlign:  align,
                                fontSize:   13,
                                fontWeight: 600,
                                color:      '#64748b',
                                width,
                                whiteSpace: 'nowrap',
                                background: '#141c2b',
                            }}>
                                {label}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {loading ? (
                        Array.from({ length: 14 }).map((_, i) => <SkeletonRow key={i} />)
                    ) : items.length === 0 ? (
                        <EmptyState hasSearch={hasSearch} />
                    ) : (
                        items.map((p) => (
                            <PurchaserRow
                                key={p.id}
                                purchaser={p}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onToggle={onToggle}
                                deleting={deletingId === p.id}
                            />
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}