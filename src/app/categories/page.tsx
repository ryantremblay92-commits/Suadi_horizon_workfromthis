'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Search,
    ChevronRight,
    Truck,
    Wrench,
    Zap,
    Battery,
    Settings,
    Hammer,
    Filter,
    Disc
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const categories = [
    {
        id: 'engine',
        name: 'Engine Parts',
        description: 'Premium pistons, liners, bearings, gaskets, and complete engine assemblies',
        icon: <Wrench className="w-8 h-8" />,
        count: 156,
        subcategories: ['Pistons & Liners', 'Bearings', 'Gaskets & Seals', 'Cylinder Heads', 'Turbochargers'],
        image: '/images/home/engine.png',
    },
    {
        id: 'transmission',
        name: 'Transmission & Axle',
        description: 'Heavy-duty gears, shafts, differentials, and complete transmission units',
        icon: <Settings className="w-8 h-8" />,
        count: 98,
        subcategories: ['Transmission Assemblies', 'Differentials', 'Drive Shafts', 'Clutch Components', 'Gear Sets'],
        image: '/images/home/transmission.png',
    },
    {
        id: 'hydraulics',
        name: 'Hydraulics',
        description: 'Industrial pumps, cylinders, valves, hoses, and hydraulic systems',
        icon: <Disc className="w-8 h-8" />,
        count: 124,
        subcategories: ['Hydraulic Pumps', 'Cylinders', 'Control Valves', 'Hoses & Fittings', 'Hydraulic Motors'],
        image: '/images/home/hydraulics.png',
    },
    {
        id: 'electrical',
        name: 'Electrical Systems',
        description: 'Advanced alternators, starters, sensors, and control modules',
        icon: <Zap className="w-8 h-8" />,
        count: 87,
        subcategories: ['Alternators & Starters', 'Sensors', 'Wiring Harnesses', 'Control Modules', 'Lights & Indicators'],
        image: '/images/home/electrical.png',
    },
    {
        id: 'undercarriage',
        name: 'Undercarriage',
        description: 'High-performance track shoes, rollers, idlers, and sprockets',
        icon: <Truck className="w-8 h-8" />,
        count: 72,
        subcategories: ['Track Shoes', 'Track Rollers', 'Idlers', 'Sprockets', 'Track Chains'],
        image: '/images/home/undercarriage.png',
    },
    {
        id: 'attachments',
        name: 'Attachments & Body',
        description: 'Specialized buckets, blades, hammers, and structural components',
        icon: <Hammer className="w-8 h-8" />,
        count: 143,
        subcategories: ['Buckets', 'Blades', 'Hammers', 'Quick Couplers', 'Cabin Parts'],
        image: '/images/home/attachments.png',
    },
];

export default function CategoriesPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-navy text-white py-12 lg:py-16">
            <div className="container-premium">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-10">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Categories</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Hero Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="heading-lg mb-6">Product Categories</h1>
                    <p className="text-body-lg text-white/60 max-w-3xl mx-auto mb-10">
                        Browse our comprehensive catalog of heavy equipment spare parts.
                        We stock genuine parts for all major brands.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                            placeholder="Search parts by category, name, or part number..."
                            className="pl-14 h-14 bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-gold/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-white/5 border-white/10 hover:border-gold/30 transition-all duration-300 h-full">
                                <div className="h-52 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center text-gold">
                                                {category.icon}
                                            </div>
                                            <div>
                                                <CardTitle className="text-white text-xl">{category.name}</CardTitle>
                                                <Badge variant="secondary" className="bg-white/10 text-white/60 mt-1">
                                                    {category.count} parts
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-white/60 mb-5 text-base">
                                        {category.description}
                                    </CardDescription>

                                    {/* Subcategories */}
                                    <div className="space-y-2.5 mb-5">
                                        {category.subcategories.slice(0, 3).map((sub) => (
                                            <div key={sub} className="flex items-center gap-2 text-sm text-white/50">
                                                <ChevronRight className="w-4 h-4" />
                                                {sub}
                                            </div>
                                        ))}
                                        {category.subcategories.length > 3 && (
                                            <p className="text-sm text-gold">
                                                +{category.subcategories.length - 3} more subcategories
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        onClick={() => router.push(`/products?category=${category.id}`)}
                                        className="w-full bg-gold hover:bg-gold/90 text-navy font-bold"
                                    >
                                        Browse {category.name}
                                        <ChevronRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* No Results */}
                {filteredCategories.length === 0 && (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-xl text-white/60 mb-6">No categories found matching "{searchQuery}"</p>
                        <Button
                            variant="outline"
                            className="border-gold text-gold hover:bg-gold/10"
                            onClick={() => setSearchQuery('')}
                        >
                            Clear Search
                        </Button>
                    </motion.div>
                )}

                {/* CTA Section */}
                <motion.div
                    className="mt-20 glass-premium rounded-3xl p-12 lg:p-16 border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="heading-md mb-4 text-center">Can't Find What You're Looking For?</h2>
                    <p className="text-body-lg text-white/60 mb-8 text-center max-w-2xl mx-auto">
                        Our expert team can help you locate any part. Contact us for special orders and hard-to-find parts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => router.push('/contact')}
                            className="btn-primary"
                        >
                            Contact Us
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/bulk-quote')}
                            className="btn-secondary"
                        >
                            Request Quote
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
