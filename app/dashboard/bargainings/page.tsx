'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
import {
  Scale,
  TrendingDown,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'

/**
 * Mock bargaining data
 */
const mockBargainings = [
  {
    id: 1,
    bargaining_number: 'BAR-2024-001',
    item_name: 'Office Supplies',
    vendor_name: 'Vendor A',
    original_price: 5000,
    proposed_price: 4500,
    discount_percentage: 10,
    status: 'under_review',
    created_by: 'Kim Sivkeav',
    created_at: '2024-03-01',
  },
  {
    id: 2,
    bargaining_number: 'BAR-2024-002',
    item_name: 'IT Equipment',
    vendor_name: 'Vendor B',
    original_price: 15000,
    proposed_price: 13500,
    discount_percentage: 10,
    status: 'approved',
    created_by: 'Ly Chansorng',
    created_at: '2024-03-02',
  },
  {
    id: 3,
    bargaining_number: 'BAR-2024-003',
    item_name: 'Furniture',
    vendor_name: 'Vendor C',
    original_price: 8000,
    proposed_price: 7200,
    discount_percentage: 10,
    status: 'negotiation',
    created_by: 'Eav Vengsong',
    created_at: '2024-02-28',
  },
  {
    id: 4,
    bargaining_number: 'BAR-2024-004',
    item_name: 'Marketing Materials',
    vendor_name: 'Vendor D',
    original_price: 3000,
    proposed_price: 2700,
    discount_percentage: 10,
    status: 'pending',
    created_by: 'Kim Sivkeav',
    created_at: '2024-03-03',
  },
  {
    id: 5,
    bargaining_number: 'BAR-2024-005',
    item_name: 'Software Licenses',
    vendor_name: 'Vendor E',
    original_price: 12000,
    proposed_price: 10800,
    discount_percentage: 10,
    status: 'rejected',
    created_by: 'Pheaktra',
    created_at: '2024-03-04',
  },
  {
    id: 6,
    bargaining_number: 'BAR-2024-006',
    item_name: 'Office Equipment',
    vendor_name: 'Vendor F',
    original_price: 6500,
    proposed_price: 5850,
    discount_percentage: 10,
    status: 'pending',
    created_by: 'Kim Sivkeav',
    created_at: '2024-03-05',
  },
  {
    id: 7,
    bargaining_number: 'BAR-2024-007',
    item_name: 'Cleaning Supplies',
    vendor_name: 'Vendor G',
    original_price: 2500,
    proposed_price: 2250,
    discount_percentage: 10,
    status: 'under_review',
    created_by: 'Eang Sreymom',
    created_at: '2024-03-06',
  },
  {
    id: 8,
    bargaining_number: 'BAR-2024-008',
    item_name: 'Security Systems',
    vendor_name: 'Vendor H',
    original_price: 20000,
    proposed_price: 18000,
    discount_percentage: 10,
    status: 'negotiation',
    created_by: 'Seng Sreynith',
    created_at: '2024-03-07',
  },
  {
    id: 9,
    bargaining_number: 'BAR-2024-009',
    item_name: 'Conference Room Setup',
    vendor_name: 'Vendor I',
    original_price: 9500,
    proposed_price: 8550,
    discount_percentage: 10,
    status: 'approved',
    created_by: 'Kim Sivkeav',
    created_at: '2024-03-08',
  },
  {
    id: 10,
    bargaining_number: 'BAR-2024-010',
    item_name: 'Catering Services',
    vendor_name: 'Vendor J',
    original_price: 4500,
    proposed_price: 4050,
    discount_percentage: 10,
    status: 'pending',
    created_by: 'Chhour Chhungheak',
    created_at: '2024-03-09',
  },
  {
    id: 11,
    bargaining_number: 'BAR-2024-011',
    item_name: 'Printing Services',
    vendor_name: 'Vendor K',
    original_price: 3500,
    proposed_price: 3150,
    discount_percentage: 10,
    status: 'approved',
    created_by: 'Sok Keosokun',
    created_at: '2024-03-10',
  },
  {
    id: 12,
    bargaining_number: 'BAR-2024-012',
    item_name: 'Transportation',
    vendor_name: 'Vendor L',
    original_price: 7500,
    proposed_price: 6750,
    discount_percentage: 10,
    status: 'under_review',
    created_by: 'Leng Vansothea',
    created_at: '2024-03-11',
  },
]

const statusColors: Record<string, { bg: string; text: string }> = {
  draft: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-800 dark:text-slate-100' },
  pending: { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-100' },
  under_review: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-100' },
  approved: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-100' },
  rejected: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-100' },
  negotiation: { bg: 'bg-indigo-100 dark:bg-indigo-900', text: 'text-indigo-800 dark:text-indigo-100' },
}

type TabType = 'all' | 'pending' | 'my-submissions'

export default function BargainingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Assume current user is 'Kim Sivkeav' for demo
  const currentUser = 'Kim Sivkeav'

  // Filter bargainings based on active tab
  const filteredBargainings = mockBargainings.filter((bargaining) => {
    if (activeTab === 'all') return true
    if (activeTab === 'pending') {
      return bargaining.status === 'pending' || bargaining.status === 'under_review'
    }
    if (activeTab === 'my-submissions') {
      return bargaining.created_by === currentUser
    }
    return true
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredBargainings.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedBargainings = filteredBargainings.slice(startIndex, endIndex)

  // Calculate statistics
  const stats = {
    total: mockBargainings.length,
    pending: mockBargainings.filter(b => b.status === 'pending' || b.status === 'under_review').length,
    approved: mockBargainings.filter(b => b.status === 'approved').length,
    mySubmissions: mockBargainings.filter(b => b.created_by === currentUser).length,
  }

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setCurrentPage(1) // Reset to first page when changing tabs
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
            <h1 className="text-3xl font-bold tracking-tight">Bargainings</h1>
            <p className="text-muted-foreground mt-1">Negotiate prices with vendors</p>
          </div>
          <Button>
            <Scale className="w-4 h-4 mr-2" />
            New Bargaining
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bargainings
              </CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Review
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Approved
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                My Submissions
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.mySubmissions}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for filtering */}
        <div className="flex gap-2 border-b border-border">
          <Button
              variant="ghost"
              className={`rounded-none ${
                  activeTab === 'all'
                      ? 'border-b-2 border-primary text-primary'
                      : 'border-b-2 border-transparent'
              }`}
              onClick={() => handleTabChange('all')}
          >
            All Bargainings
            <Badge variant="secondary" className="ml-2">
              {stats.total}
            </Badge>
          </Button>
          <Button
              variant="ghost"
              className={`rounded-none ${
                  activeTab === 'pending'
                      ? 'border-b-2 border-primary text-primary'
                      : 'border-b-2 border-transparent'
              }`}
              onClick={() => handleTabChange('pending')}
          >
            Pending
            <Badge variant="secondary" className="ml-2">
              {stats.pending}
            </Badge>
          </Button>
          <Button
              variant="ghost"
              className={`rounded-none ${
                  activeTab === 'my-submissions'
                      ? 'border-b-2 border-primary text-primary'
                      : 'border-b-2 border-transparent'
              }`}
              onClick={() => handleTabChange('my-submissions')}
          >
            My Submissions
            <Badge variant="secondary" className="ml-2">
              {stats.mySubmissions}
            </Badge>
          </Button>
        </div>

        {/* Bargainings Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === 'all' && 'All Bargainings'}
              {activeTab === 'pending' && 'Pending Bargainings'}
              {activeTab === 'my-submissions' && 'My Submissions'}
            </CardTitle>
            <CardDescription>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredBargainings.length)} of{' '}
              {filteredBargainings.length} {filteredBargainings.length === 1 ? 'bargaining' : 'bargainings'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bargaining #</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Original Price</TableHead>
                    <TableHead>Proposed Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBargainings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center h-24 text-muted-foreground">
                          No bargainings found in this category.
                        </TableCell>
                      </TableRow>
                  ) : (
                      paginatedBargainings.map((bargaining) => (
                          <TableRow key={bargaining.id}>
                            <TableCell className="font-medium">{bargaining.bargaining_number}</TableCell>
                            <TableCell>{bargaining.item_name}</TableCell>
                            <TableCell>{bargaining.vendor_name}</TableCell>
                            <TableCell className="text-muted-foreground line-through">
                              ${bargaining.original_price.toLocaleString()}
                            </TableCell>
                            <TableCell className="font-semibold text-green-600">
                              ${bargaining.proposed_price.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                -{bargaining.discount_percentage}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                  variant="outline"
                                  className={`${statusColors[bargaining.status]?.bg} ${statusColors[bargaining.status]?.text}`}
                              >
                                {bargaining.status.replace(/_/g, ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">{bargaining.created_by}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDate(bargaining.created_at)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
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
                      disabled={currentPage === totalPages || filteredBargainings.length === 0}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages || filteredBargainings.length === 0}
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