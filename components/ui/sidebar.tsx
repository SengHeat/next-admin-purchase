'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Package,
  Users,
  Settings,
  BarChart3,
  ClipboardList, Scale, Wallet, AlertCircle,
} from 'lucide-react'

interface SidebarProps {
  userRole: string
}

const navigation = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    roles: ['admin', 'manager', 'purchaser', 'vendor', 'accountant', 'auditor'],
  },
  {
    title: 'Orders',
    icon: Package,
    href: '/dashboard/orders',
    roles: ['admin', 'manager', 'purchaser', 'accountant'],
    submenu: [
      { title: 'My Queue', href: '/orders' },
      { title: 'Assign Order', href: '/orders/assign', roles: ['admin', 'manager'] },
    ],
  },
  {
    title: 'Bargainings',
    icon: Scale,
    href: '/dashboard/bargainings',
    roles: ['admin', 'manager', 'purchaser', 'vendor'],
    submenu: [
      { title: 'All Bargainings', href: '/bargainings' },
      { title: 'Pending Approvals', href: '/bargainings/pending', roles: ['admin', 'manager'] },
      { title: 'My Submissions', href: '/bargainings/my-submissions' },
    ],
  },
  {
    title: 'Wallets',
    icon: Wallet,
    href: '/dashboard/wallets',
    roles: ['admin', 'manager', 'purchaser', 'accountant'],
    submenu: [
      { title: 'My Wallets', href: '/wallets' },
      { title: 'Request Top-up', href: '/wallets/topup/request' },
      { title: 'Approve Top-up', href: '/wallets/topup/approve', roles: ['admin', 'manager', 'accountant'] },
    ],
  },
  {
    title: 'Order Issues',
    icon: AlertCircle,
    href: '/dashboard/order-issues',
    roles: ['admin', 'manager', 'purchaser', 'accountant', 'auditor'],
    submenu: [
      { title: 'All Issues', href: '/order-issues' },
      { title: 'Pending Issues', href: '/order-issues/pending', roles: ['admin', 'manager', 'auditor'] },
      { title: 'My Issues', href: '/order-issues/my-issues' },
    ],
  },
  {
    title: 'Purchasers',
    icon: Users,
    href: '/dashboard/purchasers',
    roles: ['admin', 'manager', 'purchaser', 'accountant', 'auditor'],
    submenu: [
      { title: 'All Purchasers', href: '/purchasers' },
      { title: 'Available', href: '/purchasers/available' },
    ],
  },
  {
    title: 'Monitor',
    icon: BarChart3,
    href: '/dashboard/monitor/dashboard',
    roles: ['admin', 'manager', 'purchaser', 'accountant', 'auditor'],
    submenu: [
      { title: 'Dashboard', href: '/dashboard/monitor/dashboard' },
      { title: 'Reports', href: '/dashboard/monitor/reports/bargaining' },
      { title: 'Audit', href: '/dashboard/monitor/audit/dashboard', roles: ['admin', 'auditor'] },
    ],
  },
]

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()

  const filteredNavigation = navigation.filter((item) =>
      item.roles.includes(userRole)
  )

  return (
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">
            DRSB Purchase
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                  <li key={item.title}>
                    <Link
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                            isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © 2024 DRSB Purchase Manager
          </p>
        </div>
      </aside>
  )
}