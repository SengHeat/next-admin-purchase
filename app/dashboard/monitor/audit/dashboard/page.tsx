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
import {
    Search,
    Filter,
    Download,
    Eye,
    Activity,
    User,
    FileText,
    AlertCircle,
    CheckCircle,
    XCircle,
    Clock,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Shield,
    TrendingUp,
    UserCheck,
    FileWarning,
} from 'lucide-react'
import Link from 'next/link'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

/**
 * Mock audit log data
 */
const mockAuditLogs = [
    {
        id: 1,
        timestamp: '2024-03-05 14:30:25',
        user: 'Kim Sivkeav',
        user_id: 71,
        action: 'ORDER_CREATED',
        resource: 'Order',
        resource_id: 'ORD-2024-156',
        ip_address: '192.168.1.45',
        status: 'success',
        details: 'Created new order with 5 items',
        severity: 'info',
    },
    {
        id: 2,
        timestamp: '2024-03-05 14:25:12',
        user: 'Ly Chansorng',
        user_id: 89,
        action: 'ORDER_UPDATED',
        resource: 'Order',
        resource_id: 'ORD-2024-155',
        ip_address: '192.168.1.78',
        status: 'success',
        details: 'Updated order status to approved',
        severity: 'info',
    },
    {
        id: 3,
        timestamp: '2024-03-05 14:20:45',
        user: 'Eav Vengsong',
        user_id: 65,
        action: 'LOGIN_FAILED',
        resource: 'Authentication',
        resource_id: null,
        ip_address: '192.168.1.92',
        status: 'failed',
        details: 'Invalid credentials provided',
        severity: 'warning',
    },
    {
        id: 4,
        timestamp: '2024-03-05 14:15:33',
        user: 'Pheaktra',
        user_id: 186,
        action: 'ORDER_DELETED',
        resource: 'Order',
        resource_id: 'ORD-2024-154',
        ip_address: '192.168.1.56',
        status: 'success',
        details: 'Deleted cancelled order',
        severity: 'high',
    },
    {
        id: 5,
        timestamp: '2024-03-05 14:10:18',
        user: 'Eang Sreymom',
        user_id: 12611,
        action: 'PAYMENT_PROCESSED',
        resource: 'Payment',
        resource_id: 'PAY-2024-891',
        ip_address: '192.168.1.34',
        status: 'success',
        details: 'Payment of $5,230 processed successfully',
        severity: 'info',
    },
    {
        id: 6,
        timestamp: '2024-03-05 14:05:22',
        user: 'Seng Sreynith',
        user_id: 43098,
        action: 'USER_UPDATED',
        resource: 'User',
        resource_id: 'USR-334',
        ip_address: '192.168.1.67',
        status: 'success',
        details: 'Updated user permissions',
        severity: 'medium',
    },
    {
        id: 7,
        timestamp: '2024-03-05 14:00:45',
        user: 'Chhour Chhungheak',
        user_id: 54392,
        action: 'EXPORT_DATA',
        resource: 'Report',
        resource_id: 'RPT-2024-45',
        ip_address: '192.168.1.88',
        status: 'success',
        details: 'Exported order report (250 records)',
        severity: 'info',
    },
    {
        id: 8,
        timestamp: '2024-03-05 13:55:11',
        user: 'Sok Keosokun',
        user_id: 54393,
        action: 'ACCESS_DENIED',
        resource: 'Admin Panel',
        resource_id: null,
        ip_address: '192.168.1.99',
        status: 'failed',
        details: 'Insufficient permissions to access admin panel',
        severity: 'warning',
    },
    {
        id: 9,
        timestamp: '2024-03-05 13:50:33',
        user: 'Leng Vansothea',
        user_id: 333567,
        action: 'BARGAINING_COMPLETED',
        resource: 'Bargaining',
        resource_id: 'BRG-2024-778',
        ip_address: '192.168.1.45',
        status: 'success',
        details: 'Completed bargaining with final price $3,200',
        severity: 'info',
    },
    {
        id: 10,
        timestamp: '2024-03-05 13:45:27',
        user: 'Chhunleang Redika',
        user_id: 333578,
        action: 'ORDER_CANCELLED',
        resource: 'Order',
        resource_id: 'ORD-2024-153',
        ip_address: '192.168.1.23',
        status: 'success',
        details: 'Order cancelled by customer request',
        severity: 'medium',
    },
    {
        id: 11,
        timestamp: '2024-03-05 13:40:15',
        user: 'Ly Chavaryyas',
        user_id: 336650,
        action: 'LOGIN_SUCCESS',
        resource: 'Authentication',
        resource_id: null,
        ip_address: '192.168.1.67',
        status: 'success',
        details: 'User logged in successfully',
        severity: 'info',
    },
    {
        id: 12,
        timestamp: '2024-03-05 13:35:44',
        user: 'Kong Panhchakpor',
        user_id: 343023,
        action: 'WALLET_TRANSFER',
        resource: 'Wallet',
        resource_id: 'WAL-2024-456',
        ip_address: '192.168.1.89',
        status: 'success',
        details: 'Transferred $1,000 to vendor wallet',
        severity: 'info',
    },
    {
        id: 13,
        timestamp: '2024-03-05 13:30:22',
        user: 'Kong Chandy',
        user_id: 343025,
        action: 'SYSTEM_ERROR',
        resource: 'System',
        resource_id: null,
        ip_address: '192.168.1.12',
        status: 'failed',
        details: 'Database connection timeout',
        severity: 'critical',
    },
    {
        id: 14,
        timestamp: '2024-03-05 13:25:18',
        user: 'Chea Chankanika',
        user_id: 360255,
        action: 'ORDER_APPROVED',
        resource: 'Order',
        resource_id: 'ORD-2024-152',
        ip_address: '192.168.1.34',
        status: 'success',
        details: 'Order approved by manager',
        severity: 'info',
    },
    {
        id: 15,
        timestamp: '2024-03-05 13:20:55',
        user: 'Roeurn Reaksa',
        user_id: 360259,
        action: 'SETTINGS_CHANGED',
        resource: 'Settings',
        resource_id: 'SET-GENERAL',
        ip_address: '192.168.1.78',
        status: 'success',
        details: 'Updated system notification settings',
        severity: 'medium',
    },
]

/**
 * Action type configuration
 */
const actionConfig: Record<string, { label: string; className: string; icon: any }> = {
    ORDER_CREATED: {
        label: 'Order Created',
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
        icon: FileText,
    },
    ORDER_UPDATED: {
        label: 'Order Updated',
        className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100',
        icon: FileText,
    },
    ORDER_DELETED: {
        label: 'Order Deleted',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
        icon: FileText,
    },
    ORDER_CANCELLED: {
        label: 'Order Cancelled',
        className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
        icon: XCircle,
    },
    ORDER_APPROVED: {
        label: 'Order Approved',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        icon: CheckCircle,
    },
    LOGIN_SUCCESS: {
        label: 'Login Success',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        icon: UserCheck,
    },
    LOGIN_FAILED: {
        label: 'Login Failed',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
        icon: AlertCircle,
    },
    ACCESS_DENIED: {
        label: 'Access Denied',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
        icon: Shield,
    },
    PAYMENT_PROCESSED: {
        label: 'Payment Processed',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        icon: CheckCircle,
    },
    USER_UPDATED: {
        label: 'User Updated',
        className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
        icon: User,
    },
    EXPORT_DATA: {
        label: 'Data Exported',
        className: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100',
        icon: Download,
    },
    BARGAINING_COMPLETED: {
        label: 'Bargaining Completed',
        className: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100',
        icon: CheckCircle,
    },
    WALLET_TRANSFER: {
        label: 'Wallet Transfer',
        className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
        icon: Activity,
    },
    SYSTEM_ERROR: {
        label: 'System Error',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
        icon: AlertCircle,
    },
    SETTINGS_CHANGED: {
        label: 'Settings Changed',
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
        icon: Activity,
    },
}

/**
 * Severity configuration
 */
const severityConfig: Record<string, { label: string; className: string }> = {
    info: {
        label: 'Info',
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    },
    low: {
        label: 'Low',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    },
    medium: {
        label: 'Medium',
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    },
    high: {
        label: 'High',
        className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
    },
    warning: {
        label: 'Warning',
        className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
    },
    critical: {
        label: 'Critical',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    },
}

/**
 * Chart data
 */
const activityTrendData = [
    { name: 'Mon', activities: 234, failed: 12 },
    { name: 'Tue', activities: 189, failed: 8 },
    { name: 'Wed', activities: 276, failed: 15 },
    { name: 'Thu', activities: 312, failed: 10 },
    { name: 'Fri', activities: 298, failed: 18 },
    { name: 'Sat', activities: 156, failed: 5 },
    { name: 'Sun', activities: 134, failed: 7 },
]

const actionDistribution = [
    { name: 'Order Actions', value: 45, color: '#3b82f6' },
    { name: 'Authentication', value: 25, color: '#10b981' },
    { name: 'Payments', value: 15, color: '#f59e0b' },
    { name: 'User Management', value: 10, color: '#8b5cf6' },
    { name: 'System Events', value: 5, color: '#ef4444' },
]

export default function AuditDashboardPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [actionFilter, setActionFilter] = useState<string>('all')
    const [severityFilter, setSeverityFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // Filter audit logs
    const filteredLogs = mockAuditLogs.filter((log) => {
        const matchesSearch =
            log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (log.resource_id?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            log.ip_address.includes(searchQuery)

        const matchesAction = actionFilter === 'all' || log.action === actionFilter
        const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter
        const matchesStatus = statusFilter === 'all' || log.status === statusFilter

        return matchesSearch && matchesAction && matchesSeverity && matchesStatus
    })

    // Pagination calculations
    const totalPages = Math.ceil(filteredLogs.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedLogs = filteredLogs.slice(startIndex, endIndex)

    // Calculate statistics
    const stats = {
        total: mockAuditLogs.length,
        success: mockAuditLogs.filter((l) => l.status === 'success').length,
        failed: mockAuditLogs.filter((l) => l.status === 'failed').length,
        critical: mockAuditLogs.filter((l) => l.severity === 'critical').length,
    }

    const handleFilterChange = () => {
        setCurrentPage(1)
    }

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Audit Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Monitor system activities and security events</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Logs
                    </Button>
                    <Badge variant="outline" className="gap-1 px-3">
                        <Activity className="h-3 w-3" />
                        Live Monitoring
                    </Badge>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Events
                        </CardTitle>
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Successful
                        </CardTitle>
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.success}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {((stats.success / stats.total) * 100).toFixed(1)}% success rate
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Failed Events
                        </CardTitle>
                        <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                        <p className="text-xs text-muted-foreground mt-1">Require attention</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Critical Alerts
                        </CardTitle>
                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{stats.critical}</div>
                        <p className="text-xs text-muted-foreground mt-1">Immediate action needed</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Trend */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Activity Trend</CardTitle>
                        <CardDescription>System activities over the past week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={activityTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="activities"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        name="Total Activities"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="failed"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        name="Failed Events"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Action Distribution</CardTitle>
                        <CardDescription>Events by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80 flex flex-col">
                            <div className="flex-1">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={actionDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {actionDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2 mt-4">
                                {actionDistribution.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="text-xs font-medium">{item.name}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by user, action, resource ID, or IP address..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        handleFilterChange()
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <Select
                                value={actionFilter}
                                onValueChange={(value) => {
                                    setActionFilter(value)
                                    handleFilterChange()
                                }}
                            >
                                <SelectTrigger className="w-full md:w-[200px]">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Action Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Actions</SelectItem>
                                    <SelectItem value="ORDER_CREATED">Order Created</SelectItem>
                                    <SelectItem value="ORDER_UPDATED">Order Updated</SelectItem>
                                    <SelectItem value="ORDER_DELETED">Order Deleted</SelectItem>
                                    <SelectItem value="LOGIN_SUCCESS">Login Success</SelectItem>
                                    <SelectItem value="LOGIN_FAILED">Login Failed</SelectItem>
                                    <SelectItem value="PAYMENT_PROCESSED">Payment Processed</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={severityFilter}
                                onValueChange={(value) => {
                                    setSeverityFilter(value)
                                    handleFilterChange()
                                }}
                            >
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Severity</SelectItem>
                                    <SelectItem value="info">Info</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>

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
                                    <SelectItem value="success">Success</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Audit Logs Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Audit Logs</CardTitle>
                    <CardDescription>
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs.length)} of{' '}
                        {filteredLogs.length} {filteredLogs.length === 1 ? 'log' : 'logs'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Resource</TableHead>
                                    <TableHead>IP Address</TableHead>
                                    <TableHead>Severity</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedLogs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                                            No audit logs found. Try adjusting your search or filters.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedLogs.map((log) => {
                                        const ActionIcon = actionConfig[log.action]?.icon || Activity
                                        return (
                                            <TableRow key={log.id}>
                                                <TableCell className="font-mono text-xs">
                                                    {formatTimestamp(log.timestamp)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded">
                                                            <User className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm">{log.user}</p>
                                                            <p className="text-xs text-muted-foreground">ID: {log.user_id}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={`gap-1 ${actionConfig[log.action]?.className}`}
                                                    >
                                                        <ActionIcon className="h-3 w-3" />
                                                        {actionConfig[log.action]?.label || log.action}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="text-sm font-medium">{log.resource}</p>
                                                        {log.resource_id && (
                                                            <p className="text-xs text-muted-foreground font-mono">
                                                                {log.resource_id}
                                                            </p>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-mono text-xs">{log.ip_address}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={severityConfig[log.severity]?.className}
                                                    >
                                                        {severityConfig[log.severity]?.label}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            log.status === 'success'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                                        }
                                                    >
                                                        {log.status === 'success' ? (
                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                        ) : (
                                                            <XCircle className="h-3 w-3 mr-1" />
                                                        )}
                                                        {log.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        Details
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
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
                                    disabled={currentPage === totalPages || filteredLogs.length === 0}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages || filteredLogs.length === 0}
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