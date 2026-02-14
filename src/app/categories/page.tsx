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
        description: 'Pistons, liners, bearings, gaskets, and complete engine assemblies',
        icon: <Wrench className="w-8 h-8" />,
        count: 156,
        subcategories: ['Pistons & Liners', 'Bearings', 'Gaskets & Seals', 'Cylinder Heads', 'Turbochargers'],
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
    },
    {
        id: 'transmission',
        name: 'Transmission & Axle',
        description: 'Gears, shafts, differentials, and complete transmission units',
        icon: <Settings className="w-8 h-8" />,
        count: 98,
        subcategories: ['Transmission Assemblies', 'Differentials', 'Drive Shafts', 'Clutch Components', 'Gear Sets'],
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
    },
    {
        id: 'hydraulics',
        name: 'Hydraulics',
        description: 'Pumps, cylinders, valves, hoses, and hydraulic systems',
        icon: <Disc className="w-8 h-8" />,
        count: 124,
        subcategories: ['Hydraulic Pumps', 'Cylinders', 'Control Valves', 'Hoses & Fittings', 'Hydraulic Motors'],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    },
    {
        id: 'electrical',
        name: 'Electrical Systems',
        description: 'Alternators, starters, sensors, wiring harnesses, and control modules',
        icon: <Zap className="w-8 h-8" />,
        count: 87,
        subcategories: ['Alternators & Starters', 'Sensors', 'Wiring Harnesses', 'Control Modules', 'Lights & Indicators'],
        image: 'https://images.unsplash.com/photo-1618506469763-345429819782?w=400&h=300&fit=crop',
    },
    {
        id: 'undercarriage',
        name: 'Undercarriage',
        description: 'Track shoes, rollers, idlers, sprockets, and track chains',
        icon: <Truck className="w-8 h-8" />,
        count: 72,
        subcategories: ['Track Shoes', 'Track Rollers', 'Idlers', 'Sprockets', 'Track Chains'],
        image: 'https://images.unsplash.com/photo-1519003300449-424423580305?w=400&h=300&fit=crop',
    },
    {
        id: 'filters',
        name: 'Filters & Fluids',
        description: 'Oil filters, fuel filters, hydraulic filters, and all fluids',
        icon: <Filter className="w-8 h-8" />,
        count: 65,
        subcategories: ['Oil Filters', 'Fuel Filters', 'Air Filters', 'Hydraulic Filters', 'Engine Fluids'],
        image: 'https://images.unsplash.com/photo-1563293722-100d2f4c5a8e?w=400&h=300&fit=crop',
    },
    {
        id: 'body',
        name: 'Body & Chassis',
        description: 'Cabin components, body panels, buckets, and structural parts',
        icon: <Hammer className="w-8 h-8" />,
        count: 54,
        subcategories: ['Cabin Parts', 'Body Panels', 'Buckets & Attachments', 'Counterweights', 'Guards & Covers'],
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&h=300&fit=crop',
    },
    {
        id: 'battery',
        name: 'Batteries & Charging',
        description: 'Heavy-duty batteries, battery chargers, and charging systems',
        icon: <Battery className="w-8 h-8" />,
        count: 34,
        subcategories: ['Heavy Duty Batteries', 'Battery Chargers', 'Charging Systems', 'Battery Accessories'],
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
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
        <div className="min-h-screen bg-background text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-8">
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
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold mb-4 text-white">Product Categories</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Browse our comprehensive catalog of heavy equipment spare parts.
                        We stock genuine parts for all major brands.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search parts by category, name, or part number..."
                            className="pl-12 h-14 bg-gray-800 border-gray-700 text-white text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-gray-800 border-gray-700 hover:border-yellow-500/50 transition-all hover-lift">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover hover-zoom"
                                    />
                                </div>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-500">
                                                {category.icon}
                                            </div>
                                            <div>
                                                <CardTitle className="text-white text-lg">{category.name}</CardTitle>
                                                <Badge variant="secondary" className="bg-gray-700 text-gray-300 mt-1">
                                                    {category.count} parts
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-300 mb-4">
                                        {category.description}
                                    </CardDescription>

                                    {/* Subcategories */}
                                    <div className="space-y-2 mb-4">
                                        {category.subcategories.slice(0, 3).map((sub) => (
                                            <div key={sub} className="flex items-center gap-2 text-sm text-gray-400">
                                                <ChevronRight className="w-4 h-4" />
                                                {sub}
                                            </div>
                                        ))}
                                        {category.subcategories.length > 3 && (
                                            <p className="text-sm text-yellow-500">
                                                +{category.subcategories.length - 3} more subcategories
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        onClick={() => router.push(`/products?category=${category.id}`)}
                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold"
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
                        className="text-center py-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-lg text-gray-300">No categories found matching "{searchQuery}"</p>
                        <Button
                            variant="outline"
                            className="mt-4 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                            onClick={() => setSearchQuery('')}
                        >
                            Clear Search
                        </Button>
                    </motion.div>
                )}

                {/* CTA Section */}
                <motion.div
                    className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 rounded-lg p-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">Can't Find What You're Looking For?</h2>
                    <p className="text-gray-300 mb-6">
                        Our expert team can help you locate any part. Contact us for special orders and hard-to-find parts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => router.push('/contact')}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold"
                        >
                            Contact Us
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/bulk-quote')}
                            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                        >
                            Request Quote
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
