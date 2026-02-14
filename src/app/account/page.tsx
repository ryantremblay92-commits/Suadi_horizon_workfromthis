'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Package, MapPin, CreditCard, Settings, Bell, ChevronRight, ShoppingBag, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for demonstration
const mockOrders = [
    { id: 'SH-12345678', date: '2024-01-15', status: 'delivered', total: 1250, items: 3 },
    { id: 'SH-23456789', date: '2024-01-10', status: 'shipped', total: 780, items: 2 },
];

const accountLinks = [
    { icon: <ShoppingBag className="w-5 h-5" />, title: 'Orders', description: 'View and track your orders', href: '/account/orders' },
    { icon: <MapPin className="w-5 h-5" />, title: 'Addresses', description: 'Manage shipping addresses', href: '/account/addresses' },
    { icon: <CreditCard className="w-5 h-5" />, title: 'Payment Methods', description: 'Manage payment options', href: '/account/payment' },
    { icon: <Bell className="w-5 h-5" />, title: 'Notifications', description: 'Manage preferences', href: '/account/notifications' },
    { icon: <Settings className="w-5 h-5" />, title: 'Account Settings', description: 'Profile and security', href: '/account/settings' },
];

export default function AccountPage() {
    const router = useRouter();
    const { isAuthenticated, user, isInitialized } = useAuth();

    React.useEffect(() => {
        if (isInitialized && !isAuthenticated) {
            router.push('/login?redirect=/account');
        }
    }, [isAuthenticated, isInitialized, router]);

    if (!isInitialized || !isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-6xl mx-auto px-4">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>My Account</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="glass-light dark:glass-dark">
                            <CardHeader className="pb-4">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="text-center">{user?.name || 'Customer'}</CardTitle>
                                <p className="text-sm text-muted-foreground text-center">{user?.email || 'customer@example.com'}</p>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/account')}>
                                    <User className="w-4 h-4 mr-2" />
                                    Overview
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/account/orders')}>
                                    <Package className="w-4 h-4 mr-2" />
                                    Orders
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/account/addresses')}>
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Addresses
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/account/payment')}>
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Payment Methods
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-3xl font-bold mb-6">Welcome back!</h1>

                            {/* Quick Stats */}
                            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                                <Card className="glass-light dark:glass-dark">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                                                <Package className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold">{mockOrders.length}</p>
                                                <p className="text-sm text-muted-foreground">Total Orders</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="glass-light dark:glass-dark">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                                <Package className="w-6 h-6 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold">1</p>
                                                <p className="text-sm text-muted-foreground">In Transit</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="glass-light dark:glass-dark">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold">1</p>
                                                <p className="text-sm text-muted-foreground">In Progress</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Orders */}
                            <Card className="glass-strong mb-6">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Recent Orders</CardTitle>
                                    <Button variant="ghost" size="sm" onClick={() => router.push('/account/orders')}>
                                        View All
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {mockOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                                                onClick={() => router.push(`/account/orders/${order.id}`)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                                        <Package className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{order.id}</p>
                                                        <p className="text-sm text-muted-foreground">{order.date} • {order.items} items</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                                                        {order.status}
                                                    </Badge>
                                                    <span className="font-semibold">KWD {order.total.toFixed(2)}</span>
                                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Account Links */}
                            <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {accountLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card
                                            className="glass-light dark:glass-dark hover:border-primary/50 transition-all cursor-pointer"
                                            onClick={() => router.push(link.href)}
                                        >
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                                    {link.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold">{link.title}</p>
                                                    <p className="text-sm text-muted-foreground">{link.description}</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
