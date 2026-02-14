"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
    {
        name: "Engine Parts",
        description: "Genuine engines, filters, pumps & components",
        image: "/images/category_engine_1771103460342.png",
        count: 156,
        featured: true,
    },
    {
        name: "Hydraulic Systems",
        description: "Cylinders, pumps, valves & hoses",
        image: "/images/category_hydraulics_1771103478320.png",
        count: 98,
        featured: false,
    },
    {
        name: "Electrical Parts",
        description: "Starters, alternators, sensors & wiring",
        image: "/images/category_electrical_1771103498559.png",
        count: 124,
        featured: false,
    },
    {
        name: "Transmission",
        description: "Gears, torque converters & clutches",
        image: "/images/category_transmission_1771103409895.png",
        count: 87,
        featured: false,
    },
    {
        name: "Undercarriage",
        description: "Tracks, rollers, idlers & sprockets",
        image: "/images/category_undercarriage_1771103424285.png",
        count: 112,
        featured: false,
    },
    {
        name: "Attachments",
        description: "Buckets, blades, hammers & couplers",
        image: "/images/category_attachments_1771103438577.png",
        count: 143,
        featured: true,
    },
];

export function CategoriesSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="section-padding bg-[var(--color-bg-secondary)]">
            <div className="container-premium">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
                >
                    <div className="max-w-2xl">
                        <span className="micro-label mb-4 block">PRODUCT CATEGORIES</span>
                        <h2>Everything Your Equipment Needs</h2>
                    </div>
                    <Link
                        href="/categories"
                        className="btn-secondary whitespace-nowrap"
                    >
                        View All Categories
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Masonry Grid */}
                <div ref={containerRef} className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-[var(--radius-lg)] ${category.featured
                                ? "md:col-span-2 md:row-span-2"
                                : "md:col-span-1"
                                }`}
                        >
                            {/* Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                {/* Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-bg-primary)] text-xs font-bold uppercase tracking-wider rounded-full">
                                        {category.count} Items
                                    </span>
                                </div>

                                {/* Text */}
                                <h3 className="text-2xl mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                                    {category.name}
                                </h3>
                                <p className="text-[rgba(255,255,255,0.6)] text-sm mb-4 line-clamp-2">
                                    {category.description}
                                </p>

                                {/* Link */}
                                <Link
                                    href={`/categories?category=${category.name.toLowerCase().replace(' ', '-')}`}
                                    className="inline-flex items-center gap-2 text-[var(--color-accent)] text-sm font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                >
                                    Explore
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Border */}
                            <div className="absolute inset-0 border border-white/10 group-hover:border-[var(--color-accent)]/50 rounded-[var(--radius-lg)] transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
