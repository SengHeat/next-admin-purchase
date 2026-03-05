import type { Metadata } from 'next'
import { Sidebar } from '@/components/ui/sidebar'
import { Header } from '@/components/layout/header'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Dashboard - DRSB Purchase Manager',
    description: 'Purchase management dashboard',
}

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    // TODO: Get user from auth context
    const userRole = 'purchaser'
    const user = {
        name: 'Li Haini',
        email: 'li.haini@company.com',
        // role: viewMode === 'manager' ? 'Manager' : viewMode === 'senior' ? 'Senior Purchaser' : 'Purchaser',
        team: 'CN Team',
        avatar: '',
        joinedDate: '2024-01-15',
        totalOrders: 247,
        successRate: 96.5,
        avgSavings: 12.3,
        rank: 3,
        badge: 'Gold',
        notifications: 5
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <Sidebar userRole={userRole} />

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <Header user={user} />

                {/* Page content - Full width, no container */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}