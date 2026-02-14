'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Phone, Mail, MessageCircle, FileText, ShoppingCart, CreditCard, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const faqCategories = [
    {
        icon: <ShoppingCart className="w-5 h-5" />,
        title: 'Orders & Shopping',
        questions: [
            { q: 'How do I track my order?', a: 'You can track your order by logging into your account and visiting the Orders section, or by using the tracking number sent to your email.' },
            { q: 'Can I modify or cancel my order?', a: 'Yes, you can modify or cancel your order within 24 hours of placement. Contact our support team for assistance.' },
            { q: 'What payment methods do you accept?', a: 'We accept credit cards (Visa, MasterCard, American Express), bank transfers, and cash on delivery.' },
        ],
    },
    {
        icon: <Truck className="w-5 h-5" />,
        title: 'Shipping & Delivery',
        questions: [
            { q: 'What are the shipping rates?', a: 'Shipping rates vary based on location and order size. Free shipping is available for orders over KWD 50 within Kuwait.' },
            { q: 'How long does delivery take?', a: 'Standard delivery takes 3-5 business days. Express delivery is available for next-day delivery at an additional cost.' },
            { q: 'Do you ship internationally?', a: 'Yes, we ship to GCC countries and select international destinations. Contact us for shipping rates to your location.' },
        ],
    },
    {
        icon: <CreditCard className="w-5 h-5" />,
        title: 'Payments & Pricing',
        questions: [
            { q: 'Is my payment information secure?', a: 'Yes, all payments are processed through secure SSL-encrypted channels. We never store your full card details.' },
            { q: 'Do you offer installment plans?', a: 'Yes, we offer 0% installment plans through select banks. Contact our sales team for more details.' },
            { q: 'Are prices inclusive of VAT?', a: 'Yes, all prices displayed on our website include VAT at the applicable rate.' },
        ],
    },
    {
        icon: <Package className="w-5 h-5" />,
        title: 'Returns & Warranty',
        questions: [
            { q: 'What is your return policy?', a: 'We offer a 14-day return policy for unused items in original packaging. Certain items like fluids and filters are non-returnable.' },
            { q: 'How do I initiate a return?', a: 'Log into your account, go to Orders, select the items you want to return, and follow the prompts. Our team will contact you for pickup.' },
            { q: 'What warranties do you offer?', a: 'All products come with manufacturer warranties. Extended warranty options are available for purchase at checkout.' },
        ],
    },
];

const contactOptions = [
    { icon: <Phone className="w-6 h-6" />, title: 'Phone', value: '+965 2222 3333', desc: 'Mon-Sat: 8AM-8PM' },
    { icon: <Mail className="w-6 h-6" />, title: 'Email', value: 'support@saudihorizon.com', desc: 'Response within 24 hours' },
    { icon: <MessageCircle className="w-6 h-6" />, title: 'Live Chat', value: 'Available Now', desc: 'Instant support' },
];

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-4xl mx-auto px-4">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>Help Center</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Hero Search */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
                    <p className="text-muted-foreground mb-6">Search our knowledge base or browse categories below</p>
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder="Search for help..."
                            className="pl-12 h-12 text-lg glass-light"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    {contactOptions.map((option, index) => (
                        <motion.div
                            key={option.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="glass-light dark:glass-dark hover:border-primary/50 transition-all cursor-pointer">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <div className="text-primary">{option.icon}</div>
                                    </div>
                                    <h3 className="font-semibold mb-1">{option.title}</h3>
                                    <p className="text-primary font-medium">{option.value}</p>
                                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Categories */}
                <div className="space-y-8">
                    {faqCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIndex * 0.15 }}
                        >
                            <Card className="glass-light dark:glass-dark">
                                <CardHeader className="flex flex-row items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                        <div className="text-primary">{category.icon}</div>
                                    </div>
                                    <CardTitle>{category.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        {category.questions.map((item, qIndex) => (
                                            <AccordionItem key={qIndex} value={`${catIndex}-${qIndex}`}>
                                                <AccordionTrigger className="text-left">
                                                    <span className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                                        {item.q}
                                                    </span>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground">
                                                    {item.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
