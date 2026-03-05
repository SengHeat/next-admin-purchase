'use client'

import { useState } from 'react'
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
import { Search, Plus, Filter, Download, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import Link from 'next/link'

/**
 * Mock order data
 */
const mockOrders = [
  {
    id: 1,
    order_number: 'ORD-2024-001',
    purchaser_name: 'John Doe',
    total_amount: 5230.00,
    status: 'approved',
    priority: 'high',
    expected_delivery: '2024-03-15',
    created_at: '2024-03-01',
  },
  {
    id: 2,
    order_number: 'ORD-2024-002',
    purchaser_name: 'Jane Smith',
    total_amount: 3120.00,
    status: 'pending_approval',
    priority: 'medium',
    expected_delivery: '2024-03-20',
    created_at: '2024-03-02',
  },
  {
    id: 3,
    order_number: 'ORD-2024-003',
    purchaser_name: 'Bob Johnson',
    total_amount: 8950.00,
    status: 'in_progress',
    priority: 'urgent',
    expected_delivery: '2024-03-10',
    created_at: '2024-02-28',
  },
  {
    id: 4,
    order_number: 'ORD-2024-004',
    purchaser_name: 'Alice Brown',
    total_amount: 2540.00,
    status: 'completed',
    priority: 'low',
    expected_delivery: '2024-03-05',
    created_at: '2024-02-25',
  },
  {
    id: 5,
    order_number: 'ORD-2024-005',
    purchaser_name: 'Charlie Wilson',
    total_amount: 6780.00,
    status: 'on_hold',
    priority: 'medium',
    expected_delivery: '2024-03-25',
    created_at: '2024-03-03',
  },
  {
    id: 6,
    order_number: 'ORD-2024-006',
    purchaser_name: 'Diana Prince',
    total_amount: 4200.00,
    status: 'approved',
    priority: 'high',
    expected_delivery: '2024-03-18',
    created_at: '2024-03-04',
  },
  {
    id: 7,
    order_number: 'ORD-2024-007',
    purchaser_name: 'Eve Martinez',
    total_amount: 1890.00,
    status: 'in_progress',
    priority: 'low',
    expected_delivery: '2024-03-22',
    created_at: '2024-03-05',
  },
]

/**
 * Status badge configuration
 */
const statusConfig: Record<string, { label: string; className: string }> = {
  approved: {
    label: 'Approved',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100'
  },
  pending_approval: {
    label: 'Pending Approval',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100'
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-100'
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100'
  },
  on_hold: {
    label: 'On Hold',
    className: 'bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-100'
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100'
  },
}

/**
 * Priority badge configuration
 */
const priorityConfig: Record<string, { label: string; className: string }> = {
  low: {
    label: 'Low',
    className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100'
  },
  medium: {
    label: 'Medium',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100'
  },
  high: {
    label: 'High',
    className: 'bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-100'
  },
  urgent: {
    label: 'Urgent',
    className: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100'
  },
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  // Filter orders based on search and filters
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
        order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.purchaser_name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  // Calculate statistics
  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending_approval').length,
    inProgress: mockOrders.filter(o => o.status === 'in_progress').length,
    completed: mockOrders.filter(o => o.status === 'completed').length,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground mt-1">Manage and track your purchase orders</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button asChild>
              <Link href="/dashboard/orders/new">
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
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
                    placeholder="Search by order number or purchaser..."
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
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <Select
                  value={priorityFilter}
                  onValueChange={(value) => {
                    setPriorityFilter(value)
                    handleFilterChange()
                  }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Purchaser</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Expected Delivery</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                          No orders found. Try adjusting your search or filters.
                        </TableCell>
                      </TableRow>
                  ) : (
                      paginatedOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.order_number}</TableCell>
                            <TableCell>{order.purchaser_name}</TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(order.total_amount)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                  variant="outline"
                                  className={priorityConfig[order.priority]?.className}
                              >
                                {priorityConfig[order.priority]?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                  variant="outline"
                                  className={statusConfig[order.status]?.className}
                              >
                                {statusConfig[order.status]?.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(order.created_at)}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(order.expected_delivery)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button asChild variant="ghost" size="sm">
                                <Link href={`/dashboard/orders/${order.id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </Link>
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
                      disabled={currentPage === totalPages || filteredOrders.length === 0}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages || filteredOrders.length === 0}
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