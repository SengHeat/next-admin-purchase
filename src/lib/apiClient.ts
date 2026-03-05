// lib/apiClient.ts
import axios, { AxiosInstance } from 'axios'

/**
 * createApiClient()
 * -----------------
 * Single shared axios instance used by all services.
 *
 * Interceptors:
 *  request  → attaches Bearer token from localStorage
 *  response → unwraps res.data so services receive ApiResponse directly
 *             rejects with the API error body (not axios wrapper)
 */
function createApiClient(): AxiosInstance {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api',
        headers: { 'Content-Type': 'application/json' },
        timeout: 15_000,
    })

    // ── Attach auth token ──────────────────────────────────────────────────────
    client.interceptors.request.use((config) => {
        const token =
            typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    })

    // ── Unwrap axios envelope → ApiResponse ───────────────────────────────────
    client.interceptors.response.use(
        (res) => res.data,
        (err) => Promise.reject(err?.response?.data ?? err)
    )

    return client
}

export const api = createApiClient()