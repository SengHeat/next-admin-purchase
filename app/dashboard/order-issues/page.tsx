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
import { AlertCircle, Search, Filter, Plus, Eye, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

/**
 * Mock order issues data
 */
const mockIssues = [
  {
    id: 1,
    issue_number: 'ISS-2024-001',
    order_number: 'ORD-2024-045',
    title: 'Delayed Delivery',
    description: 'Order has been delayed by 5 days due to logistics issues',
    issue_type: 'delay',
    severity: 'high',
    status: 'open',
    reported_by: 'John Doe',
    assigned_to: 'Support Team',
    created_at: '2024-03-02',
    updated_at: '2024-03-02',
  },
  {
    id: 2,
    issue_number: 'ISS-2024-002',
    order_number: 'ORD-2024-046',
    title: 'Quality Issue',
    description: 'Received products do not meet quality standards',
    issue_type: 'quality',
    severity: 'medium',
    status: 'in_progress',
    reported_by: 'Jane Smith',
    assigned_to: 'QA Team',
    created_at: '2024-03-01',
    updated_at: '2024-03-03',
  },
  {
    id: 3,
    issue_number: 'ISS-2024-003',
    order_number: 'ORD-2024-047',
    title: 'Missing Items',
    description: '3 items missing from the shipment',
    issue_type: 'missing_items',
    severity: 'critical',
    status: 'escalated',
    reported_by: 'Bob Johnson',
    assigned_to: 'Operations Manager',
    created_at: '2024-02-28',
    updated_at: '2024-03-01',
  },
  {
    id: 4,
    issue_number: 'ISS-2024-004',
    order_number: 'ORD-2024-048',
    title: 'Wrong Item Delivered',
    description: 'Received incorrect product model',
    issue_type: 'wrong_item',
    severity: 'high',
    status: 'open',
    reported_by: 'Alice Brown',
    assigned_to: 'Warehouse Team',
    created_at: '2024-02-27',
    updated_at: '2024-02-27',
  },
  {
    id: 5,
    issue_number: 'ISS-2024-005',
    order_number: 'ORD-2024-049',
    title: 'Damaged Goods',
    description: 'Items arrived damaged during shipping',
    issue_type: 'damage',
    severity: 'high',
    status: 'in_progress',
    reported_by: 'Charlie Wilson',
    assigned_to: 'Claims Team',
    created_at: '2024-02-26',
    updated_at: '2024-03-02',
  },
  {
    id: 6,
    issue_number: 'ISS-2024-006',
    order_number: 'ORD-2024-050',
    title: 'Pricing Error',
    description: 'Invoice amount does not match order',
    issue_type: 'pricing',
    severity: 'medium',
    status: 'resolved',
    reported_by: 'Diana Prince',
    assigned_to: 'Finance Team',
    created_at: '2024-02-25',
    updated_at: '2024-02-28',
  },
]

/**
 * Severity badge configuration
 */
const severityConfig: Record<string, { label: string; className: string }> = {
  low: {
    label: 'Low',
    className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100'
  },
  medium: {
    label: 'Medium',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100'
  },
  high: {
    label: 'High',
    className: 'bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-100'
  },
  critical: {
    label: 'Critical',
    className: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100'
  },
}

/**
 * Status badge configuration
 */
const statusConfig: Record<string, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100'
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100'
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100'
  },
  escalated: {
    label: 'Escalated',
    className: 'bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-100'
  },
  closed: {
    label: 'Closed',
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-100'
  },
}

/**
 * Issue type configuration
 */
const issueTypeConfig: Record<string, { label: string; icon: typeof AlertCircle }> = {
  delay: { label: 'Delayed Delivery', icon: AlertCircle },
  quality: { label: 'Quality Issue', icon: AlertTriangle },
  missing_items: { label: 'Missing Items', icon: AlertCircle },
  wrong_item: { label: 'Wrong Item', icon: AlertTriangle },
  damage: { label: 'Damaged Goods', icon: AlertCircle },
  pricing: { label: 'Pricing Error', icon: AlertTriangle },
  other: { label: 'Other', icon: AlertCircle },
}

export default function OrderIssuesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // Filter issues
  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch =
        issue.issue_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.reported_by.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter
    const matchesSeverity = severityFilter === 'all' || issue.severity === severityFilter
    const matchesType = typeFilter === 'all' || issue.issue_type === typeFilter

    return matchesSearch && matchesStatus && matchesSeverity && matchesType
  })

  // Calculate statistics
  const stats = {
    open: mockIssues.filter(i => i.status === 'open').length,
    inProgress: mockIssues.filter(i => i.status === 'in_progress').length,
    escalated: mockIssues.filter(i => i.status === 'escalated').length,
    resolved: mockIssues.filter(i => i.status === 'resolved').length,
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
            <h1 className="text-3xl font-bold tracking-tight">Order Issues</h1>
            <p className="text-muted-foreground mt-1">Track and resolve order problems</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/order-issues/new">
              <Plus className="w-4 h-4 mr-2" />
              Report Issue
            </Link>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Open Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.open}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Requires attention
              </p>
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
              <p className="text-xs text-muted-foreground mt-1">
                Being worked on
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Escalated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.escalated}</div>
              <p className="text-xs text-muted-foreground mt-1">
                High priority
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Successfully closed
              </p>
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
                    placeholder="Search by issue #, order #, title, or reporter..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="delay">Delayed Delivery</SelectItem>
                  <SelectItem value="quality">Quality Issue</SelectItem>
                  <SelectItem value="missing_items">Missing Items</SelectItem>
                  <SelectItem value="wrong_item">Wrong Item</SelectItem>
                  <SelectItem value="damage">Damaged Goods</SelectItem>
                  <SelectItem value="pricing">Pricing Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Issues Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Issues</CardTitle>
            <CardDescription>
              {filteredIssues.length} {filteredIssues.length === 1 ? 'issue' : 'issues'} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue #</TableHead>
                    <TableHead>Order #</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center h-24 text-muted-foreground">
                          No issues found. Try adjusting your search or filters.
                        </TableCell>
                      </TableRow>
                  ) : (
                      filteredIssues.map((issue) => (
                          <TableRow key={issue.id}>
                            <TableCell className="font-medium">
                              {issue.issue_number}
                            </TableCell>
                            <TableCell>
                              <Link
                                  href={`/dashboard/orders/${issue.order_number}`}
                                  className="text-primary hover:underline font-medium"
                              >
                                {issue.order_number}
                              </Link>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {issue.title}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {issueTypeConfig[issue.issue_type]?.label || issue.issue_type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                  variant="outline"
                                  className={severityConfig[issue.severity]?.className}
                              >
                                {severityConfig[issue.severity]?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                  variant="outline"
                                  className={statusConfig[issue.status]?.className}
                              >
                                {statusConfig[issue.status]?.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {issue.reported_by}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {issue.assigned_to}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(issue.created_at)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button asChild variant="ghost" size="sm">
                                <Link href={`/dashboard/order-issues/${issue.id}`}>
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
          </CardContent>
        </Card>
      </div>
  )
}