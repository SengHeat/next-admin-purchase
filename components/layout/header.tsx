'use client'

import {Bell, Search, LogOut, User, Menu, Award, Star, Settings, Target} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {Badge} from "@/components/ui/badge";

interface HeaderProps {
    user: {
        name: string,
        email: string,
        // role: viewMode === 'manager' ? 'Manager' : viewMode === 'senior' ? 'Senior Purchaser' : 'Purchaser',
        team: string,
        avatar: string,
        joinedDate: string,
        totalOrders: number,
        successRate: number,
        avgSavings: number,
        rank: number,
        badge: string,
        notifications: number
    }
}

export function Header({ user }: HeaderProps) {
    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

    return (
        <header className="h-16 border-b border-border bg-card">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Left side - Search */}
                <div className="flex items-center gap-4 flex-1 max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-9 w-full"
                        />
                    </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                  <Button variant="outline" size="icon" className="relative">
                                <Bell className="h-4 w-4" />
                                {user.notifications > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                        {user.notifications}
                      </span>
                        )}
                  </Button>

                    {/* User menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{initials}</AvatarFallback>
                                </Avatar>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-72">
                            <DropdownMenuLabel>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Badge variant="outline" className="text-xs">{user.team}</Badge>
                                            <Badge className="bg-amber-100 text-amber-800 text-xs gap-1">
                                                <Award className="h-3 w-3" />
                                                {user.badge}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            {/* Performance Stats */}
                            <div className="px-2 py-3 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Total Orders</span>
                                    <span className="font-semibold">{user.totalOrders}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Success Rate</span>
                                    <span className="font-semibold text-green-600">{user.successRate}%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Avg Savings</span>
                                    <span className="font-semibold text-blue-600">${user.avgSavings}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Team Rank</span>
                                    <span className="font-semibold flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    #{user.rank}
                  </span>
                                </div>
                            </div>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Target className="mr-2 h-4 w-4" />
                                My Goals
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}