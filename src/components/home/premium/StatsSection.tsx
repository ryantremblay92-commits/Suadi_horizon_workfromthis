"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
    { value: 15, suffix: "+", label: "Years of Excellence" },
    { value: 1000, suffix: "+", label: "Satisfied Clients" },
    { value: 720, suffix: "+", label: "Parts Available" },
    { value: 98, suffix: "%", label: "On-Time Delivery" },
];

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <span className="text-5xl md:text-7xl font-bold text-gradient-gold" style={{ fontFamily: 'var(--font-display)' }}>
            {count}{suffix}
        </span>
    );
}

export function StatsSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={containerRef}
            className="section-padding bg-[var(--color-bg-secondary)] relative overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 gradient-accent-glow opacity-50" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            <div className="container-premium relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="micro-label mb-4 block">OUR IMPACT</span>
                    <h2>Numbers That Speak</h2>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="text-center"
                        >
                            <Counter
                                value={stat.value}
                                suffix={stat.suffix}
                                inView={isInView}
                            />
                            <div className="mt-4 text-lg text-[rgba(255,255,255,0.6)]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16 text-[rgba(255,255,255,0.4)] max-w-2xl mx-auto"
                >
                    Trusted by construction companies, mining operations, and industrial facilities
                    across the Middle East and beyond.
                </motion.p>
            </div>
        </section>
    );
}
