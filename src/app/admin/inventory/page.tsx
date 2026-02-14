"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Search,
    Package,
    AlertTriangle,
    ArrowUpDown,
    Download
} from 'lucide-react';
import { toast } from 'sonner';

interface InventoryItem {
    _id: string;
    name: string;
    sku: string;
    stock: number;
    minStock: number;
    price: number;
    category?: string;
}

export default function AdminInventoryPage() {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');
            const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};

            const response = await fetch('/api/products?limit=1000', { headers });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || errorData.message || 'Failed to load inventory');
            }
            const data = await response.json();
            const products = data.products || [];
            setInventory(products.map((p: any) => ({
                _id: p._id,
                name: p.name,
                sku: p.sku,
                stock: p.stock || 0,
                minStock: 10,
                price: p.price,
                category: p.category
            })));
        } catch (err: any) {
            console.error('Failed to load inventory:', err);
            toast.error('Failed to load inventory');
        } finally {
            setLoading(false);
        }
    };

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lowStockItems = inventory.filter(item => item.stock < item.minStock);
    const outOfStockItems = inventory.filter(item => item.stock === 0);

    return (
        <AdminLayout
            title="Inventory"
            description="Manage product stock and inventory"
            onRefresh={loadInventory}
            onExport={() => {
                const csv = [
                    ['Name', 'SKU', 'Stock', 'Min Stock', 'Status'].join(','),
                    ...filteredInventory.map(i => [i.name, i.sku, i.stock, i.minStock, i.stock === 0 ? 'Out of Stock' : i.stock < i.minStock ? 'Low Stock' : 'In Stock'].join(','))
                ].join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'inventory.csv';
                a.click();
                toast.success('Inventory exported successfully');
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="glass border-white/10 text-white hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold font-display text-slate-300">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-gold" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold bg-gradient-to-br from-white to-slate-400 text-transparent bg-clip-text font-display">{inventory.length}</div>
                    </CardContent>
                </Card>
                <Card className="glass border-white/10 text-white hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold font-display text-slate-300">Low Stock</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-yellow-400 font-display drop-shadow-[0_0_15px_rgba(250,204,21,0.25)]">{lowStockItems.length}</div>
                    </CardContent>
                </Card>
                <Card className="glass border-white/10 text-white hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold font-display text-slate-300">Out of Stock</CardTitle>
                        <Package className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-400 font-display drop-shadow-[0_0_15px_rgba(248,113,113,0.25)]">{outOfStockItems.length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search inventory..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                </div>
            </div>

            {/* Inventory Table */}
            <div className="glass rounded-xl border border-white/10 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-slate-400">Loading inventory...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        Product
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        SKU
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        Stock
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        Min Stock
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        Price
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredInventory.length > 0 ? (
                                    filteredInventory.map((item) => (
                                        <tr key={item._id} className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-white font-medium group-hover:text-gold transition-colors font-display">{item.name}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-slate-400">{item.sku}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`font-medium font-mono ${item.stock === 0 ? 'text-red-400' : item.stock < item.minStock ? 'text-yellow-400' : 'text-white'}`}>
                                                    {item.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-slate-400 font-mono">{item.minStock}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-white font-display">${item.price?.toLocaleString()}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge className={
                                                    item.stock === 0 ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                        item.stock < item.minStock ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                                            'bg-green-500/10 text-green-500 border border-green-500/20'
                                                }>
                                                    {item.stock === 0 ? 'Out of Stock' : item.stock < item.minStock ? 'Low Stock' : 'In Stock'}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                            No inventory items found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
