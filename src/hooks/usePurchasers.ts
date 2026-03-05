// hooks/usePurchasers.ts
import { useState, useEffect, useCallback } from 'react'
import { Purchaser }                         from '@/src/types/purchaser.types'
import { PaginationMeta }                    from '@/src/types/api.types'
import { PurchaserQueryParams, purchaserService } from '@/src/services/purchaserService'

interface State {
    items:   Purchaser[]
    meta:    PaginationMeta | null
    loading: boolean
    error:   string | null
}

export interface UsePurchasersReturn extends State {
    page:       number
    perPage:    number
    setPage:    (page: number) => void
    setPerPage: (perPage: number) => void
    refetch:    () => void
    updateItem: (id: number, patch: Partial<Purchaser>) => void
}

export function usePurchasers(params?: PurchaserQueryParams): UsePurchasersReturn {
    const [page,    setPageState]    = useState(1)
    const [perPage, setPerPageState] = useState(15)

    const [state, setState] = useState<State>({
        items:   [],
        meta:    null,
        loading: true,
        error:   null,
    })

    const fetchData = useCallback(async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }))
        try {
            const res = await purchaserService.getAll({
                ...params,
                page,
                per_page: perPage,
            })
            setState({
                items:   res.data,
                meta:    res.meta,
                loading: false,
                error:   null,
            })
        } catch (err: any) {
            setState((prev) => ({
                ...prev,
                loading: false,
                error: err?.message ?? 'Failed to fetch purchasers',
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, perPage, JSON.stringify(params)])

    useEffect(() => { fetchData() }, [fetchData])

    const setPerPage = useCallback((value: number) => {
        setPerPageState(value)
        setPageState(1)
    }, [])

    const setPage = useCallback((value: number) => {
        setPageState(value)
    }, [])

    // Patch a single item in local state — no API refetch
    const updateItem = useCallback((id: number, patch: Partial<Purchaser>) => {
        setState((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === id ? { ...item, ...patch } : item
            ),
        }))
    }, [])

    return { ...state, page, perPage, setPage, setPerPage, refetch: fetchData, updateItem }
}