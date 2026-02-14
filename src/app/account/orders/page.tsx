'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, ChevronRight, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useAuth } from '@/contexts/AuthContext';

// Mock orders data
const orders = [
    {
        id: 'SH-12345678',
        date: '2024-01-15',
        status: 'delivered',
        total: 1250,
        items: [
            { name: 'Caterpillar Engine Oil Filter', quantity: 2, price: 25 },
            { name: 'Hydraulic Pump Assembly', quantity: 1, price: 450 },
            { name: 'Turbocharger Kit', quantity: 1, price: 750 },
        ],
        tracking: 'TRK123456789',
        estimatedDelivery: '2024-01-20',
        deliveredDate: '2024-01-18',
    },
    {
        id: 'SH-23456789',
        date: '2024-01-20',
        status: 'shipped',
        total: 780,
        items: [
            { name: 'Air Filter Set', quantity: 3, price: 45 },
            { name: 'Fuel Injection Pump', quantity: 1, price: 645 },
        ],
        tracking: 'TRK987654321',
        estimatedDelivery: '2024-01-25',
    },
];

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500',
    processing: 'bg-blue-500',
    shipped: 'bg-purple-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500',
};

export default function OrdersPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?redirect=/account/orders');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-4xl mx-auto px-4">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/account')}>Account</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>Orders</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="glass-light dark:glass-dark">
                                <CardContent className="p-6">
                                    {/* Order Header */}
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3
                                                    className="font-semibold text-lg cursor-pointer hover:text-primary transition-colors"
                                                    onClick={() => router.push(`/account/orders/${order.id}`)}
                                                >
                                                    {order.id}
                                                </h3>
                                                <Badge className={`${statusColors[order.status]} text-white`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-xl">KWD {order.total.toFixed(2)}</p>
                                            <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-3 mb-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <span>{item.name} × {item.quantity}</span>
                                                <span className="text-muted-foreground">KWD {(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tracking Info */}
                                    {order.tracking && (
                                        <div className="bg-muted/50 rounded-lg p-3 mb-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Package className="w-4 h-4 text-primary" />
                                                <span className="font-medium">Tracking: {order.tracking}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm mt-2">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">
                                                    {order.status === 'delivered'
                                                        ? `Delivered on ${order.deliveredDate}`
                                                        : `Estimated delivery: ${order.estimatedDelivery}`
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <Button variant="outline" size="sm" onClick={() => router.push(`/account/orders/${order.id}`)}>
                                            Track Order
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => router.push(`/account/orders/${order.id}`)}>
                                            View Details
                                        </Button>
                                        {order.status === 'delivered' && (
                                            <Button variant="outline" size="sm">
                                                Buy Again
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    {orders.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                            <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                            <Button onClick={() => router.push('/products')}>Browse Products</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
