// app/purchasers/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { usePurchasers }               from 'src/hooks/usePurchasers'
import { purchaserService }            from 'src/services/purchaserService'
import { PurchaserTable }              from 'src/components/purchasers/PurchaserTable'
import { PaginationBar }               from 'src/components/purchasers/PaginationBar'
import { ErrorBanner }                 from 'src/components/purchasers/ErrorBanner'
import { PurchaserFormModal }          from 'src/components/purchasers/PurchaserFormModal'
import type { CreatePurchaserDto, Purchaser, UpdatePurchaserDto } from 'src/types/purchaser.types'
import type { PurchaserQueryParams }   from 'src/services/purchaserService'

interface FilterState {
  team:   string
  status: '' | 'active' | 'inactive'
  enable: '' | 'true' | 'false'
  id:     string
}

const EMPTY_FILTERS: FilterState = { team: '', status: '', enable: '', id: '' }

function activeFilterCount(f: FilterState) {
  return [f.team, f.status, f.enable, f.id].filter(Boolean).length
}

// ── Chip ──────────────────────────────────────────────────────────────────────
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 8px 3px 10px', borderRadius: 999,
        fontSize: 12, fontWeight: 500,
        background: 'rgba(37,99,235,0.12)',
        border: '1px solid rgba(37,99,235,0.3)',
        color: '#60a5fa',
      }}>
            {label}
        <button type="button" onClick={onRemove} style={{
          background: 'none', border: 'none', color: '#60a5fa',
          cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: 14,
          display: 'flex', alignItems: 'center',
        }}>×</button>
        </span>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PurchasersPage() {
  const [searchDraft,    setSearchDraft]    = useState('')
  const [deletingId,     setDeletingId]     = useState<number | null>(null)
  const [modalOpen,      setModalOpen]      = useState(false)
  const [editPurchaser,  setEditPurchaser]  = useState<Purchaser | null>(null)
  const [extraParams,    setExtraParams]    = useState<PurchaserQueryParams>({})
  const [filterOpen,     setFilterOpen]     = useState(false)
  const [filters,        setFilters]        = useState<FilterState>(EMPTY_FILTERS)
  const [pendingFilters, setPendingFilters] = useState<FilterState>(EMPTY_FILTERS)
  const filterRef = useRef<HTMLDivElement>(null)

  const {
    items, meta, loading, error,
    page, perPage,
    setPage, setPerPage,
    refetch, updateItem,
  } = usePurchasers(extraParams)

  // Close filter panel on outside click
  useEffect(() => {
    if (!filterOpen) return
    const h = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node))
        setFilterOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [filterOpen])

  // ── Build params ──────────────────────────────────────────────────────────
  const applyFilters = (search: string, f: FilterState) => {
    const params: PurchaserQueryParams = {}
    if (search) params.search = search
    if (f.id)     params.filter = { ...params.filter, id:     f.id }
    if (f.team)   params.filter = { ...params.filter, team:   f.team }
    if (f.status) params.filter = { ...params.filter, status: f.status }
    if (f.enable !== '') params.filter = { ...params.filter, enable: f.enable === 'true' }
    setExtraParams(params)
    setPage(1)
  }

  // ── Search ────────────────────────────────────────────────────────────────
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters(searchDraft, filters)
  }

  const handleClear = () => {
    setSearchDraft('')
    applyFilters('', filters)
  }

  // ── Filters ───────────────────────────────────────────────────────────────
  const handleOpenFilter = () => {
    setPendingFilters(filters)
    setFilterOpen((v) => !v)
  }

  const handleApplyFilters = () => {
    setFilters(pendingFilters)
    applyFilters(searchDraft, pendingFilters)
    setFilterOpen(false)
  }

  const handleClearFilters = () => {
    setPendingFilters(EMPTY_FILTERS)
    setFilters(EMPTY_FILTERS)
    applyFilters(searchDraft, EMPTY_FILTERS)
    setFilterOpen(false)
  }

  const setPending = <K extends keyof FilterState>(key: K) => (value: FilterState[K]) =>
      setPendingFilters((prev) => ({ ...prev, [key]: value }))

  const activeCount = activeFilterCount(filters)

  // ── Modal ─────────────────────────────────────────────────────────────────
  const handleCreate = () => { setEditPurchaser(null); setModalOpen(true) }
  const handleEdit   = (p: Purchaser) => { setEditPurchaser(p); setModalOpen(true) }

  const handleSubmit = async (data: CreatePurchaserDto | UpdatePurchaserDto) => {
    if (editPurchaser) {
      await purchaserService.update(editPurchaser.id, data as UpdatePurchaserDto)
    } else {
      await purchaserService.create(data as CreatePurchaserDto)
    }
    refetch()
  }

  // ── Toggle ────────────────────────────────────────────────────────────────
  const handleToggle = async (p: Purchaser, enabled: boolean) => {
    updateItem(p.id, { enable: enabled })
    try {
      await purchaserService.update(p.id, { enable: enabled })
    } catch {
      updateItem(p.id, { enable: !enabled })
    }
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (p: Purchaser) => {
    if (!confirm(`Delete "${p.purchase_name}"?`)) return
    setDeletingId(p.id)
    try {
      const res = await purchaserService.remove(p.id)
      if (res.message) refetch()
    } catch (err: any) {
      alert(err?.message ?? 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  // ── Styles ────────────────────────────────────────────────────────────────
  const selectStyle: React.CSSProperties = {
    width: '100%', height: 36, padding: '0 28px 0 10px',
    borderRadius: 7, fontSize: 13, color: '#e2e8f0',
    background: '#0d1421', border: '1px solid #1e2a3a',
    outline: 'none', cursor: 'pointer',
    appearance: 'none' as any,
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 36, padding: '0 10px',
    borderRadius: 7, fontSize: 13, color: '#e2e8f0',
    background: '#0d1421', border: '1px solid #1e2a3a',
    outline: 'none', boxSizing: 'border-box' as any,
  }

  const filterLabel: React.CSSProperties = {
    fontSize: 11, fontWeight: 700, color: '#475569',
    textTransform: 'uppercase' as any, letterSpacing: '0.06em',
  }

  return (
      <>
        <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
                @keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
                @keyframes filterSlide { from { opacity:0; transform:translateY(-6px) scale(0.98) } to { opacity:1; transform:translateY(0) scale(1) } }
                *, *::before, *::after { box-sizing: border-box; }
                body { margin: 0; } a { text-decoration: none; } button:focus { outline: none; }
                * { font-family: 'DM Sans', sans-serif; }
                select option { background: #0d1421; color: #e2e8f0; }
                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
            `}</style>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>

          {/* ── Header ─────────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#f1f5f9' }}>Purchasers</h1>
              <p style={{ margin: '6px 0 0', fontSize: 14, color: '#64748b' }}>
                Manage and monitor all purchasers in the system
              </p>
            </div>
            <button onClick={handleCreate} style={{
              background: '#2563eb', color: '#fff', padding: '10px 22px',
              borderRadius: 8, fontSize: 14, fontWeight: 600,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37,99,235,0.30)', marginTop: 4,
            }}>
              + New Purchaser
            </button>
          </div>

          {/* ── Search + Filter bar ─────────────────────────────────── */}
          <div style={{ background: '#141c2b', borderRadius: 12, border: '1px solid #23293a', padding: '14px 20px' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>

              <input
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  placeholder="Search by name, team, or ID..."
                  style={{ flex: 1, padding: '8px 0', fontSize: 14, border: 'none', background: 'transparent', color: '#e2e8f0', outline: 'none' }}
              />

              {searchDraft && (
                  <button type="button" onClick={handleClear} style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}>
                    ×
                  </button>
              )}

              <div style={{ width: 1, height: 20, background: '#23293a', flexShrink: 0 }} />

              {/* Filter button + dropdown */}
              <div ref={filterRef} style={{ position: 'relative' }}>
                <button
                    type="button"
                    onClick={handleOpenFilter}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      height: 34, padding: '0 12px', borderRadius: 7,
                      fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
                      border: `1px solid ${filterOpen || activeCount > 0 ? '#2563eb' : '#23293a'}`,
                      background: filterOpen || activeCount > 0 ? 'rgba(37,99,235,0.1)' : 'transparent',
                      color: filterOpen || activeCount > 0 ? '#60a5fa' : '#64748b',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                  </svg>
                  Filters
                  {activeCount > 0 && (
                      <span style={{
                        minWidth: 18, height: 18, borderRadius: 999,
                        background: '#2563eb', color: '#fff',
                        fontSize: 11, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '0 4px',
                      }}>
                                        {activeCount}
                                    </span>
                  )}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                       style={{ transition: 'transform 0.15s', transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {/* ── Dropdown ────────────────────────────── */}
                {filterOpen && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                      zIndex: 150, width: 300,
                      background: '#141c2b', border: '1px solid #1e2a3a',
                      borderRadius: 12, boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                      animation: 'filterSlide 0.15s ease', overflow: 'hidden',
                    }}>
                      {/* Header */}
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '13px 16px 10px', borderBottom: '1px solid #1a2235',
                      }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>Filter Purchasers</span>
                        {activeFilterCount(pendingFilters) > 0 && (
                            <button type="button" onClick={() => setPendingFilters(EMPTY_FILTERS)}
                                    style={{ fontSize: 12, color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                              Clear all
                            </button>
                        )}
                      </div>

                      {/* Fields */}
                      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>

                        {/* ID */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          <label style={filterLabel}>ID</label>
                          <input type="number" value={pendingFilters.id} onChange={(e) => setPending('id')(e.target.value)} placeholder="e.g. 7" style={inputStyle} />
                        </div>

                        {/* Team */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          <label style={filterLabel}>Team</label>
                          <input type="text" value={pendingFilters.team} onChange={(e) => setPending('team')(e.target.value)} placeholder="e.g. KH Team" style={inputStyle} />
                        </div>

                        {/* Status */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          <label style={filterLabel}>Status</label>
                          <div style={{ position: 'relative' }}>
                            <select value={pendingFilters.status} onChange={(e) => setPending('status')(e.target.value)} style={selectStyle}>
                              <option value="">All statuses</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                 style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                              <polyline points="6 9 12 15 18 9"/>
                            </svg>
                          </div>
                        </div>

                        {/* Enable */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          <label style={filterLabel}>Enable</label>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {(['', 'true', 'false'] as const).map((val) => (
                                <button
                                    key={val} type="button"
                                    onClick={() => setPending('enable')(val)}
                                    style={{
                                      flex: 1, height: 32, borderRadius: 6,
                                      fontSize: 12, fontWeight: 600,
                                      border: `1px solid ${pendingFilters.enable === val ? '#2563eb' : '#1e2a3a'}`,
                                      background: pendingFilters.enable === val ? 'rgba(37,99,235,0.15)' : 'transparent',
                                      color: pendingFilters.enable === val ? '#60a5fa' : '#475569',
                                      cursor: 'pointer', transition: 'all 0.15s',
                                    }}
                                >
                                  {val === '' ? 'All' : val === 'true' ? 'Enabled' : 'Disabled'}
                                </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div style={{
                        display: 'flex', gap: 8, padding: '10px 16px',
                        borderTop: '1px solid #1a2235', background: '#0f1623',
                      }}>
                        <button type="button" onClick={() => setFilterOpen(false)} style={{
                          flex: 1, height: 34, borderRadius: 7, fontSize: 13, fontWeight: 500,
                          border: '1px solid #1e2a3a', background: 'transparent',
                          color: '#64748b', cursor: 'pointer',
                        }}>
                          Cancel
                        </button>
                        <button type="button" onClick={handleApplyFilters} style={{
                          flex: 2, height: 34, borderRadius: 7, fontSize: 13, fontWeight: 600,
                          border: 'none', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                          color: '#fff', cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(37,99,235,0.35)',
                        }}>
                          Apply Filters
                        </button>
                      </div>
                    </div>
                )}
              </div>

              <button type="submit" style={{
                padding: '8px 20px', fontSize: 13, fontWeight: 600,
                background: '#2563eb', color: '#fff',
                border: 'none', borderRadius: 7, cursor: 'pointer',
              }}>
                Search
              </button>
            </form>

            {/* ── Active filter chips ─────────────────────────────── */}
            {activeCount > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10, paddingTop: 10, borderTop: '1px solid #1a2235' }}>
                  {filters.id && (
                      <Chip label={`ID: ${filters.id}`} onRemove={() => {
                        const f: FilterState = { ...filters, id: '' }
                        setFilters(f); applyFilters(searchDraft, f)
                      }} />
                  )}
                  {filters.team && (
                      <Chip label={`Team: ${filters.team}`} onRemove={() => {
                        const f: FilterState = { ...filters, team: '' }
                        setFilters(f); applyFilters(searchDraft, f)
                      }} />
                  )}
                  {filters.status && (
                      <Chip label={`Status: ${filters.status}`} onRemove={() => {
                        const f: FilterState = { ...filters, status: '' }
                        setFilters(f); applyFilters(searchDraft, f)
                      }} />
                  )}
                  {filters.enable && (
                      <Chip label={`Enable: ${filters.enable === 'true' ? 'Enabled' : 'Disabled'}`} onRemove={() => {
                        const f: FilterState = { ...filters, enable: '' }
                        setFilters(f); applyFilters(searchDraft, f)
                      }} />
                  )}
                  <button type="button" onClick={handleClearFilters} style={{ fontSize: 12, color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: '2px 4px' }}>
                    Clear all
                  </button>
                </div>
            )}
          </div>

          {/* ── Error ──────────────────────────────────────────────── */}
          {error && <ErrorBanner error={error} onRetry={refetch} />}

          {/* ── Table ──────────────────────────────────────────────── */}
          <PurchaserTable
              items={items}
              loading={loading}
              hasSearch={Boolean(extraParams.search) || activeCount > 0}
              total={meta?.total}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggle={handleToggle}
              deletingId={deletingId}
          />

          {/* ── Pagination ─────────────────────────────────────────── */}
          {meta && (
              <PaginationBar
                  meta={meta}
                  onPageChange={setPage}
                  perPage={perPage}
                  onPerPageChange={setPerPage}
              />
          )}
        </div>

        {/* ── Modal ────────────────────────────────────────────────────── */}
        <PurchaserFormModal
            open={modalOpen}
            purchaser={editPurchaser}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit}
        />
      </>
  )
}