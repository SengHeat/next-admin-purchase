'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  LayoutDashboard,
  Package,
  Scale,
  Wallet,
  AlertCircle,
  Users,
  BarChart3,
  ChevronRight,
} from 'lucide-react'

/**
 * Navigation menu items by role
 */
const navigationItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    roles: ['admin', 'manager', 'purchaser', 'vendor', 'accountant', 'auditor'],
  },
  {
    title: 'Orders',
    icon: Package,
    href: '/orders',
    roles: ['admin', 'manager', 'purchaser', 'accountant'],
    submenu: [
      { title: 'My Queue', href: '/orders' },
      { title: 'Assign Order', href: '/orders/assign', roles: ['admin', 'manager'] },
    ],
  },
  {
    title: 'Bargainings',
    icon: Scale,
    href: '/bargainings',
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
    href: '/wallets',
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
    href: '/order-issues',
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
    href: '/purchasers',
    roles: ['admin', 'manager', 'accountant', 'auditor'],
    submenu: [
      { title: 'All Purchasers', href: '/purchasers' },
      { title: 'Available', href: '/purchasers/available' },
    ],
  },
  {
    title: 'Monitor',
    icon: BarChart3,
    href: '/monitor/dashboard',
    roles: ['admin', 'manager', 'auditor'],
    submenu: [
      { title: 'Dashboard', href: '/monitor/dashboard' },
      { title: 'Reports', href: '/monitor/reports/bargaining' },
      { title: 'Audit', href: '/monitor/audit/dashboard', roles: ['admin', 'auditor'] },
    ],
  },
]

interface SidebarProps {
  userRole?: string
}

export function Sidebar({ userRole = 'purchaser' }: SidebarProps) {
  const pathname = usePathname()

  // Filter items based on user role
  const visibleItems = navigationItems.filter(
    item => !item.roles || item.roles.includes(userRole)
  )

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <aside className="h-screen w-64 bg-sidebar border-r border-sidebar-border sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-sidebar-border">
        <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
          <Package className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <h1 className="font-bold text-lg text-sidebar-foreground">DRSB</h1>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="px-3 py-4 space-y-1">
          {visibleItems.map((item) => (
            <div key={item.href}>
              <Link href={item.href}>
                <Button
                  variant={isActive(item.href) ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 text-sidebar-foreground',
                    isActive(item.href) && 'bg-sidebar-accent text-sidebar-accent-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.submenu && (
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  )}
                </Button>
              </Link>

              {/* Submenu */}
              {item.submenu && isActive(item.href) && (
                <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border">
                  {item.submenu
                    .filter(sub => !sub.roles || sub.roles.includes(userRole))
                    .map((subitem) => (
                      <Link key={subitem.href} href={subitem.href}>
                        <Button
                          variant={isActive(subitem.href) ? 'secondary' : 'ghost'}
                          size="sm"
                          className={cn(
                            'w-full justify-start text-xs pl-6 text-sidebar-foreground',
                            isActive(subitem.href) && 'bg-sidebar-accent text-sidebar-accent-foreground'
                          )}
                        >
                          {subitem.title}
                        </Button>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="h-16 border-t border-sidebar-border px-4 py-3 flex items-center justify-center bg-opacity-50">
        <p className="text-xs text-sidebar-foreground/60 text-center">
          v1.0.0
        </p>
      </div>
    </aside>
  )
}
