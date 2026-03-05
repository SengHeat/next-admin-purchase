// components/purchasers/EmptyState.tsx
interface Props { hasSearch: boolean }

export function EmptyState({ hasSearch }: Props) {
    return (
        <tr>
            <td colSpan={9}>
                <div style={{
                    padding:       '72px 0',
                    textAlign:     'center',
                    display:       'flex',
                    flexDirection: 'column',
                    alignItems:    'center',
                    gap:           12,
                }}>
                    <span style={{ fontSize: 36 }}>{hasSearch ? '🔍' : '📭'}</span>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#e2e8f0' }}>
                        {hasSearch ? 'No results found' : 'No purchasers yet'}
                    </p>
                    <p style={{ margin: 0, fontSize: 13, color: '#475569' }}>
                        {hasSearch
                            ? 'Try a different keyword or clear the filter.'
                            : 'Add your first purchaser to get started.'}
                    </p>
                </div>
            </td>
        </tr>
    )
}