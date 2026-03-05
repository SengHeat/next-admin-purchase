'use client'

import {useEffect, useState} from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Users, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import { purchaserService } from 'src/services/purchaser.service'

/**
 * Mock purchaser data based on API response
 */
const mockPurchasers = [
  {
    id: 3,
    user_id: 71,
    purchase_name: 'Kim Sivkeav',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 4,
    user_id: 89,
    purchase_name: 'Ly Chansorng',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 5,
    user_id: 186,
    purchase_name: 'Pheaktra',
    team: null,
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 6,
    user_id: 12611,
    purchase_name: 'Eang Sreymom',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 7,
    user_id: 43098,
    purchase_name: 'Seng Sreynith',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 8,
    user_id: 54392,
    purchase_name: 'Chhour Chhungheak',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 9,
    user_id: 54393,
    purchase_name: 'Sok Keosokun',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 10,
    user_id: 333567,
    purchase_name: 'Leng Vansothea',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 11,
    user_id: 333578,
    purchase_name: 'Chhunleang Redika',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 12,
    user_id: 336650,
    purchase_name: 'Ly Chavaryyas',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 13,
    user_id: 343023,
    purchase_name: 'Kong Panhchakpor',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 14,
    user_id: 343025,
    purchase_name: 'Kong Chandy',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 15,
    user_id: 360255,
    purchase_name: 'Chea Chankanika',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 16,
    user_id: 360259,
    purchase_name: 'Roeurn Reaksa',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
  {
    id: 2,
    user_id: 65,
    purchase_name: 'Eav Vengsong',
    team: 'KH Team',
    active_orders_count: 0,
    max_orders_per_day: 100,
    daily_limits: { cny: 0, thb: 0, usd: 0 },
    daily_totals: { cny: 0, thb: 0, usd: 0 },
    enable: false,
  },
]

export default function PurchasersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(15)
  const [purchasers, setPurchasers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter purchasers
  const filteredPurchasers = mockPurchasers.filter((purchaser) => {
    const matchesSearch =
        purchaser.purchase_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purchaser.user_id.toString().includes(searchQuery) ||
        (purchaser.team?.toLowerCase() || '').includes(searchQuery.toLowerCase())

    const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'enabled' && purchaser.enable) ||
        (statusFilter === 'disabled' && !purchaser.enable)

    return matchesSearch && matchesStatus
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredPurchasers.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedPurchasers = filteredPurchasers.slice(startIndex, endIndex)

  // Calculate statistics
  const stats = {
    total: mockPurchasers.length,
    enabled: mockPurchasers.filter((p) => p.enable).length,
    disabled: mockPurchasers.filter((p) => !p.enable).length,
    activeOrders: mockPurchasers.reduce((sum, p) => sum + p.active_orders_count, 0),
  }

  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  useEffect(() => {
    const fetchPurchasers = async () => {
      try {
        setLoading(true)
        const response = await purchaserService.getPurchasers()
        setPurchasers(response.data) // adjust based on your ListResponse shape
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Purchasers</h1>
            <p className="text-muted-foreground mt-1">Manage purchaser accounts and details</p>
          </div>
          <Button>
            <Users className="w-4 h-4 mr-2" />
            Add Purchaser
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Purchasers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Enabled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.enabled}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Disabled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.disabled}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name, user ID, or team..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      handleFilterChange()
                    }}
                />
              </div>
              <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value)
                    handleFilterChange()
                  }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="enabled">Enabled</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Purchasers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Purchasers</CardTitle>
            <CardDescription>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredPurchasers.length)} of{' '}
              {filteredPurchasers.length} {filteredPurchasers.length === 1 ? 'purchaser' : 'purchasers'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Active Orders</TableHead>
                    <TableHead>Max Orders/Day</TableHead>
                    <TableHead>Daily Limits</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPurchasers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                          No purchasers found. Try adjusting your search or filters.
                        </TableCell>
                      </TableRow>
                  ) : (
                      paginatedPurchasers.map((purchaser) => (
                          <TableRow key={purchaser.id}>
                            <TableCell className="font-medium">{purchaser.user_id}</TableCell>
                            <TableCell>{purchaser.purchase_name}</TableCell>
                            <TableCell>
                              {purchaser.team ? (
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
                                    {purchaser.team}
                                  </Badge>
                              ) : (
                                  <span className="text-muted-foreground text-sm">No team</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                  variant="outline"
                                  className={
                                    purchaser.active_orders_count > 0
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                                  }
                              >
                                {purchaser.active_orders_count}
                              </Badge>
                            </TableCell>
                            <TableCell>{purchaser.max_orders_per_day}</TableCell>
                            <TableCell>
                              <div className="flex flex-col text-xs space-y-1">
                                {purchaser.daily_limits.usd > 0 && (
                                    <span>USD: {formatCurrency(purchaser.daily_limits.usd)}</span>
                                )}
                                {purchaser.daily_limits.cny > 0 && (
                                    <span>CNY: {formatCurrency(purchaser.daily_limits.cny, 'CNY')}</span>
                                )}
                                {purchaser.daily_limits.thb > 0 && (
                                    <span>THB: {formatCurrency(purchaser.daily_limits.thb, 'THB')}</span>
                                )}
                                {purchaser.daily_limits.usd === 0 &&
                                    purchaser.daily_limits.cny === 0 &&
                                    purchaser.daily_limits.thb === 0 && (
                                        <span className="text-muted-foreground">No limits set</span>
                                    )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                  variant="outline"
                                  className={
                                    purchaser.enable
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                                  }
                              >
                                {purchaser.enable ? 'Enabled' : 'Disabled'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button asChild variant="ghost" size="sm">
                                <Link href={`/dashboard/purchasers/${purchaser.id}`}>View</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Rows per page</p>
                <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => {
                      setPageSize(Number(value))
                      setCurrentPage(1)
                    }}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages || 1}
                </p>
                <div className="flex gap-1">
                  <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages || filteredPurchasers.length === 0}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages || filteredPurchasers.length === 0}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}