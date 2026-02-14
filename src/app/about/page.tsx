'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Award, Users, ShieldCheck, Truck, ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const router = useRouter();
    const heroRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    const stats = [
        { icon: Award, label: '15+ Years', description: 'Industry Leadership', color: 'text-primary' },
        { icon: Users, label: '1000+', description: 'Satisfied Clients', color: 'text-blue-400' },
        { icon: ShieldCheck, label: '5+ Brands', description: 'Authorized Partnerships', color: 'text-green-400' },
        { icon: Truck, label: '720+ Parts', description: 'Ready to Ship', color: 'text-yellow-400' },
    ];

    const timeline = [
        { year: '2008', title: 'Company Founded', description: 'Started operations in Riyadh with a focus on Caterpillar parts' },
        { year: '2012', title: 'Regional Expansion', description: 'Expanded to serve clients across the Middle East region' },
        { year: '2016', title: 'OEM Partnerships', description: 'Secured authorized dealer status with JCB, Perkins, and Cummins' },
        { year: '2020', title: 'Digital Transformation', description: 'Launched online ordering platform for faster service' },
        { year: '2024', title: 'Industry Leader', description: 'Recognized as a top supplier with 1000+ active business accounts' },
    ];

    const brands = ['CATERPILLAR', 'JCB', 'PERKINS', 'CUMMINS', 'KMP'];

    useEffect(() => {
        if (!heroRef.current || !statsRef.current || !timelineRef.current) return;

        const ctx = gsap.context(() => {
            // Hero section animation
            gsap.fromTo(
                heroRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );

            // Stats animation
            const statCards = statsRef.current?.querySelectorAll('.stat-card');
            if (statCards && statCards.length > 0) {
                gsap.fromTo(
                    statCards,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // Timeline animation
            const milestones = timelineRef.current?.querySelectorAll('.timeline-milestone');
            if (milestones && milestones.length > 0) {
                gsap.fromTo(
                    milestones,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top 70%',
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-background text-white">
            {/* Grain Overlay */}
            <div className="grain-overlay" />

            <div className="relative py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <Breadcrumb className="mb-8">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>About Us</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Hero Section */}
                    <div ref={heroRef} className="mb-16 text-center space-y-6">
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-sm">
                            15+ Years of Excellence
                        </Badge>
                        <h1 className="font-heading font-bold text-5xl lg:text-7xl text-foreground leading-tight">
                            Built on <span className="text-primary">precision</span>.
                            <br />
                            Driven by <span className="text-primary">performance</span>.
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Saudi Horizon Co. delivers OEM-certified heavy equipment parts across the Middle East.
                            From excavators to power systems, we keep your operations running.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                            <Button
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                                onClick={() => router.push('/products')}
                            >
                                View Products
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white/20 text-white hover:bg-white/10"
                                onClick={() => router.push('/contact')}
                            >
                                Contact Sales
                            </Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <Card
                                    key={index}
                                    className="stat-card bg-card/30 backdrop-blur-md border-white/10 hover:border-primary/30 transition-all duration-300 group"
                                >
                                    <CardContent className="pt-6 text-center">
                                        <Icon className={`w-12 h-12 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                                        <h3 className="text-3xl font-heading font-bold text-foreground mb-2">{stat.label}</h3>
                                        <p className="text-sm text-muted-foreground">{stat.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Company Timeline */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
                                Our Journey
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                From a local supplier to a regional leader in heavy equipment parts
                            </p>
                        </div>

                        <div ref={timelineRef} className="relative">
                            {/* Timeline vertical line */}
                            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />

                            <div className="space-y-8">
                                {timeline.map((milestone, index) => (
                                    <div
                                        key={index}
                                        className={`timeline-milestone flex flex-col lg:flex-row items-start lg:items-center gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                            }`}
                                    >
                                        {/* Year Badge */}
                                        <div className="flex-shrink-0 lg:w-1/2 lg:text-right lg:pr-8">
                                            <Badge className="bg-primary text-primary-foreground font-heading text-lg px-4 py-2">
                                                <Calendar className="w-4 h-4 mr-2 inline" />
                                                {milestone.year}
                                            </Badge>
                                        </div>

                                        {/* Timeline dot */}
                                        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                                            <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                                        </div>

                                        {/* Content */}
                                        <Card className="flex-1 lg:w-1/2 bg-card/40 backdrop-blur-sm border-white/10 hover:border-primary/20 transition-colors">
                                            <CardHeader>
                                                <CardTitle className="text-xl font-heading text-foreground flex items-start gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                                    {milestone.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-muted-foreground">{milestone.description}</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Authorized Brands */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
                                Authorized OEM Partners
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Exclusive partnerships ensuring genuine parts and expert support
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {brands.map((brand, index) => (
                                <Card
                                    key={index}
                                    className="bg-card/20 backdrop-blur-sm border-white/10 hover:border-primary/30 hover:bg-card/30 transition-all duration-300 group cursor-pointer"
                                >
                                    <CardContent className="pt-8 pb-8 text-center">
                                        <p className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                                            {brand}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <Card className="bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30">
                        <CardContent className="py-12 text-center">
                            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
                                Ready to partner with us?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Get competitive wholesale pricing and dedicated account management
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    size="lg"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                                    onClick={() => router.push('/contact')}
                                >
                                    Request Quote
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white/20 text-white hover:bg-white/10"
                                    onClick={() => router.push('/products')}
                                >
                                    Browse Catalog
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
