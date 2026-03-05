// components/purchasers/SearchBar.tsx
'use client'

interface Props {
    value:     string
    perPage:   number
    hasSearch: boolean
    onChange:  (v: string) => void
    onSubmit:  (e: React.FormEvent) => void
    onClear:   () => void
    onPerPage: (n: number) => void
}

export function SearchBar({ value, perPage, hasSearch, onChange, onSubmit, onClear, onPerPage }: Props) {
    return (
        <form onSubmit={onSubmit} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search name, team…"
                style={{
                    flex:         1,
                    padding:      '9px 14px',
                    fontSize:     13,
                    border:       '1px solid #1e2530',
                    borderRadius: 8,
                    background:   '#0d1420',
                    color:        '#e2e8f0',
                    outline:      'none',
                }}
            />
            <select
                value={perPage}
                onChange={(e) => onPerPage(Number(e.target.value))}
                style={{
                    padding:      '9px 12px',
                    fontSize:     13,
                    border:       '1px solid #1e2530',
                    borderRadius: 8,
                    background:   '#0d1420',
                    color:        '#94a3b8',
                    cursor:       'pointer',
                }}
            >
                {[10, 20, 50].map((n) => (
                    <option key={n} value={n}>{n} / page</option>
                ))}
            </select>
            <button type="submit" style={{
                padding:      '9px 20px',
                fontSize:     13,
                fontWeight:   600,
                background:   '#2563eb',
                color:        '#fff',
                border:       'none',
                borderRadius: 8,
                cursor:       'pointer',
            }}>
                Search
            </button>
            {hasSearch && (
                <button type="button" onClick={onClear} style={{
                    padding:      '9px 14px',
                    fontSize:     13,
                    background:   'transparent',
                    color:        '#64748b',
                    border:       '1px solid #1e2530',
                    borderRadius: 8,
                    cursor:       'pointer',
                }}>
                    ✕ Clear
                </button>
            )}
        </form>
    )
}