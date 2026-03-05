// components/purchasers/ErrorBanner.tsx

interface Props {
    error:   string
    onRetry: () => void
}

export function ErrorBanner({ error, onRetry }: Props) {
    return (
        <div style={{
            background:  '#FEF2F2',
            border:      '1px solid #FECACA',
            borderRadius: 10,
            padding:     '14px 18px',
            display:     'flex',
            alignItems:  'center',
            justifyContent: 'space-between',
            gap:         12,
        }}>
            <p style={{ margin: 0, fontWeight: 600, color: '#991B1B', fontSize: 13 }}>
                {error}
            </p>
            <button onClick={onRetry} style={{
                background:   '#EF4444',
                color:        '#fff',
                border:       'none',
                borderRadius: 6,
                padding:      '5px 14px',
                fontSize:     12,
                fontWeight:   600,
                cursor:       'pointer',
                flexShrink:   0,
            }}>
                Retry
            </button>
        </div>
    )
}