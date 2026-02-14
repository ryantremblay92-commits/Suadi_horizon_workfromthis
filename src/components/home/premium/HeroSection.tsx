"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const stats = [
        { value: "15+", label: "Years Experience" },
        { value: "1000+", label: "Clients Worldwide" },
        { value: "720+", label: "Parts Available" },
        { value: "4.9", label: "Rating" },
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-end overflow-hidden"
        >
            {/* Background Image with Ken Burns Effect */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ scale }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/hero_bg.jpg')",
                    }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 gradient-hero-overlay" />
                {/* Accent Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 gradient-accent-glow" />
            </motion.div>

            {/* Content */}
            <div className="container-premium relative z-10 pb-24 pt-32">
                <div className="grid lg:grid-cols-2 gap-16 items-end">
                    {/* Left Content */}
                    <div className="max-w-3xl">
                        {/* Micro Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="micro-label mb-6"
                        >
                            SINCE 2009 — PREMIUM EQUIPMENT PARTS
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-6"
                        >
                            Engineered for{" "}
                            <span className="text-gradient-gold">performance.</span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-lg md:text-xl text-[rgba(255,255,255,0.7)] mb-10 max-w-xl"
                        >
                            Genuine OEM and aftermarket spare parts for the world's toughest machines.
                            Your equipment's reliability starts here.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link href="/products" className="btn-primary">
                                Explore Catalog
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/contact" className="btn-secondary">
                                Get Quote
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right - Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="hidden lg:block"
                    >
                        <div className="glass-premium rounded-[var(--radius-lg)] p-8 backdrop-blur-xl">
                            <div className="grid grid-cols-2 gap-8">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-[rgba(255,255,255,0.5)] uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-[rgba(255,255,255,0.4)]"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </motion.div>

            {/* WhatsApp Floating Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                className="absolute bottom-8 right-8 z-20"
            >
                <a
                    href="https://wa.me/966500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full font-semibold shadow-lg hover:shadow-[#25D366]/30 transition-all hover:scale-105"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                </a>
            </motion.div>
        </section>
    );
}
