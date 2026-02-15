'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Package, ChevronRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const shippingOptions = [
    {
        icon: <Truck className="w-8 h-8" />,
        title: 'Standard Delivery',
        price: 'KWD 5',
        timeframe: '3-5 Business Days',
        description: 'Reliable delivery to your doorstep',
    },
    {
        icon: <Clock className="w-8 h-8" />,
        title: 'Express Delivery',
        price: 'KWD 12',
        timeframe: '1-2 Business Days',
        description: 'Fast delivery for urgent orders',
    },
    {
        icon: <Package className="w-8 h-8" />,
        title: 'Same Day Delivery',
        price: 'KWD 25',
        timeframe: 'Same Day',
        description: 'Order before 11 AM for same-day delivery',
    },
];

const deliveryAreas = [
    { area: 'Kuwait City', time: '1-2 days', type: 'Free over KWD 30' },
    { area: 'Farwaniya', time: '1-2 days', type: 'Free over KWD 30' },
    { area: 'Hawally', time: '1-2 days', type: 'Free over KWD 30' },
    { area: 'Salmiya', time: '1-2 days', type: 'Free over KWD 30' },
    { area: ' Ahmadi', time: '2-3 days', type: 'Free over KWD 50' },
    { area: ' Jahra', time: '2-3 days', type: 'Free over KWD 50' },
];

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-navy text-white pt-32 pb-20">
            <div className="container mx-auto px-4">
                <Breadcrumb className="mb-10">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>Shipping Information</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
                    <p className="text-muted-foreground mb-8">Fast, reliable delivery across Kuwait and the GCC region</p>

                    {/* Shipping Options */}
                    <h2 className="text-2xl font-semibold mb-4">Delivery Options</h2>
                    <div className="grid md:grid-cols-3 gap-4 mb-12">
                        {shippingOptions.map((option, index) => (
                            <motion.div
                                key={option.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="glass-light dark:glass-dark h-full hover:border-primary/50 transition-all">
                                    <CardHeader className="text-center">
                                        <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <div className="text-primary">{option.icon}</div>
                                        </div>
                                        <CardTitle className="text-lg">{option.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <p className="text-3xl font-bold text-primary mb-2">{option.price}</p>
                                        <p className="font-medium mb-2">{option.timeframe}</p>
                                        <p className="text-sm text-muted-foreground">{option.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Free Shipping Threshold */}
                    <Card className="glass-strong mb-12">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <Truck className="w-6 h-6 text-green-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">Free Shipping on Orders Over KWD 50</h3>
                                    <p className="text-muted-foreground">Automatically applied at checkout for qualifying orders</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivery Areas */}
                    <h2 className="text-2xl font-semibold mb-4">Delivery Areas</h2>
                    <Card className="glass-light dark:glass-dark mb-12">
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                {deliveryAreas.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-primary" />
                                            <span className="font-medium">{item.area}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{item.time}</p>
                                            <p className="text-xs text-muted-foreground">{item.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* International Shipping */}
                    <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
                    <Card className="glass-light dark:glass-dark">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Globe className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">GCC & International Delivery</h3>
                                    <p className="text-muted-foreground mb-4">
                                        We ship to Saudi Arabia, UAE, Bahrain, Qatar, and Oman. International shipping rates
                                        are calculated based on weight and destination. Contact us for custom shipping quotes
                                        to other countries.
                                    </p>
                                    <div className="flex gap-3">
                                        <Button variant="outline">
                                            View GCC Rates
                                        </Button>
                                        <Button variant="outline">
                                            Contact for International Shipping
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
