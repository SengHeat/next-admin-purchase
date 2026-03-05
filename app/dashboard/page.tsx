  'use client'

  import { useState, useMemo } from 'react'
  import {
    Users,
    ShoppingCart,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    DollarSign,
    TrendingUp,
    Package,
    Truck,
    RefreshCw,
    Calendar,
    Filter,
    Download,
    UserCircle,
    Shield,
    Crown,
    Settings,
    Bell,
    LogOut,
    ChevronDown,
    Award,
    Target,
    Star
  } from 'lucide-react'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'
  import { Badge } from '@/components/ui/badge'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
  import { Progress } from '@/components/ui/progress'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

  export default function PurchaseDashboard() {
    const [timeFilter, setTimeFilter] = useState('today')
    const [teamFilter, setTeamFilter] = useState('all')
    const [viewMode, setViewMode] = useState<'purchaser' | 'senior' | 'manager'>('manager')

    // Current user profile
    const currentUser = {
      name: 'Li Haini',
      email: 'li.haini@company.com',
      role: viewMode === 'manager' ? 'Manager' : viewMode === 'senior' ? 'Senior Purchaser' : 'Purchaser',
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

    // Generate data based on time filter
    const getDataByTimeFilter = () => {
      const multipliers = {
        today: { orders: 1, amount: 1, savings: 1 },
        '7days': { orders: 7, amount: 6.5, savings: 6.8 },
        '1month': { orders: 28, amount: 25, savings: 26 },
        '3months': { orders: 84, amount: 75, savings: 78 },
        '1year': { orders: 336, amount: 300, savings: 310 },
        custom: { orders: 14, amount: 13, savings: 13.5 }
      }

      const mult = multipliers[timeFilter as keyof typeof multipliers] || multipliers.today

      return {
        orderStatusCounts: {
          assigned: Math.round(45 * (mult.orders / 7)),
          approved_purchase: Math.round(32 * (mult.orders / 7)),
          pending_price_change: Math.round(12 * (mult.orders / 7)),
          pending_delivery: Math.round(8 * (mult.orders / 7)),
          purchased: Math.round(156 * mult.orders),
          in_transit: Math.round(89 * (mult.orders / 3)),
          completed: Math.round(234 * mult.orders),
          cancelled: Math.round(5 * mult.orders),
          refunded: Math.round(3 * mult.orders)
        },
        orderIssues: {
          failed_purchase: Math.round(8 * (mult.orders / 7)),
          before_purchasing_refund: Math.round(3 * mult.orders),
          after_purchasing_refund: Math.round(2 * mult.orders),
          price_change: Math.round(12 * (mult.orders / 7)),
          resolved: Math.round(45 * mult.orders),
          cancelled: Math.round(1 * mult.orders)
        },
        totalAmount: (12450.50 * mult.amount).toFixed(2),
        totalSavings: (2345.60 * mult.savings).toFixed(2),
        avgOrderValue: (245.50 * (mult.amount / mult.orders)).toFixed(2),
        orderGrowth: timeFilter === 'today' ? '+15%' : timeFilter === '7days' ? '+12%' : '+8%'
      }
    }

    const dynamicData = getDataByTimeFilter()

    // Mock data - Purchaser Performance (varies by time period)
    const getPurchaserPerformance = () => {
      const mult = timeFilter === 'today' ? 1 : timeFilter === '7days' ? 7 : timeFilter === '1month' ? 30 : timeFilter === '3months' ? 90 : timeFilter === '1year' ? 365 : 14

      return [
        { id: 1, name: 'Li Haini', team: 'CN Team', active: 5, purchased: Math.round(23 * (mult / 30)), savings: (245.50 * (mult / 30)), issues: Math.max(0, Math.round(1 * (mult / 60))), efficiency: 92 },
        { id: 2, name: 'Purchaser-001', team: 'Repurchase Team', active: 8, purchased: Math.round(45 * (mult / 30)), savings: (456.80 * (mult / 30)), issues: Math.round(2 * (mult / 60)), efficiency: 88 },
        { id: 3, name: 'Kimchhy Sok', team: 'KH Team', active: 3, purchased: Math.round(18 * (mult / 30)), savings: (189.20 * (mult / 30)), issues: 0, efficiency: 95 },
        { id: 4, name: 'Long Zi Yi', team: 'CN Team', active: 12, purchased: Math.round(34 * (mult / 30)), savings: (378.90 * (mult / 30)), issues: Math.round(3 * (mult / 60)), efficiency: 85 },
        { id: 5, name: 'Purchaser-005', team: 'Repurchase Team', active: 6, purchased: Math.round(28 * (mult / 30)), savings: (298.40 * (mult / 30)), issues: Math.max(0, Math.round(1 * (mult / 60))), efficiency: 90 },
      ]
    }

    // Mock data - Team Stats (varies by time period)
    const getTeamStats = () => {
      const mult = timeFilter === 'today' ? 1 : timeFilter === '7days' ? 7 : timeFilter === '1month' ? 30 : timeFilter === '3months' ? 90 : timeFilter === '1year' ? 365 : 14

      return [
        { team: 'CN Team', purchasers: 15, active: 45, purchased: Math.round(234 * mult), savings: (2345.60 * mult), avgTime: '2.5h', efficiency: 94 },
        { team: 'KH Team', purchasers: 8, active: 23, purchased: Math.round(156 * mult), savings: (1567.80 * mult), avgTime: '3.1h', efficiency: 91 },
        { team: 'Repurchase Team', purchasers: 12, active: 67, purchased: Math.round(345 * mult), savings: (3456.90 * mult), avgTime: '2.8h', efficiency: 89 },
        { team: 'Freelance Team', purchasers: 5, active: 12, purchased: Math.round(89 * mult), savings: (890.50 * mult), avgTime: '3.5h', efficiency: 87 },
      ]
    }

    // Generate orders based on time period
    const generateOrders = () => {
      const baseOrders = [
        { customer: 'John Doe', purchaser: 'Li Haini', team: 'CN Team', status: 'purchased', baseAmount: 245.50, baseDate: '2026-03-05 10:30' },
        { customer: 'Jane Smith', purchaser: 'Purchaser-001', team: 'Repurchase Team', status: 'assigned', baseAmount: 189.00, baseDate: '2026-03-05 09:15' },
        { customer: 'Bob Wilson', purchaser: 'Kimchhy Sok', team: 'KH Team', status: 'pending_price_change', baseAmount: 567.80, baseDate: '2026-03-05 08:45' },
        { customer: 'Alice Brown', purchaser: 'Long Zi Yi', team: 'CN Team', status: 'in_transit', baseAmount: 345.20, baseDate: '2026-03-04 16:20' },
        { customer: 'Charlie Lee', purchaser: 'Purchaser-005', team: 'Repurchase Team', status: 'completed', baseAmount: 123.40, baseDate: '2026-03-04 14:10' },
        { customer: 'David Chen', purchaser: 'Li Haini', team: 'CN Team', status: 'approved_purchase', baseAmount: 456.30, baseDate: '2026-03-05 11:00' },
        { customer: 'Emma Davis', purchaser: 'Kimchhy Sok', team: 'KH Team', status: 'purchased', baseAmount: 234.50, baseDate: '2026-03-05 10:45' },
        { customer: 'Frank Miller', purchaser: 'Long Zi Yi', team: 'CN Team', status: 'in_transit', baseAmount: 678.90, baseDate: '2026-03-04 15:30' },
        { customer: 'Grace Wang', purchaser: 'Purchaser-001', team: 'Repurchase Team', status: 'completed', baseAmount: 145.60, baseDate: '2026-03-04 13:20' },
        { customer: 'Henry Liu', purchaser: 'Purchaser-005', team: 'Repurchase Team', status: 'pending_delivery', baseAmount: 389.00, baseDate: '2026-03-05 09:30' },
      ]

      const orderCount = timeFilter === 'today' ? 10 : timeFilter === '7days' ? 50 : timeFilter === '1month' ? 200 : 400
      const orders = []

      for (let i = 0; i < orderCount; i++) {
        const baseOrder = baseOrders[i % baseOrders.length]
        orders.push({
          id: `ORD-${88891 + i}`,
          ...baseOrder,
          amount: baseOrder.baseAmount * (0.8 + Math.random() * 0.4),
          date: baseOrder.baseDate
        })
      }

      return orders
    }

    const purchaserPerformance = getPurchaserPerformance()
    const teamStats = getTeamStats()
    const allOrders = generateOrders()

    // Mock data - Wallet Stats (varies by time period)
    const walletStats = {
      total_balance_cny: 145230.50,
      total_balance_usd: 8950.00,
      spent_today_cny: timeFilter === 'today' ? 12450.00 : timeFilter === '7days' ? 87150.00 : 350600.00,
      spent_today_usd: timeFilter === 'today' ? 890.50 : timeFilter === '7days' ? 6233.50 : 24970.00,
      low_balance_wallets: 2
    }

    // Filter data based on view mode
    const getFilteredOrders = () => {
      let filtered = allOrders

      if (viewMode === 'purchaser') {
        filtered = filtered.filter(order => order.purchaser === currentUser.name)
      } else if (viewMode === 'senior') {
        filtered = filtered.filter(order => order.team === currentUser.team)
      }

      if (teamFilter !== 'all' && viewMode === 'manager') {
        filtered = filtered.filter(order => order.team.toLowerCase().includes(teamFilter))
      }

      return filtered
    }

    const getFilteredPurchasers = () => {
      let filtered = purchaserPerformance

      if (viewMode === 'purchaser') {
        filtered = filtered.filter(p => p.name === currentUser.name)
      } else if (viewMode === 'senior') {
        filtered = filtered.filter(p => p.team === currentUser.team)
      }

      if (teamFilter !== 'all' && viewMode === 'manager') {
        filtered = filtered.filter(p => p.team.toLowerCase().includes(teamFilter))
      }

      return filtered
    }

    const getFilteredTeams = () => {
      if (viewMode === 'purchaser') {
        return []
      } else if (viewMode === 'senior') {
        return teamStats.filter(t => t.team === currentUser.team)
      }

      if (teamFilter !== 'all') {
        return teamStats.filter(t => t.team.toLowerCase().includes(teamFilter))
      }

      return teamStats
    }

    const filteredOrders = getFilteredOrders()
    const filteredPurchasers = getFilteredPurchasers()
    const filteredTeams = getFilteredTeams()

    // Calculate metrics based on filtered data
    const calculateMetrics = useMemo(() => {
      const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0)
      const avgAmount = filteredOrders.length > 0 ? totalAmount / filteredOrders.length : 0
      const totalSavings = filteredOrders.length * 12.5 // Mock calculation

      return {
        totalOrders: filteredOrders.length,
        totalAmount: totalAmount.toFixed(2),
        avgAmount: avgAmount.toFixed(2),
        totalSavings: totalSavings.toFixed(2),
        activeOrders: filteredOrders.filter(o => o.status === 'assigned' || o.status === 'approved_purchase').length,
        completedOrders: filteredOrders.filter(o => o.status === 'completed').length
      }
    }, [filteredOrders])

    const getStatusBadge = (status: string) => {
      const configs = {
        assigned: { color: 'bg-blue-100 text-blue-800', icon: Clock },
        approved_purchase: { color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
        pending_price_change: { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
        pending_delivery: { color: 'bg-orange-100 text-orange-800', icon: Package },
        purchased: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
        in_transit: { color: 'bg-indigo-100 text-indigo-800', icon: Truck },
        completed: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
        cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
        refunded: { color: 'bg-gray-100 text-gray-800', icon: RefreshCw },
      }
      const config = configs[status as keyof typeof configs] || configs.assigned
      const Icon = config.icon
      return (
          <Badge className={`${config.color} hover:${config.color}`}>
            <Icon className="mr-1 h-3 w-3" />
            {status.replace(/_/g, ' ')}
          </Badge>
      )
    }

    const getRoleIcon = (role: 'purchaser' | 'senior' | 'manager') => {
      switch (role) {
        case 'purchaser':
          return <UserCircle className="h-4 w-4" />
        case 'senior':
          return <Shield className="h-4 w-4" />
        case 'manager':
          return <Crown className="h-4 w-4" />
      }
    }

    const getRoleLabel = (role: 'purchaser' | 'senior' | 'manager') => {
      switch (role) {
        case 'purchaser':
          return 'Purchaser View'
        case 'senior':
          return 'Senior Purchaser View'
        case 'manager':
          return 'Manager View'
      }
    }

    const getRoleBadgeColor = (role: 'purchaser' | 'senior' | 'manager') => {
      switch (role) {
        case 'purchaser':
          return 'bg-blue-100 text-blue-800 border-blue-200'
        case 'senior':
          return 'bg-purple-100 text-purple-800 border-purple-200'
        case 'manager':
          return 'bg-amber-100 text-amber-800 border-amber-200'
      }
    }

    const getTimePeriodLabel = () => {
      switch (timeFilter) {
        case 'today': return 'Today'
        case '7days': return 'Last 7 Days'
        case '1month': return 'Last Month'
        case '3months': return 'Last 3 Months'
        case '1year': return 'Last Year'
        case 'custom': return 'Custom Range'
        default: return 'Today'
      }
    }

    return (
        <div className="flex flex-col gap-6 p-6">
          {/* Header with Profile */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">Purchase Dashboard</h1>
                <Badge variant="outline" className={`${getRoleBadgeColor(viewMode)} gap-1.5`}>
                  {getRoleIcon(viewMode)}
                  {getRoleLabel(viewMode)}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">
                Real-time overview • {getTimePeriodLabel()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* View Mode Selector & Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* View Mode Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">View as:</span>
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                <Button
                    variant={viewMode === 'purchaser' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('purchaser')}
                    className="gap-1.5"
                >
                  <UserCircle className="h-4 w-4" />
                  Purchaser
                </Button>
                <Button
                    variant={viewMode === 'senior' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('senior')}
                    className="gap-1.5"
                >
                  <Shield className="h-4 w-4" />
                  Senior
                </Button>
                <Button
                    variant={viewMode === 'manager' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('manager')}
                    className="gap-1.5"
                >
                  <Crown className="h-4 w-4" />
                  Manager
                </Button>
              </div>
            </div>

            <div className="h-8 w-px bg-border" />

            {/* Time Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Team Filter - Only for Manager and Senior */}
            {(viewMode === 'manager' || viewMode === 'senior') && (
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select
                      value={teamFilter}
                      onValueChange={setTeamFilter}
                      disabled={viewMode === 'senior'}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teams</SelectItem>
                      <SelectItem value="cn">CN Team</SelectItem>
                      <SelectItem value="kh">KH Team</SelectItem>
                      <SelectItem value="repurchase">Repurchase Team</SelectItem>
                      <SelectItem value="freelance">Freelance Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            )}
          </div>

          {/* Info Banner based on role */}
          {viewMode === 'purchaser' && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-blue-800">
                    <UserCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">
                      Viewing your personal performance for {getTimePeriodLabel().toLowerCase()} • {calculateMetrics.totalOrders} orders
                    </p>
                  </div>
                </CardContent>
              </Card>
          )}

          {viewMode === 'senior' && (
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-purple-800">
                    <Shield className="h-5 w-5" />
                    <p className="text-sm font-medium">
                      Viewing {currentUser.team} performance for {getTimePeriodLabel().toLowerCase()} • {calculateMetrics.totalOrders} orders
                    </p>
                  </div>
                </CardContent>
              </Card>
          )}

          {viewMode === 'manager' && (
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-amber-800">
                    <Crown className="h-5 w-5" />
                    <p className="text-sm font-medium">
                      Company-wide view for {getTimePeriodLabel().toLowerCase()} • {calculateMetrics.totalOrders} orders • ${calculateMetrics.totalAmount} total
                    </p>
                  </div>
                </CardContent>
              </Card>
          )}

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculateMetrics.totalOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">{dynamicData.orderGrowth}</span> from previous period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${calculateMetrics.totalAmount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Avg: <span className="font-medium">${calculateMetrics.avgAmount}</span> per order
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculateMetrics.activeOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  In progress right now
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {viewMode === 'purchaser' ? 'My Savings' : 'Total Savings'}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${calculateMetrics.totalSavings}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">+12%</span> from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">
                {viewMode === 'purchaser' ? 'My Orders' : 'Orders'}
              </TabsTrigger>
              <TabsTrigger value="purchasers">
                {viewMode === 'purchaser' ? 'My Performance' : 'Purchasers'}
              </TabsTrigger>
              {viewMode !== 'purchaser' && <TabsTrigger value="teams">Teams</TabsTrigger>}
              {viewMode === 'manager' && <TabsTrigger value="issues">Issues</TabsTrigger>}
              {viewMode === 'manager' && <TabsTrigger value="wallets">Wallets</TabsTrigger>}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Order Status Distribution */}
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Order Status Distribution</CardTitle>
                    <CardDescription>
                      {viewMode === 'purchaser'
                          ? `Your orders for ${getTimePeriodLabel().toLowerCase()}`
                          : viewMode === 'senior'
                              ? `${currentUser.team} orders for ${getTimePeriodLabel().toLowerCase()}`
                              : `All orders for ${getTimePeriodLabel().toLowerCase()}`
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(dynamicData.orderStatusCounts).map(([status, count]) => {
                        const filteredCount = filteredOrders.filter(o => o.status === status).length
                        const displayCount = viewMode === 'manager' ? count : filteredCount
                        const maxCount = viewMode === 'manager' ? Math.max(...Object.values(dynamicData.orderStatusCounts)) : filteredOrders.length

                        return (
                            <div key={status} className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium capitalize">{status.replace(/_/g, ' ')}</span>
                                  <span className="text-sm text-muted-foreground">{displayCount}</span>
                                </div>
                                <Progress
                                    value={(displayCount / maxCount) * 100}
                                    className="h-2"
                                />
                              </div>
                            </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Performance Stats</CardTitle>
                    <CardDescription>Key indicators for {getTimePeriodLabel().toLowerCase()}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {viewMode !== 'purchaser' && (
                        <div className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Users className="h-8 w-8 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium">Active Purchasers</p>
                              <p className="text-2xl font-bold">{filteredPurchasers.length}</p>
                            </div>
                          </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Package className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">Completed</p>
                          <p className="text-2xl font-bold">{calculateMetrics.completedOrders}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Truck className="h-8 w-8 text-indigo-600" />
                        <div>
                          <p className="text-sm font-medium">In Transit</p>
                          <p className="text-2xl font-bold">
                            {filteredOrders.filter(o => o.status === 'in_transit').length}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                        <div>
                          <p className="text-sm font-medium">Success Rate</p>
                          <p className="text-2xl font-bold">
                            {calculateMetrics.completedOrders > 0
                                ? ((calculateMetrics.completedOrders / calculateMetrics.totalOrders) * 100).toFixed(1)
                                : '0'
                            }%
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {viewMode === 'purchaser' ? 'My Recent Orders' : 'Recent Orders'}
                  </CardTitle>
                  <CardDescription>Latest activity for {getTimePeriodLabel().toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        {viewMode !== 'purchaser' && <TableHead>Purchaser</TableHead>}
                        {viewMode === 'manager' && <TableHead>Team</TableHead>}
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.slice(0, 10).map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            {viewMode !== 'purchaser' && <TableCell>{order.purchaser}</TableCell>}
                            {viewMode === 'manager' && (
                                <TableCell>
                                  <Badge variant="outline">{order.team}</Badge>
                                </TableCell>
                            )}
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>${order.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-muted-foreground">{order.date}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              {viewMode !== 'purchaser' && (
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Blocked on Payment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dynamicData.orderStatusCounts.pending_price_change + dynamicData.orderStatusCounts.pending_delivery}</div>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-muted-foreground">
                            Price Change: <span className="font-medium">{dynamicData.orderStatusCounts.pending_price_change}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Delivery: <span className="font-medium">{dynamicData.orderStatusCounts.pending_delivery}</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dynamicData.orderStatusCounts.completed}</div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {getTimePeriodLabel()}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Cancelled/Refunded</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dynamicData.orderStatusCounts.cancelled + dynamicData.orderStatusCounts.refunded}</div>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-muted-foreground">
                            Cancelled: <span className="font-medium">{dynamicData.orderStatusCounts.cancelled}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Refunded: <span className="font-medium">{dynamicData.orderStatusCounts.refunded}</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>
                    {viewMode === 'purchaser' ? 'My Orders' : 'All Orders'}
                  </CardTitle>
                  <CardDescription>
                    {calculateMetrics.totalOrders} orders for {getTimePeriodLabel().toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        {viewMode !== 'purchaser' && <TableHead>Purchaser</TableHead>}
                        {viewMode === 'manager' && <TableHead>Team</TableHead>}
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.slice(0, 20).map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            {viewMode !== 'purchaser' && <TableCell>{order.purchaser}</TableCell>}
                            {viewMode === 'manager' && (
                                <TableCell>
                                  <Badge variant="outline">{order.team}</Badge>
                                </TableCell>
                            )}
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>${order.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-muted-foreground">{order.date}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Purchasers Tab */}
            <TabsContent value="purchasers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {viewMode === 'purchaser' ? 'My Performance' : 'Purchaser Performance'}
                  </CardTitle>
                  <CardDescription>
                    Statistics for {getTimePeriodLabel().toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Active Orders</TableHead>
                        <TableHead>Purchased</TableHead>
                        <TableHead>Savings</TableHead>
                        <TableHead>Issues</TableHead>
                        <TableHead>Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPurchasers.map((purchaser) => (
                          <TableRow key={purchaser.id}>
                            <TableCell className="font-medium">{purchaser.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{purchaser.team}</Badge>
                            </TableCell>
                            <TableCell>{purchaser.active}</TableCell>
                            <TableCell>{purchaser.purchased}</TableCell>
                            <TableCell className="text-green-600 font-medium">${purchaser.savings.toFixed(2)}</TableCell>
                            <TableCell>
                              {purchaser.issues > 0 ? (
                                  <Badge variant="destructive">{purchaser.issues}</Badge>
                              ) : (
                                  <Badge className="bg-green-100 text-green-800">0</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={purchaser.efficiency} className="h-2 w-20" />
                                <span className="text-xs text-muted-foreground">{purchaser.efficiency}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Teams Tab - Hidden for Purchaser */}
            {viewMode !== 'purchaser' && (
                <TabsContent value="teams" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredTeams.map((team) => (
                        <Card key={team.team}>
                          <CardHeader>
                            <CardTitle>{team.team}</CardTitle>
                            <CardDescription>{team.purchasers} purchasers • {getTimePeriodLabel()}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Active Orders</span>
                              <span className="text-2xl font-bold">{team.active}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Purchased</span>
                              <span className="text-2xl font-bold">{team.purchased.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Total Savings</span>
                              <span className="text-2xl font-bold text-green-600">${team.savings.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Avg Processing Time</span>
                              <span className="text-lg font-semibold">{team.avgTime}</span>
                            </div>
                            <div className="pt-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Team Efficiency</span>
                                <span className="text-xs font-medium">{team.efficiency}%</span>
                              </div>
                              <Progress value={team.efficiency} className="h-2" />
                            </div>
                          </CardContent>
                        </Card>
                    ))}
                  </div>
                </TabsContent>
            )}

            {/* Issues Tab - Manager Only */}
            {viewMode === 'manager' && (
                <TabsContent value="issues" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Failed Purchase</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-600">{dynamicData.orderIssues.failed_purchase}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          For {getTimePeriodLabel().toLowerCase()}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Price Change</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{dynamicData.orderIssues.price_change}</div>
                        <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Refunds</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                          {dynamicData.orderIssues.before_purchasing_refund + dynamicData.orderIssues.after_purchasing_refund}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Before: {dynamicData.orderIssues.before_purchasing_refund} | After: {dynamicData.orderIssues.after_purchasing_refund}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Issue Resolution Rate</CardTitle>
                      <CardDescription>Performance for {getTimePeriodLabel().toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Resolved Issues</span>
                          <span className="text-2xl font-bold text-green-600">{dynamicData.orderIssues.resolved}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Pending Issues</span>
                          <span className="text-2xl font-bold text-orange-600">
                        {dynamicData.orderIssues.failed_purchase + dynamicData.orderIssues.price_change}
                      </span>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Resolution Rate</span>
                            <span className="text-xs font-medium">
                          {Math.round((dynamicData.orderIssues.resolved / (dynamicData.orderIssues.resolved + dynamicData.orderIssues.failed_purchase + dynamicData.orderIssues.price_change)) * 100)}%
                        </span>
                          </div>
                          <Progress
                              value={(dynamicData.orderIssues.resolved / (dynamicData.orderIssues.resolved + dynamicData.orderIssues.failed_purchase + dynamicData.orderIssues.price_change)) * 100}
                              className="h-2"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
            )}

            {/* Wallets Tab - Manager Only */}
            {viewMode === 'manager' && (
                <TabsContent value="wallets" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Total Balance (CNY)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">¥{walletStats.total_balance_cny.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Spent ({getTimePeriodLabel()}): ¥{walletStats.spent_today_cny.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Total Balance (USD)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">${walletStats.total_balance_usd.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Spent ({getTimePeriodLabel()}): ${walletStats.spent_today_usd.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Low Balance Alert</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{walletStats.low_balance_wallets}</div>
                        <p className="text-xs text-muted-foreground mt-1">Wallets need top-up</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Wallet Utilization</CardTitle>
                      <CardDescription>Spending for {getTimePeriodLabel().toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">CNY</span>
                            <span className="text-sm text-muted-foreground">
                          ¥{walletStats.spent_today_cny.toLocaleString()} / ¥{walletStats.total_balance_cny.toLocaleString()}
                        </span>
                          </div>
                          <Progress value={(walletStats.spent_today_cny / walletStats.total_balance_cny) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">USD</span>
                            <span className="text-sm text-muted-foreground">
                          ${walletStats.spent_today_usd.toLocaleString()} / ${walletStats.total_balance_usd.toLocaleString()}
                        </span>
                          </div>
                          <Progress value={(walletStats.spent_today_usd / walletStats.total_balance_usd) * 100} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
            )}
          </Tabs>
        </div>
    )
  }