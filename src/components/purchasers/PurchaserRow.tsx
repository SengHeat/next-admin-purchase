// components/purchasers/PurchaserRow.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter }      from 'next/navigation'
import { EnableBadge }    from './EnableBadge'
import type { Purchaser } from 'src/types/purchaser.types'

interface Props {
    purchaser: Purchaser
    onDelete:  (p: Purchaser) => void
    onEdit?:   (p: Purchaser) => void
    onToggle?: (p: Purchaser, enabled: boolean) => void
    deleting:  boolean
}

export function PurchaserRow({ purchaser: p, onDelete, onEdit, onToggle, deleting }: Props) {
    const [hovered,  setHovered]  = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const router  = useRouter()

    useEffect(() => {
        if (!menuOpen) return
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node))
                setMenuOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [menuOpen])

    const menuItems = [
        {
            label:   'View Details',
            icon:    (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
            ),
            color:   '#60a5fa',
            hover:   '#1e3a5f',
            onClick: () => { router.push(`/purchasers/${p.id}`); setMenuOpen(false) },
        },
        {
            label:   'Edit',
            icon:    (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
            ),
            color:   '#fbbf24',
            hover:   '#3d2e0a',
            onClick: () => { onEdit?.(p); setMenuOpen(false) },
        },
        { divider: true },
        {
            label:    deleting ? 'Deleting…' : 'Delete',
            icon:     (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
            ),
            color:    '#f87171',
            hover:    '#3d1a1a',
            danger:   true,
            disabled: deleting,
            onClick:  () => { onDelete(p); setMenuOpen(false) },
        },
    ]

    return (
        <tr
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                borderBottom: '1px solid #23293a',
                background:   hovered ? '#181f2e' : 'transparent',
                transition:   'background 0.15s',
            }}
        >
            {/* ID */}
            <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#e2e8f0' }}>
                    #{p.id}
                </span>
            </td>

            {/* Name */}
            <td style={{ padding: '14px 20px' }}>
                <span style={{ fontSize: 14, color: '#cbd5e1' }}>
                    {p.purchase_name}
                </span>
            </td>

            {/* Team */}
            <td style={{ padding: '14px 20px' }}>
                <span style={{ fontSize: 14, color: '#94a3b8' }}>
                    {p.team ?? <span style={{ color: '#334155' }}>—</span>}
                </span>
            </td>

            {/* Active Orders / Max */}
            <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#4ade80' }}>
                    {p.active_orders_count}
                </span>
                <span style={{ fontSize: 14, color: '#475569' }}>
                    {' / '}{p.max_orders_per_day}
                </span>
            </td>

            {/* CNY */}
            <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 14, color: '#94a3b8' }}>
                    {p.daily_totals.cny.toLocaleString()}
                </span>
                <span style={{ fontSize: 14, color: '#334155' }}>
                    {' / '}{p.daily_limits.cny.toLocaleString()}
                </span>
            </td>

            {/* THB */}
            <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 14, color: '#94a3b8' }}>
                    {p.daily_totals.thb.toLocaleString()}
                </span>
                <span style={{ fontSize: 14, color: '#334155' }}>
                    {' / '}{p.daily_limits.thb.toLocaleString()}
                </span>
            </td>

            {/* USD */}
            <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 14, color: '#94a3b8' }}>
                    {p.daily_totals.usd.toLocaleString()}
                </span>
                <span style={{ fontSize: 14, color: '#334155' }}>
                    {' / '}{p.daily_limits.usd.toLocaleString()}
                </span>
            </td>

            {/* Status */}
            <td style={{ padding: '14px 20px' }}>
                <EnableBadge
                    enable={p.enable}
                    onChange={(enabled) => onToggle?.(p, enabled)}
                />
            </td>

            {/* Actions */}
            <td style={{ padding: '14px 20px', whiteSpace: 'nowrap', textAlign: 'right' }}>
                <div ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>

                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        style={{
                            display:      'flex',
                            alignItems:   'center',
                            gap:          6,
                            padding:      '6px 12px',
                            borderRadius: 6,
                            fontSize:     13,
                            fontWeight:   500,
                            border:       `1px solid ${menuOpen ? '#3b4a63' : '#23293a'}`,
                            background:   menuOpen ? '#1e2a3a' : hovered ? '#1a2235' : 'transparent',
                            color:        menuOpen ? '#e2e8f0' : '#94a3b8',
                            cursor:       'pointer',
                            transition:   'all 0.15s',
                            whiteSpace:   'nowrap',
                        }}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="5"  r="1.5" fill="currentColor" stroke="none"/>
                            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
                            <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/>
                        </svg>
                        Actions
                        <svg
                            width="10" height="10" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round"
                            style={{ transition: 'transform 0.15s', transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </button>

                    {menuOpen && (
                        <div style={{
                            position:     'absolute',
                            top:          'calc(100% + 6px)',
                            right:        0,
                            zIndex:       100,
                            minWidth:     168,
                            background:   '#141c2b',
                            border:       '1px solid #2a3347',
                            borderRadius: 8,
                            boxShadow:    '0 12px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
                            overflow:     'hidden',
                            animation:    'dropFade 0.12s ease',
                        }}>
                            <style>{`
                                @keyframes dropFade {
                                    from { opacity:0; transform:translateY(-6px) scale(0.98) }
                                    to   { opacity:1; transform:translateY(0) scale(1) }
                                }
                            `}</style>
                            <div style={{ padding: '4px' }}>
                                {menuItems.map((item, i) =>
                                    'divider' in item ? (
                                        <div key={i} style={{ height: 1, background: '#23293a', margin: '4px 0' }} />
                                    ) : (
                                        <button
                                            key={item.label}
                                            disabled={'disabled' in item ? item.disabled : false}
                                            onClick={item.onClick}
                                            style={{
                                                display:      'flex',
                                                alignItems:   'center',
                                                gap:          10,
                                                width:        '100%',
                                                padding:      '8px 10px',
                                                borderRadius: 5,
                                                fontSize:     13,
                                                fontWeight:   500,
                                                background:   'transparent',
                                                border:       'none',
                                                color:        item.color,
                                                cursor:       ('disabled' in item && item.disabled) ? 'not-allowed' : 'pointer',
                                                opacity:      ('disabled' in item && item.disabled) ? 0.4 : 1,
                                                textAlign:    'left',
                                                transition:   'background 0.1s',
                                            }}
                                            onMouseEnter={e => {
                                                if (!('disabled' in item && item.disabled))
                                                    e.currentTarget.style.background = item.hover
                                            }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                                        >
                                            <span style={{ color: item.color, display: 'flex', flexShrink: 0 }}>
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    )
}