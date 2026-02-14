"use client";

import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';

export default function AdminAnalyticsPage() {
    return (
        <AdminLayout title="Analytics" description="View platform analytics and insights">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">$0.00</div>
                        <p className="text-xs text-green-400">+0% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">0</div>
                        <p className="text-xs text-green-400">+0% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Customers</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">0</div>
                        <p className="text-xs text-green-400">+0% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Conversion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">0%</div>
                        <p className="text-xs text-gray-400">No data available</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2" />
                            Sales Overview
                        </CardTitle>
                        <CardDescription className="text-gray-400">Monthly sales performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center text-gray-500">
                            No sales data available yet
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Top Products</CardTitle>
                        <CardDescription className="text-gray-400">Best selling products</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center text-gray-500">
                            No product data available yet
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
