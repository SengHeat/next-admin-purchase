// components/purchasers/PaginationBar.tsx
'use client'

import { useMemo }             from 'react'
import type { PaginationMeta } from 'src/types/api.types'

const PER_PAGE_OPTIONS = [15, 30, 50]

interface Props {
    meta:             PaginationMeta
    onPageChange:     (page: number) => void
    onPerPageChange?: (perPage: number) => void
    perPage?:         number
}

export function PaginationBar({ meta: m, onPageChange, onPerPageChange, perPage = 15 }: Props) {
    const pageLinks = useMemo(() => {
        const seen = new Set<number>()
        return m.links.filter((l) => {
            if (l.page === null || seen.has(l.page)) return false
            seen.add(l.page)
            return true
        })
    }, [m.links])

    const isPrevDisabled = m.current_page === 1
    const isNextDisabled = m.current_page === m.last_page

    const navBtn = (disabled: boolean): React.CSSProperties => ({
        width:          34,
        height:         34,
        borderRadius:   8,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        border:         `1px solid ${disabled ? '#1a2235' : '#2a3347'}`,
        background:     disabled ? 'transparent' : '#1a2235',
        color:          disabled ? '#2a3347' : '#64748b',
        cursor:         disabled ? 'not-allowed' : 'pointer',
        transition:     'all 0.15s',
        flexShrink:     0,
        padding:        0,
    })

    return (
        <>
            <style>{`
                .pg-btn:hover { background: #1e2a3a !important; border-color: #3b4a63 !important; color: #e2e8f0 !important; }
                .pg-nav:not([disabled]):hover { background: #1e2a3a !important; border-color: #3b4a63 !important; color: #94a3b8 !important; }
                .pg-perpage { appearance: none; -webkit-appearance: none; }
                .pg-perpage:focus { outline: none; border-color: #2563eb !important; box-shadow: 0 0 0 2px rgba(37,99,235,0.2); }
                .pg-perpage option { background: #1a2235; color: #e2e8f0; }
            `}</style>

            <div style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                padding:        '16px 2px 4px',
                fontSize:       13,
            }}>

                {/* Left — info + per page */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

                    {/* Showing info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569' }}>
                        <span>Showing</span>
                        <span style={{
                            background:   '#1a2235',
                            border:       '1px solid #23293a',
                            borderRadius: 5,
                            padding:      '2px 8px',
                            fontWeight:   600,
                            color:        '#e2e8f0',
                            fontSize:     12,
                        }}>
                            {m.from}–{m.to}
                        </span>
                        <span>of</span>
                        <span style={{ fontWeight: 600, color: '#94a3b8' }}>{m.total}</span>
                        <span>purchasers</span>
                    </div>

                    {/* Divider */}
                    <div style={{ width: 1, height: 16, background: '#23293a' }} />

                    {/* Per page */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: '#475569' }}>Rows per page</span>
                        <div style={{ position: 'relative' }}>
                            <select
                                className="pg-perpage"
                                value={perPage}
                                onChange={(e) => onPerPageChange?.(Number(e.target.value))}
                                style={{
                                    height:       32,
                                    padding:      '0 28px 0 10px',
                                    borderRadius: 7,
                                    fontSize:     13,
                                    fontWeight:   600,
                                    color:        '#e2e8f0',
                                    background:   '#1a2235',
                                    border:       '1px solid #2a3347',
                                    cursor:       'pointer',
                                    transition:   'border-color 0.15s, box-shadow 0.15s',
                                }}
                            >
                                {PER_PAGE_OPTIONS.map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                            <svg
                                width="10" height="10"
                                viewBox="0 0 24 24"
                                fill="none" stroke="#64748b" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round"
                                style={{
                                    position:      'absolute',
                                    right:         8,
                                    top:           '50%',
                                    transform:     'translateY(-50%)',
                                    pointerEvents: 'none',
                                }}
                            >
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right — pagination controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

                    <span style={{ fontSize: 12, color: '#475569', marginRight: 4 }}>
                        Page <b style={{ color: '#94a3b8' }}>{m.current_page}</b> / <b style={{ color: '#64748b' }}>{m.last_page}</b>
                    </span>

                    <button
                        className="pg-nav"
                        disabled={isPrevDisabled}
                        onClick={() => !isPrevDisabled && onPageChange(m.current_page - 1)}
                        style={navBtn(isPrevDisabled)}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                    </button>

                    <div style={{ display: 'flex', gap: 3 }}>
                        {pageLinks.map((l) => (
                            <button
                                key={l.page}
                                className={l.active ? undefined : 'pg-btn'}
                                onClick={() => onPageChange(l.page!)}
                                style={{
                                    width:          34,
                                    height:         34,
                                    borderRadius:   8,
                                    fontSize:       13,
                                    fontWeight:     l.active ? 700 : 500,
                                    display:        'flex',
                                    alignItems:     'center',
                                    justifyContent: 'center',
                                    border:         l.active ? 'none' : '1px solid #2a3347',
                                    background:     l.active ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#141c2b',
                                    color:          l.active ? '#fff' : '#64748b',
                                    cursor:         'pointer',
                                    transition:     'all 0.15s',
                                    boxShadow:      l.active ? '0 2px 8px rgba(37,99,235,0.4)' : 'none',
                                    flexShrink:     0,
                                    padding:        0,
                                }}
                            >
                                {l.page}
                            </button>
                        ))}
                    </div>

                    <button
                        className="pg-nav"
                        disabled={isNextDisabled}
                        onClick={() => !isNextDisabled && onPageChange(m.current_page + 1)}
                        style={navBtn(isNextDisabled)}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    </button>

                </div>
            </div>
        </>
    )
}