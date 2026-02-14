'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, Shield, Truck, RefreshCw, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function TermsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background text-white py-8">
            <div className="max-w-4xl mx-auto px-4">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Terms of Service</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-white">Terms of Service</h1>
                    <p className="text-xl text-gray-300">Please read these terms carefully before using our services.</p>
                </motion.div>

                <div className="bg-gray-800 rounded-lg p-4 mb-8 text-center">
                    <p className="text-gray-300"><span className="text-yellow-500 font-semibold">Last Updated:</span> January 2025</p>
                </div>

                <div className="space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader><CardTitle className="text-white">1. Acceptance of Terms</CardTitle></CardHeader>
                            <CardContent className="space-y-4 text-gray-300">
                                <p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree, please do not use this website.</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader><CardTitle className="text-white">2. Products and Pricing</CardTitle></CardHeader>
                            <CardContent className="space-y-4 text-gray-300">
                                <p><strong>Product Availability:</strong> All products are subject to availability.</p>
                                <p><strong>Pricing:</strong> Prices are displayed in SAR and include 15% VAT.</p>
                                <p><strong>B2B Transactions:</strong> Additional terms apply for wholesale orders.</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-white">
                                    <CreditCard className="w-6 h-6 text-yellow-500" />3. Orders and Payment
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-gray-300">
                                <p><strong>Order Acceptance:</strong> We reserve the right to accept or decline any order.</p>
                                <p><strong>Payment Methods:</strong> Bank transfers, credit cards, and cash on delivery.</p>
                                <p><strong>Tax Invoices:</strong> Provided in compliance with ZATCA requirements.</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-white">
                                    <Truck className="w-6 h-6 text-yellow-500" />4. Shipping and Delivery
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-gray-300">
                                <p><strong>Delivery Areas:</strong> Throughout Saudi Arabia and GCC countries.</p>
                                <p><strong>Delivery Times:</strong> Standard 3-7 business days, express available.</p>
                                <p><strong>Installation:</strong> Available in major cities (Riyadh, Jeddah, Dammam).</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-white">
                                    <RefreshCw className="w-6 h-6 text-yellow-500" />5. Returns and Refunds
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-gray-300">
                                <p><strong>Return Window:</strong> 14 days from delivery.</p>
                                <p><strong>Condition:</strong> Items must be unused in original packaging.</p>
                                <p><strong>Non-Returnable:</strong> Special orders, electrical components, installed items.</p>
                                <p><strong>Restocking Fee:</strong> 15% on non-defective returns.</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-white">
                                    <Shield className="w-6 h-6 text-yellow-500" />6. Warranty
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-gray-300">
                                <p><strong>Coverage:</strong> Varies by product category (6 months to 2 years).</p>
                                <p><strong>Exclusions:</strong> Damage from misuse or improper installation.</p>
                                <p>See our <a href="/warranty" className="text-yellow-500 hover:underline">Warranty Page</a> for details.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 rounded-lg p-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h2 className="text-2xl font-bold mb-4 text-white">Questions About These Terms?</h2>
                    <p className="text-gray-300 mb-6">Contact us for any questions about our Terms of Service.</p>
                    <Button onClick={() => router.push('/contact')} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold">Contact Us</Button>
                </motion.div>
            </div>
        </div>
    );
}
