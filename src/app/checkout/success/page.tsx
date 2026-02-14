'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, MapPin, Clock, Download, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CheckoutSuccessPage() {
    const router = useRouter();

    // Generate a random order number
    const orderNumber = `SH-${Date.now().toString().slice(-8)}`;

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="max-w-2xl mx-auto px-4">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center mb-8"
                >
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-16 h-16 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                    <p className="text-muted-foreground">
                        Thank you for your purchase. Your order has been received.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="glass-light dark:glass-dark mb-6">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-muted-foreground">Order Number</span>
                                <span className="font-mono font-bold text-primary">{orderNumber}</span>
                            </div>
                            <Separator className="mb-4" />
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <span className="text-sm">Confirmation email sent to your email address</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Package className="w-5 h-5 text-primary" />
                                    <span className="text-sm">Order will be shipped within 1-2 business days</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <span className="text-sm">Tracking information will be sent via email</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-strong mb-6">
                        <CardContent className="p-6">
                            <h2 className="font-semibold mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" />
                                What Happens Next?
                            </h2>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-bold text-primary">1</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Order Processing</p>
                                        <p className="text-sm text-muted-foreground">We verify your order and prepare it for shipment (1-2 days)</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-bold text-primary">2</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Shipment</p>
                                        <p className="text-sm text-muted-foreground">Your order is shipped and tracking number is emailed</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-bold text-primary">3</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Delivery</p>
                                        <p className="text-sm text-muted-foreground">Receive your order at your doorstep (5-7 business days)</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push('/account/orders')}
                        >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            View Orders
                        </Button>
                        <Button
                            className="w-full btn-industrial-glow"
                            onClick={() => router.push('/products')}
                        >
                            Continue Shopping
                            <ShoppingBag className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground mb-2">Need help with your order?</p>
                        <Button variant="link" onClick={() => router.push('/contact')}>
                            Contact our support team
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
