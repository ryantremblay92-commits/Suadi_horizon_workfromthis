'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Clock, FileText, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const warrantyPlans = [
    {
        name: 'Standard Warranty',
        duration: '6 Months',
        coverage: 'Engine components, turbochargers, electrical systems',
        price: 'Included',
        features: ['Parts replacement', 'Labor coverage', 'Nationwide service'],
    },
    {
        name: 'Extended Warranty',
        duration: '12 Months',
        coverage: 'All mechanical and electrical components',
        price: '+10% of parts cost',
        features: ['Comprehensive coverage', 'Priority service', 'Free inspections', '24/7 support'],
    },
    {
        name: 'Premium Warranty',
        duration: '24 Months',
        coverage: 'Full system coverage including wear parts',
        price: '+20% of parts cost',
        features: ['Everything in Extended', 'Preventive maintenance', 'Parts exchange program', 'Dedicated account manager'],
    },
];

const warrantyCategories = [
    {
        category: 'Engine Parts',
        duration: '12 months',
        coverage: 'Pistons, liners, bearings, cylinder heads, engine blocks',
        exclusions: 'Wear items like rings, gaskets due to normal use',
    },
    {
        category: 'Turbochargers',
        duration: '12 months',
        coverage: 'Complete turbo assembly, bearings, housings',
        exclusions: 'Damage from oil contamination or foreign objects',
    },
    {
        category: 'Electrical Systems',
        duration: '6 months',
        coverage: 'Alternators, starters, sensors, control modules',
        exclusions: 'Water damage, wiring modifications',
    },
    {
        category: 'Hydraulics',
        duration: '6 months',
        coverage: 'Pumps, motors, cylinders, control valves',
        exclusions: 'Seal wear, contamination damage',
    },
    {
        category: 'Transmission',
        duration: '12 months',
        coverage: 'Gears, shafts, differentials, clutch assemblies',
        exclusions: ' clutch wear, damage from improper use',
    },
    {
        category: 'Undercarriage',
        duration: '6 months',
        coverage: 'Track shoes, rollers, idlers, sprockets',
        exclusions: 'Normal wear, track tension issues',
    },
];

export default function WarrantyPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Warranty Information</BreadcrumbPage>
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
                        <Shield className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-white">Warranty Information</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Comprehensive warranty coverage for all heavy equipment parts.
                        We stand behind the quality of our products.
                    </p>
                </motion.div>

                {/* Warranty Coverage by Category */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-white">Coverage by Product Category</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {warrantyCategories.map((item, index) => (
                            <Card key={item.category} className="bg-gray-800 border-gray-700">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-white text-lg">{item.category}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-yellow-500" />
                                        <span className="text-yellow-500 font-semibold">{item.duration}</span>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">{item.coverage}</p>
                                    <p className="text-xs text-gray-500">Excludes: {item.exclusions}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Warranty Plans */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-white">Extended Warranty Plans</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {warrantyPlans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className={`bg-gray-800 border-gray-700 ${index === 1 ? 'border-yellow-500' : ''}`}>
                                    <CardHeader>
                                        <CardTitle className="text-white">{plan.name}</CardTitle>
                                        <p className="text-2xl font-bold text-yellow-500">{plan.duration}</p>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-gray-300">{plan.coverage}</p>
                                        <p className="text-xl font-bold text-white">{plan.price}</p>
                                        <ul className="space-y-2">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold"
                                            onClick={() => router.push('/contact')}
                                        >
                                            Learn More
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Claim Process */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-white">Warranty Claim Process</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                        <AccordionItem value="step1" className="bg-gray-800 border-gray-700 rounded-lg px-4">
                            <AccordionTrigger className="text-white">
                                <span className="flex items-center gap-3">
                                    <span className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold">1</span>
                                    Submit Claim
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                Contact us via phone or email with your purchase details, part number, and description of the issue. Provide photos if available.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="step2" className="bg-gray-800 border-gray-700 rounded-lg px-4">
                            <AccordionTrigger className="text-white">
                                <span className="flex items-center gap-3">
                                    <span className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold">2</span>
                                    Evaluation
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                Our technical team will evaluate the claim within 3-5 business days. We may request the part to be returned for inspection.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="step3" className="bg-gray-800 border-gray-700 rounded-lg px-4">
                            <AccordionTrigger className="text-white">
                                <span className="flex items-center gap-3">
                                    <span className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold">3</span>
                                    Approval & Replacement
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                Once approved, we will ship the replacement part immediately. Standard shipping is included; expedited shipping costs may apply.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="step4" className="bg-gray-800 border-gray-700 rounded-lg px-4">
                            <AccordionTrigger className="text-white">
                                <span className="flex items-center gap-3">
                                    <span className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold">4</span>
                                    Return Defective Part
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                Return the defective part within 30 days using our prepaid shipping label. Failure to return may result in charges.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    className="bg-gradient-to-r from-gray-800 to-gray-900 border border-yellow-500/30 rounded-lg p-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">Need to File a Warranty Claim?</h2>
                    <p className="text-gray-300 mb-6">Our warranty team is ready to assist you.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => router.push('/contact')}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold"
                        >
                            <Phone className="w-4 h-4 mr-2" />
                            Contact Warranty Team
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
