// components/purchasers/PurchaserFormModal.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import type { Purchaser, CreatePurchaserDto, UpdatePurchaserDto } from 'src/types/purchaser.types'

interface Props {
    open:       boolean
    purchaser?: Purchaser | null
    onClose:    () => void
    onSubmit:   (data: CreatePurchaserDto | UpdatePurchaserDto) => Promise<void>
}

interface FormState {
    purchase_name:      string
    team:               string
    user_id:            string
    max_orders_per_day: string
    daily_limits_cny:   string
    daily_limits_thb:   string
    daily_limits_usd:   string
    enable:             boolean
}

const EMPTY: FormState = {
    purchase_name:      '',
    team:               '',
    user_id:            '',
    max_orders_per_day: '100',
    daily_limits_cny:   '0',
    daily_limits_thb:   '0',
    daily_limits_usd:   '0',
    enable:             true,
}

function toFormState(p: Purchaser): FormState {
    return {
        purchase_name:      p.purchase_name,
        team:               p.team ?? '',
        user_id:            String(p.user_id),
        max_orders_per_day: String(p.max_orders_per_day),
        daily_limits_cny:   String(p.daily_limits.cny),
        daily_limits_thb:   String(p.daily_limits.thb),
        daily_limits_usd:   String(p.daily_limits.usd),
        enable:             p.enable,
    }
}

// ── Field ─────────────────────────────────────────────────────────────────────
function Field({
                   label, required, error, children,
               }: {
    label: string
    required?: boolean
    error?: string
    children: React.ReactNode
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#64748b', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                {label}{required && <span style={{ color: '#f87171', marginLeft: 3 }}>*</span>}
            </label>
            {children}
            {error && <span style={{ fontSize: 11, color: '#f87171' }}>{error}</span>}
        </div>
    )
}

// ── StyledInput ───────────────────────────────────────────────────────────────
function StyledInput({
                         value, onChange, placeholder, type = 'text', hasError, prefix,
                     }: {
    value:       string
    onChange:    (v: string) => void
    placeholder?: string
    type?:       string
    hasError?:   boolean
    prefix?:     string
}) {
    const [focused, setFocused] = useState(false)
    return (
        <div style={{ position: 'relative' }}>
            {prefix && (
                <span style={{
                    position:   'absolute',
                    left:       10,
                    top:        '50%',
                    transform:  'translateY(-50%)',
                    fontSize:   11,
                    fontWeight: 700,
                    color:      focused ? '#60a5fa' : '#475569',
                    transition: 'color 0.15s',
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}>
                    {prefix}
                </span>
            )}
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width:        '100%',
                    height:       38,
                    paddingLeft:  prefix ? 38 : 12,
                    paddingRight: 12,
                    borderRadius: 8,
                    fontSize:     13,
                    color:        '#e2e8f0',
                    background:   '#0d1421',
                    border:       `1px solid ${hasError ? '#f87171' : focused ? '#2563eb' : '#1e2a3a'}`,
                    outline:      'none',
                    boxSizing:    'border-box',
                    transition:   'border-color 0.15s, box-shadow 0.15s',
                    boxShadow:    focused ? `0 0 0 3px ${hasError ? 'rgba(248,113,113,0.15)' : 'rgba(37,99,235,0.15)'}` : 'none',
                }}
            />
        </div>
    )
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export function PurchaserFormModal({ open, purchaser, onClose, onSubmit }: Props) {
    const isEdit = !!purchaser
    const [form,       setForm]       = useState<FormState>(EMPTY)
    const [errors,     setErrors]     = useState<Partial<Record<keyof FormState, string>>>({})
    const [submitting, setSubmitting] = useState(false)
    const firstRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) {
            setForm(purchaser ? toFormState(purchaser) : EMPTY)
            setErrors({})
            setSubmitting(false)
            setTimeout(() => firstRef.current?.focus(), 100)
        }
    }, [open, purchaser])

    useEffect(() => {
        if (!open) return
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', h)
        return () => window.removeEventListener('keydown', h)
    }, [open, onClose])

    const set = (key: keyof FormState) => (value: string | boolean) =>
        setForm((prev) => ({ ...prev, [key]: value }))

    const validate = () => {
        const e: typeof errors = {}
        if (!form.purchase_name.trim())                              e.purchase_name = 'Name is required'
        if (!isEdit && !form.user_id.trim())                         e.user_id       = 'User ID is required'
        if (!form.max_orders_per_day || isNaN(Number(form.max_orders_per_day))) e.max_orders_per_day = 'Must be a number'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async () => {
        if (!validate()) return
        setSubmitting(true)
        try {
            const base = {
                purchase_name:      form.purchase_name.trim(),
                team:               form.team.trim() || null,
                max_orders_per_day: Number(form.max_orders_per_day),
                daily_limits: {
                    cny: Number(form.daily_limits_cny),
                    thb: Number(form.daily_limits_thb),
                    usd: Number(form.daily_limits_usd),
                },
                enable: form.enable,
            }
            await onSubmit(isEdit ? base as UpdatePurchaserDto : { ...base, user_id: Number(form.user_id) } as CreatePurchaserDto)
            onClose()
        } catch {
            setSubmitting(false)
        }
    }

    if (!open) return null

    return (
        <>
            <style>{`
                @keyframes pmfBg    { from { opacity:0 } to { opacity:1 } }
                @keyframes pmfSlide { from { opacity:0; transform:translateY(-10px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
                @keyframes pmfSpin  { to { transform:rotate(360deg) } }
                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0 }
            `}</style>

            {/* Backdrop */}
            <div onClick={onClose} style={{
                position: 'fixed', inset: 0, zIndex: 200,
                background: 'rgba(5,8,15,0.75)', backdropFilter: 'blur(6px)',
                animation: 'pmfBg 0.18s ease',
            }} />

            {/* Container */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 201,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 20, pointerEvents: 'none',
            }}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: '100%', maxWidth: 500,
                        background: '#141c2b',
                        border: '1px solid #1e2a3a',
                        borderRadius: 14,
                        boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)',
                        animation: 'pmfSlide 0.18s ease',
                        pointerEvents: 'all',
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '18px 20px',
                        borderBottom: '1px solid #1a2235',
                        background: 'linear-gradient(180deg, #181f2e 0%, #141c2b 100%)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                                width: 34, height: 34, borderRadius: 9,
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 3px 10px rgba(37,99,235,0.45)',
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    {isEdit
                                        ? <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>
                                        : <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>
                                    }
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>
                                    {isEdit ? 'Edit Purchaser' : 'New Purchaser'}
                                </div>
                                <div style={{ fontSize: 12, color: '#475569', marginTop: 1 }}>
                                    {isEdit ? `#${purchaser!.id} — ${purchaser!.purchase_name}` : 'Add a new purchaser to the system'}
                                </div>
                            </div>
                        </div>

                        <button onClick={onClose} style={{
                            width: 28, height: 28, borderRadius: 7,
                            border: '1px solid #1e2a3a', background: 'transparent',
                            color: '#475569', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.15s',
                        }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#1e2a3a'; e.currentTarget.style.color = '#e2e8f0' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569' }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

                        {/* Name */}
                        <Field label="Purchaser Name" required error={errors.purchase_name}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    ref={firstRef}
                                    type="text"
                                    value={form.purchase_name}
                                    placeholder="e.g. Kim Sivkeav"
                                    onChange={(e) => set('purchase_name')(e.target.value)}
                                    onFocus={e  => e.target.style.borderColor = '#2563eb'}
                                    onBlur={e   => e.target.style.borderColor = errors.purchase_name ? '#f87171' : '#1e2a3a'}
                                    style={{
                                        width: '100%', height: 38,
                                        padding: '0 12px', borderRadius: 8, fontSize: 13,
                                        color: '#e2e8f0', background: '#0d1421',
                                        border: `1px solid ${errors.purchase_name ? '#f87171' : '#1e2a3a'}`,
                                        outline: 'none', boxSizing: 'border-box',
                                    }}
                                />
                            </div>
                        </Field>

                        {/* User ID + Team row */}
                        <div style={{ display: 'grid', gridTemplateColumns: isEdit ? '1fr' : '1fr 1fr', gap: 12 }}>
                            {!isEdit && (
                                <Field label="User ID" required error={errors.user_id}>
                                    <StyledInput value={form.user_id} onChange={set('user_id')} placeholder="71" type="number" hasError={!!errors.user_id} />
                                </Field>
                            )}
                            <Field label="Team">
                                <StyledInput value={form.team} onChange={set('team')} placeholder="e.g. KH Team" />
                            </Field>
                        </div>

                        {/* Max Orders */}
                        <Field label="Max Orders / Day" required error={errors.max_orders_per_day}>
                            <StyledInput value={form.max_orders_per_day} onChange={set('max_orders_per_day')} placeholder="100" type="number" hasError={!!errors.max_orders_per_day} />
                        </Field>

                        {/* Daily Limits */}
                        <Field label="Daily Limits">
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
                                background: '#0d1421', border: '1px solid #1e2a3a',
                                borderRadius: 10, padding: 12,
                            }}>
                                <StyledInput prefix="CNY" value={form.daily_limits_cny} onChange={set('daily_limits_cny')} placeholder="0" type="number" />
                                <StyledInput prefix="THB" value={form.daily_limits_thb} onChange={set('daily_limits_thb')} placeholder="0" type="number" />
                                <StyledInput prefix="USD" value={form.daily_limits_usd} onChange={set('daily_limits_usd')} placeholder="0" type="number" />
                            </div>
                        </Field>

                        {/* Enable toggle */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background: '#0d1421', border: '1px solid #1e2a3a',
                            borderRadius: 10, padding: '10px 14px',
                        }}>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1' }}>Active Status</div>
                                <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>
                                    {form.enable ? 'Purchaser is active' : 'Purchaser is disabled'}
                                </div>
                            </div>
                            <button
                                onClick={() => set('enable')(!form.enable)}
                                style={{
                                    position: 'relative', width: 44, height: 24,
                                    borderRadius: 999, border: 'none', padding: 0,
                                    background: form.enable
                                        ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                                        : '#1a2235',
                                    cursor: 'pointer', transition: 'background 0.2s',
                                    flexShrink: 0,
                                    boxShadow: form.enable ? '0 2px 8px rgba(37,99,235,0.4)' : 'none',
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: 3,
                                    left: form.enable ? 23 : 3,
                                    width: 18, height: 18,
                                    borderRadius: '50%', background: '#fff',
                                    transition: 'left 0.2s',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                                }} />
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8,
                        padding: '14px 20px',
                        borderTop: '1px solid #1a2235',
                        background: '#0f1623',
                    }}>
                        <button
                            onClick={onClose}
                            disabled={submitting}
                            style={{
                                height: 36, padding: '0 16px', borderRadius: 8,
                                fontSize: 13, fontWeight: 500,
                                border: '1px solid #1e2a3a', background: 'transparent',
                                color: '#64748b', cursor: submitting ? 'not-allowed' : 'pointer',
                                transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = '#1a2235'; e.currentTarget.style.color = '#cbd5e1' }}}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b' }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            style={{
                                height: 36, padding: '0 20px', borderRadius: 8,
                                fontSize: 13, fontWeight: 600,
                                border: 'none',
                                background: submitting ? '#1e3360' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                color: submitting ? '#4b6cb7' : '#fff',
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                transition: 'all 0.15s',
                                boxShadow: submitting ? 'none' : '0 2px 10px rgba(37,99,235,0.4)',
                                display: 'flex', alignItems: 'center', gap: 7,
                            }}
                        >
                            {submitting && (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'pmfSpin 0.75s linear infinite' }}>
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                                </svg>
                            )}
                            {submitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Purchaser'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}