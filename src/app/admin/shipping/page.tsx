"use client";

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Truck, Save, Plus, Edit2, Trash2, Globe } from 'lucide-react';

interface ShippingRate {
    id: string;
    name: string;
    zone: string;
    rate: number;
    estimatedDays: string;
    isActive: boolean;
}

export default function AdminShippingPage() {
    const [loading, setLoading] = useState(false);
    const [rates, setRates] = useState<ShippingRate[]>([
        { id: '1', name: 'Standard Shipping', zone: 'Domestic', rate: 9.99, estimatedDays: '5-7 business days', isActive: true },
        { id: '2', name: 'Express Shipping', zone: 'Domestic', rate: 19.99, estimatedDays: '2-3 business days', isActive: true },
        { id: '3', name: 'Free Shipping', zone: 'Domestic', rate: 0, estimatedDays: '5-7 business days', isActive: false },
    ]);

    const handleSave = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        toast.success('Shipping settings saved');
    };

    const toggleRate = (id: string) => {
        setRates(rates.map(rate =>
            rate.id === id ? { ...rate, isActive: !rate.isActive } : rate
        ));
    };

    const deleteRate = (id: string) => {
        if (!confirm('Are you sure you want to delete this shipping rate?')) return;
        setRates(rates.filter(rate => rate.id !== id));
        toast.success('Shipping rate deleted');
    };

    return (
        <AdminLayout title="Shipping" description="Manage shipping rates and zones">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Shipping Rates */}
                <div className="lg:col-span-2">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <Truck className="h-5 w-5 mr-2" />
                                Shipping Rates
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Configure shipping rates for different zones
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {rates.map((rate) => (
                                    <div
                                        key={rate.id}
                                        className={`p-4 rounded-lg border ${rate.isActive ? 'bg-background/50 border-gray-700' : 'bg-background/20 border-border opacity-60'}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                                    <Truck className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{rate.name}</p>
                                                    <p className="text-sm text-gray-400">
                                                        {rate.zone} • {rate.estimatedDays}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-white font-bold">
                                                    ${rate.rate.toFixed(2)}
                                                </span>
                                                <Badge className={rate.isActive ? 'bg-green-900/30 text-green-400' : 'bg-background/30 text-gray-400'}>
                                                    {rate.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-gray-400 hover:text-white"
                                                        onClick={() => toggleRate(rate.id)}
                                                    >
                                                        {rate.isActive ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-400 hover:text-red-300"
                                                        onClick={() => deleteRate(rate.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Shipping Rate
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Shipping Settings */}
                <div>
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <Globe className="h-5 w-5 mr-2" />
                                Shipping Zones
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Configure shipping zones
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-gray-300">Free Shipping Threshold</Label>
                                <Input
                                    type="number"
                                    defaultValue="100"
                                    className="bg-gray-700 border-gray-600 text-white"
                                />
                                <p className="text-xs text-gray-500">Orders above this amount qualify for free shipping</p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-300">Default Zone</Label>
                                <select className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2">
                                    <option>Domestic</option>
                                    <option>International</option>
                                    <option>Both</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-300">Maximum Package Weight (kg)</Label>
                                <Input
                                    type="number"
                                    defaultValue="50"
                                    className="bg-gray-700 border-gray-600 text-white"
                                />
                            </div>
                            <Button onClick={handleSave} disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? 'Saving...' : 'Save Settings'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
