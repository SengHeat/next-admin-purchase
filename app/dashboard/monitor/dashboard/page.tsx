'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { TrendingUp, TrendingDown, Package, AlertTriangle, Wallet, Activity, ArrowUpRight, ArrowDownRight, Users, DollarSign, ShoppingCart, Clock, CalendarIcon } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'

/**
 * Chart data - mock
 */
const orderTrendData = [
  { name: 'Mon', orders: 24, revenue: 2400, completed: 20 },
  { name: 'Tue', orders: 13, revenue: 2210, completed: 10 },
  { name: 'Wed', orders: 20, revenue: 2290, completed: 18 },
  { name: 'Thu', orders: 29, revenue: 2000, completed: 25 },
  { name: 'Fri', orders: 32, revenue: 2181, completed: 28 },
  { name: 'Sat', orders: 18, revenue: 2500, completed: 15 },
  { name: 'Sun', orders: 15, revenue: 2100, completed: 12 },
]

const statusDistribution = [
  { name: 'Completed', value: 45, color: '#10b981' },
  { name: 'In Progress', value: 30, color: '#3b82f6' },
  { name: 'Pending', value: 20, color: '#f59e0b' },
  { name: 'On Hold', value: 5, color: '#8b5cf6' },
]

const purchaserPerformance = [
  { name: 'Kim Sivkeav', orders: 45, amount: 125000 },
  { name: 'Ly Chansorng', orders: 38, amount: 98000 },
  { name: 'Eav Vengsong', orders: 35, amount: 87500 },
  { name: 'Pheaktra', orders: 28, amount: 72000 },
  { name: 'Eang Sreymom', orders: 25, amount: 65000 },
]

const recentActivity = [
  { id: 1, action: 'New order created', order: 'ORD-2024-156', user: 'Kim Sivkeav', time: '5 min ago', type: 'success' },
  { id: 2, action: 'Bargaining completed', order: 'ORD-2024-155', user: 'Ly Chansorng', time: '12 min ago', type: 'info' },
  { id: 3, action: 'Payment pending', order: 'ORD-2024-154', user: 'Eav Vengsong', time: '23 min ago', type: 'warning' },
  { id: 4, action: 'Order cancelled', order: 'ORD-2024-153', user: 'Pheaktra', time: '1 hour ago', type: 'error' },
]

type DateRangePreset = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'thisMonth' | 'lastMonth' | 'custom'

export default function MonitorDashboardPage() {
  const [dateRangePreset, setDateRangePreset] = useState<DateRangePreset>('last7days')
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handlePresetChange = (preset: DateRangePreset) => {
    setDateRangePreset(preset)
    const today = new Date()

    switch (preset) {
      case 'today':
        setDateRange({
          from: today,
          to: today,
        })
        break
      case 'yesterday':
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        setDateRange({
          from: yesterday,
          to: yesterday,
        })
        break
      case 'last7days':
        setDateRange({
          from: new Date(today.setDate(today.getDate() - 7)),
          to: new Date(),
        })
        break
      case 'last30days':
        setDateRange({
          from: new Date(today.setDate(today.getDate() - 30)),
          to: new Date(),
        })
        break
      case 'thisMonth':
        setDateRange({
          from: new Date(today.getFullYear(), today.getMonth(), 1),
          to: new Date(),
        })
        break
      case 'lastMonth':
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
        setDateRange({
          from: lastMonth,
          to: lastMonthEnd,
        })
        break
      case 'custom':
        // Keep existing date range for custom
        break
    }
  }

  const getDateRangeLabel = () => {
    if (!dateRange?.from) return 'Select date range'

    if (dateRangePreset !== 'custom') {
      const labels: Record<DateRangePreset, string> = {
        today: 'Today',
        yesterday: 'Yesterday',
        last7days: 'Last 7 days',
        last30days: 'Last 30 days',
        thisMonth: 'This Month',
        lastMonth: 'Last Month',
        custom: '',
      }
      return labels[dateRangePreset]
    }

    if (dateRange.to) {
      return `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
    }
    return format(dateRange.from, 'MMM dd, yyyy')
  }

  return (
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Monitor Dashboard</h1>
            <p className="text-muted-foreground mt-1">Real-time system monitoring and analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Activity className="h-3 w-3" />
              Live
            </Badge>

            {/* Date Range Selector */}
            <Select value={dateRangePreset} onValueChange={(value) => handlePresetChange(value as DateRangePreset)}>
              <SelectTrigger className="w-[180px]">
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            {/* Custom Date Range Picker */}
            {dateRangePreset === 'custom' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !dateRange && 'text-muted-foreground'
                        )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                          dateRange.to ? (
                              <>
                                {format(dateRange.from, 'LLL dd, y')} -{' '}
                                {format(dateRange.to, 'LLL dd, y')}
                              </>
                          ) : (
                              format(dateRange.from, 'LLL dd, y')
                          )
                      ) : (
                          <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
            )}
          </div>
        </div>

        {/* Active Date Range Display */}
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Showing data for: <span className="font-bold">{getDateRangeLabel()}</span>
                  </p>
                  {dateRange?.from && dateRange?.to && (
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        {format(dateRange.from, 'EEEE, MMMM dd, yyyy')} to {format(dateRange.to, 'EEEE, MMMM dd, yyyy')}
                      </p>
                  )}
                </div>
              </div>
              <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetChange('last7days')}
                  className="border-blue-300 dark:border-blue-700"
              >
                Reset to Last 7 Days
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-green-600">+12.5%</span>
                <span className="text-xs text-muted-foreground">from previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Issues</CardTitle>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowDownRight className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-green-600">-5.2%</span>
                <span className="text-xs text-muted-foreground">from previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$524,230</div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-green-600">+8.3%</span>
                <span className="text-xs text-muted-foreground">from previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bargainings</CardTitle>
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <div className="flex items-center gap-1 mt-2">
                <Activity className="h-4 w-4 text-purple-600" />
                <span className="text-xs text-muted-foreground">In negotiation phase</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Trend - Takes 2 columns */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order & Revenue Trend</CardTitle>
                  <CardDescription>Daily orders and revenue for selected period</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Orders
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Revenue
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={orderTrendData}>
                    <defs>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                    />
                    <Area type="monotone" dataKey="orders" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOrders)" />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Distribution of current orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex flex-col">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                          data={statusDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                      >
                        {statusDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {statusDistribution.map((status, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: status.color }}
                        />
                        <div className="flex-1">
                          <p className="text-xs font-medium">{status.name}</p>
                          <p className="text-xs text-muted-foreground">{status.value}%</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Purchaser Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Top Purchaser Performance</CardTitle>
              <CardDescription>Orders and spending by top 5 purchasers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={purchaserPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number, name: string) => {
                          if (name === 'amount') return [formatCurrency(value), 'Amount']
                          return [value, 'Orders']
                        }}
                    />
                    <Legend />
                    <Bar dataKey="orders" fill="#3b82f6" name="Orders" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="amount" fill="#10b981" name="Amount ($)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className={`p-2 rounded-lg ${
                          activity.type === 'success' ? 'bg-green-100 dark:bg-green-900' :
                              activity.type === 'info' ? 'bg-blue-100 dark:bg-blue-900' :
                                  activity.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
                                      'bg-red-100 dark:bg-red-900'
                      }`}>
                        <Activity className={`h-4 w-4 ${
                            activity.type === 'success' ? 'text-green-600 dark:text-green-400' :
                                activity.type === 'info' ? 'text-blue-600 dark:text-blue-400' :
                                    activity.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                                        'text-red-600 dark:text-red-400'
                        }`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {activity.order}
                          </Badge>
                          <span className="text-xs text-muted-foreground">by {activity.user}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4" asChild>
                <Link href="/dashboard/activity">View All Activity</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links - Enhanced */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Jump to key reports and dashboards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950">
                <Link href="/monitor/reports/bargaining">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold">Bargaining Report</p>
                    <p className="text-xs text-muted-foreground">View negotiations</p>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950">
                <Link href="/monitor/reports/wallet-transactions">
                  <Wallet className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold">Wallet Report</p>
                    <p className="text-xs text-muted-foreground">Track transactions</p>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950">
                <Link href="/monitor/reports/purchaser-performance">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div className="text-left">
                    <p className="font-semibold">Performance Report</p>
                    <p className="text-xs text-muted-foreground">Analyze metrics</p>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950">
                <Link href="/monitor/audit/dashboard">
                  <Activity className="h-5 w-5 text-orange-600" />
                  <div className="text-left">
                    <p className="font-semibold">Audit Dashboard</p>
                    <p className="text-xs text-muted-foreground">Review activity</p>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}