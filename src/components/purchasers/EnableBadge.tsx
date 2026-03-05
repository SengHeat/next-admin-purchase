// components/purchasers/EnableBadge.tsx
'use client'

import { useState } from 'react'

interface Props {
    enable:     boolean
    onChange?:  (enabled: boolean) => void
    disabled?:  boolean
}

export function EnableBadge({ enable, onChange, disabled = false }: Props) {
    const [hovered, setHovered] = useState(false)

    const handleClick = () => {
        if (!disabled) onChange?.(!enable)
    }

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            title={enable ? 'Click to disable' : 'Click to enable'}
            style={{
                display:    'inline-flex',
                alignItems: 'center',
                gap:        8,
                background: 'none',
                border:     'none',
                padding:    0,
                cursor:     disabled ? 'not-allowed' : 'pointer',
                opacity:    disabled ? 0.5 : 1,
            }}
        >
            {/* Track */}
            <div style={{
                position:     'relative',
                width:        36,
                height:       20,
                borderRadius: 999,
                background:   enable
                    ? hovered ? '#16a34a' : '#15803d'
                    : hovered ? '#374151' : '#1f2937',
                border:       `1px solid ${enable ? '#16a34a' : '#374151'}`,
                transition:   'background 0.2s, border-color 0.2s',
                flexShrink:   0,
            }}>
                {/* Thumb */}
                <div style={{
                    position:     'absolute',
                    top:          2,
                    left:         enable ? 17 : 2,
                    width:        14,
                    height:       14,
                    borderRadius: '50%',
                    background:   enable ? '#4ade80' : '#6b7280',
                    boxShadow:    enable ? '0 0 6px rgba(74,222,128,0.5)' : 'none',
                    transition:   'left 0.2s, background 0.2s, box-shadow 0.2s',
                }} />
            </div>

            {/* Label */}
            <span style={{
                fontSize:   12,
                fontWeight: 500,
                color:      enable ? '#4ade80' : '#6b7280',
                transition: 'color 0.2s',
                userSelect: 'none',
            }}>
                {enable ? 'Active' : 'Inactive'}
            </span>
        </button>
    )
}