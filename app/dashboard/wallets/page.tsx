'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Wallet,
  Plus,
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  RefreshCw,
  CalendarDays,
  Building2,
  CreditCard,
  Activity
} from 'lucide-react'
import Link from 'next/link'

/**
 * Mock wallet data
 */
const mockWallets = [
  {
    id: 1,
    wallet_number: 'WAL-2024-001',
    holder_name: 'John Doe',
    department: 'IT Department',
    balance: 50000,
    currency: 'USD',
    status: 'active',
    last_transaction: '2024-03-04',
    total_credits: 75000,
    total_debits: 25000,
    created_at: '2024-01-15',
    transaction_count: 45,
  },
  {
    id: 2,
    wallet_number: 'WAL-2024-002',
    holder_name: 'Jane Smith',
    department: 'Marketing',
    balance: 32500,
    currency: 'USD',
    status: 'active',
    last_transaction: '2024-03-03',
    total_credits: 50000,
    total_debits: 17500,
    created_at: '2024-01-20',
    transaction_count: 32,
  },
  {
    id: 3,
    wallet_number: 'WAL-2024-003',
    holder_name: 'Bob Johnson',
    department: 'Operations',
    balance: 1500,
    currency: 'USD',
    status: 'active',
    last_transaction: '2024-03-02',
    total_credits: 10000,
    total_debits: 8500,
    created_at: '2024-02-01',
    transaction_count: 18,
  },
  {
    id: 4,
    wallet_number: 'WAL-2024-004',
    holder_name: 'Alice Brown',
    department: 'Finance',
    balance: 0,
    currency: 'USD',
    status: 'suspended',
    last_transaction: '2024-02-28',
    total_credits: 5000,
    total_debits: 5000,
    created_at: '2024-01-10',
    transaction_count: 12,
  },
]

/**
 * Mock transaction data
 */
const mockTransactions = [
  {
    id: 1,
    date: '2024-03-04',
    type: 'credit',
    amount: 5000,
    status: 'completed',
    description: 'Top-up received',
    wallet_id: 1,
    wallet_number: 'WAL-2024-001',
    reference: 'TXN-20240304-001',
    balance_after: 50000,
  },
  {
    id: 2,
    date: '2024-03-03',
    type: 'debit',
    amount: 2500,
    status: 'completed',
    description: 'Order ORD-2024-045',
    wallet_id: 1,
    wallet_number: 'WAL-2024-001',
    reference: 'TXN-20240303-001',
    balance_after: 45000,
  },
  {
    id: 3,
    date: '2024-03-03',
    type: 'credit',
    amount: 3500,
    status: 'completed',
    description: 'Top-up received',
    wallet_id: 2,
    wallet_number: 'WAL-2024-002',
    reference: 'TXN-20240303-002',
    balance_after: 32500,
  },
  {
    id: 4,
    date: '2024-03-02',
    type: 'debit',
    amount: 1200,
    status: 'completed',
    description: 'Order ORD-2024-046',
    wallet_id: 2,
    wallet_number: 'WAL-2024-002',
    reference: 'TXN-20240302-001',
    balance_after: 29000,
  },
  {
    id: 5,
    date: '2024-03-02',
    type: 'credit',
    amount: 2000,
    status: 'pending',
    description: 'Top-up requested',
    wallet_id: 3,
    wallet_number: 'WAL-2024-003',
    reference: 'TXN-20240302-002',
    balance_after: 1500,
  },
  {
    id: 6,
    date: '2024-03-01',
    type: 'debit',
    amount: 890,
    status: 'completed',
    description: 'Order ORD-2024-047',
    wallet_id: 3,
    wallet_number: 'WAL-2024-003',
    reference: 'TXN-20240301-001',
    balance_after: 1500,
  },
]

/**
 * Status configuration
 */
const statusConfig: Record<string, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100',
  },
  suspended: {
    label: 'Suspended',
    className: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-100',
  },
}

const transactionStatusConfig: Record<string, { label: string; className: string }> = {
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100',
  },
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100',
  },
  failed: {
    label: 'Failed',
    className: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100',
  },
}

export default function WalletsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedWallet, setSelectedWallet] = useState<number | null>(null)
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<string>('all')
  const [transactionStatusFilter, setTransactionStatusFilter] = useState<string>('all')

  // Filter wallets
  const filteredWallets = mockWallets.filter((wallet) => {
    const matchesSearch =
        wallet.wallet_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wallet.holder_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wallet.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || wallet.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get selected wallet details
  const walletDetails = selectedWallet
      ? mockWallets.find(w => w.id === selectedWallet)
      : null

  // Filter transactions for selected wallet
  const walletTransactions = selectedWallet
      ? mockTransactions.filter((transaction) => {
        const matchesWallet = transaction.wallet_id === selectedWallet
        const matchesType = transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter
        const matchesStatus = transactionStatusFilter === 'all' || transaction.status === transactionStatusFilter
        return matchesWallet && matchesType && matchesStatus
      })
      : []

  // Calculate totals
  const totalBalance = mockWallets.reduce((sum, wallet) => sum + wallet.balance, 0)
  const activeWallets = mockWallets.filter(w => w.status === 'active').length
  const totalCredits = mockWallets.reduce((sum, wallet) => sum + wallet.total_credits, 0)
  const totalDebits = mockWallets.reduce((sum, wallet) => sum + wallet.total_debits, 0)

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
            <h1 className="text-3xl font-bold tracking-tight">Wallets</h1>
            <p className="text-muted-foreground mt-1">Manage your wallets and transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button asChild>
              <Link href="/dashboard/wallets/topup">
                <Plus className="w-4 h-4 mr-2" />
                Request Top-up
              </Link>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {activeWallets} active wallets
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalCredits)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All time
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Total Debits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalDebits)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All time
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Wallets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeWallets}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Out of {mockWallets.length} total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="listing" className="w-full">
          <TabsList>
            <TabsTrigger value="listing">Wallet Listing</TabsTrigger>
            <TabsTrigger value="details" disabled={!selectedWallet}>
              Wallet Details {selectedWallet && `(${walletDetails?.wallet_number})`}
            </TabsTrigger>
          </TabsList>

          {/* Wallet Listing Tab */}
          <TabsContent value="listing" className="space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by wallet number, holder, or department..."
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Wallets Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Wallets</CardTitle>
                <CardDescription>
                  {filteredWallets.length} {filteredWallets.length === 1 ? 'wallet' : 'wallets'} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Wallet Number</TableHead>
                        <TableHead>Holder Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Debits</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Transaction</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWallets.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center h-24 text-muted-foreground">
                              No wallets found. Try adjusting your search or filters.
                            </TableCell>
                          </TableRow>
                      ) : (
                          filteredWallets.map((wallet) => (
                              <TableRow key={wallet.id}>
                                <TableCell className="font-medium">
                                  {wallet.wallet_number}
                                </TableCell>
                                <TableCell>{wallet.holder_name}</TableCell>
                                <TableCell className="text-muted-foreground">
                                  {wallet.department}
                                </TableCell>
                                <TableCell className="font-semibold">
                                  {formatCurrency(wallet.balance)}
                                </TableCell>
                                <TableCell className="text-green-600">
                                  {formatCurrency(wallet.total_credits)}
                                </TableCell>
                                <TableCell className="text-red-600">
                                  {formatCurrency(wallet.total_debits)}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                      variant="outline"
                                      className={statusConfig[wallet.status]?.className}
                                  >
                                    {statusConfig[wallet.status]?.label}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {formatDate(wallet.last_transaction)}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedWallet(wallet.id)
                                        // Switch to details tab
                                        const detailsTab = document.querySelector('[value="details"]') as HTMLElement
                                        detailsTab?.click()
                                      }}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
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
          </TabsContent>

          {/* Wallet Details Tab */}
          <TabsContent value="details" className="space-y-4">
            {walletDetails && (
                <>
                  {/* Wallet Info Card */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl">{walletDetails.wallet_number}</CardTitle>
                          <CardDescription className="mt-2">
                            Detailed information and transaction history
                          </CardDescription>
                        </div>
                        <Badge
                            variant="outline"
                            className={statusConfig[walletDetails.status]?.className}
                        >
                          {statusConfig[walletDetails.status]?.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Balance */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Wallet className="h-4 w-4" />
                            <span>Current Balance</span>
                          </div>
                          <p className="text-3xl font-bold">{formatCurrency(walletDetails.balance)}</p>
                        </div>

                        {/* Holder Info */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CreditCard className="h-4 w-4" />
                            <span>Holder Information</span>
                          </div>
                          <p className="text-lg font-semibold">{walletDetails.holder_name}</p>
                          <p className="text-sm text-muted-foreground">{walletDetails.department}</p>
                        </div>

                        {/* Created Date */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />
                            <span>Created Date</span>
                          </div>
                          <p className="text-lg font-semibold">{formatDate(walletDetails.created_at)}</p>
                          <p className="text-sm text-muted-foreground">
                            {walletDetails.transaction_count} transactions
                          </p>
                        </div>

                        {/* Total Credits */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                            <span>Total Credits</span>
                          </div>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(walletDetails.total_credits)}
                          </p>
                        </div>

                        {/* Total Debits */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                            <span>Total Debits</span>
                          </div>
                          <p className="text-2xl font-bold text-red-600">
                            {formatCurrency(walletDetails.total_debits)}
                          </p>
                        </div>

                        {/* Last Transaction */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Activity className="h-4 w-4" />
                            <span>Last Transaction</span>
                          </div>
                          <p className="text-lg font-semibold">
                            {formatDate(walletDetails.last_transaction)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transaction Filters */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <h3 className="text-lg font-semibold">Transaction History</h3>
                        <div className="flex gap-2">
                          <Select value={transactionTypeFilter} onValueChange={setTransactionTypeFilter}>
                            <SelectTrigger className="w-[150px]">
                              <Filter className="w-4 h-4 mr-2" />
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="credit">Credit</SelectItem>
                              <SelectItem value="debit">Debit</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={transactionStatusFilter} onValueChange={setTransactionStatusFilter}>
                            <SelectTrigger className="w-[150px]">
                              <Filter className="w-4 h-4 mr-2" />
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transactions Table */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Reference</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Balance After</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {walletTransactions.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                    No transactions found for this wallet.
                                  </TableCell>
                                </TableRow>
                            ) : (
                                walletTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                      <TableCell className="text-muted-foreground">
                                        {formatDate(transaction.date)}
                                      </TableCell>
                                      <TableCell className="font-medium">
                                        {transaction.reference}
                                      </TableCell>
                                      <TableCell>
                                        {transaction.type === 'credit' ? (
                                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                              <ArrowUpRight className="w-3 h-3 mr-1" />
                                              Credit
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                                              <ArrowDownRight className="w-3 h-3 mr-1" />
                                              Debit
                                            </Badge>
                                        )}
                                      </TableCell>
                                      <TableCell className={`font-semibold ${
                                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                      }`}>
                                        {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                      </TableCell>
                                      <TableCell className="font-medium">
                                        {formatCurrency(transaction.balance_after)}
                                      </TableCell>
                                      <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={transactionStatusConfig[transaction.status]?.className}
                                        >
                                          {transactionStatusConfig[transaction.status]?.label}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-muted-foreground">
                                        {transaction.description}
                                      </TableCell>
                                    </TableRow>
                                ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </>
            )}
          </TabsContent>
        </Tabs>
      </div>
  )
}