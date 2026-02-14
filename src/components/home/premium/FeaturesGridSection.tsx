"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle, Shield, Clock, Users, Truck, Wrench } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "OEM Genuine Parts",
        description: "Every component is certified by original equipment manufacturers, guaranteeing exact fit and performance.",
        learnMore: "/about",
    },
    {
        icon: Clock,
        title: "24h Express Delivery",
        description: "Critical parts delivered within 24 hours across the Middle East. Your downtime is our priority.",
        learnMore: "/installation",
    },
    {
        icon: Users,
        title: "Expert Technical Support",
        description: "Our seasoned engineers help you identify the right part—first time, every time.",
        learnMore: "/contact",
    },
    {
        icon: Wrench,
        title: "Professional Installation",
        description: "Certified technicians available for on-site installation and equipment maintenance.",
        learnMore: "/installation",
    },
    {
        icon: Truck,
        title: "Global Logistics Network",
        description: "Strategic partnerships with leading freight carriers ensure safe, timely deliveries worldwide.",
        learnMore: "/shipping",
    },
    {
        icon: CheckCircle,
        title: "Quality Assurance",
        description: "Rigorous inspection protocols and comprehensive warranties back every product we sell.",
        learnMore: "/warranty",
    },
];

export function FeaturesGridSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="section-padding bg-[var(--color-bg-primary)]">
            <div className="container-premium">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="micro-label mb-4 block">WHY CHOOSE US</span>
                    <h2 className="mb-6">Built Different</h2>
                    <p className="text-[rgba(255,255,255,0.6)]">
                        We're not just a parts supplier. We're your strategic partner in keeping
                        heavy machinery running at peak performance.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="card-premium group"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-[var(--radius-md)] bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                                <feature.icon className="w-7 h-7 text-[var(--color-accent)]" />
                            </div>

                            {/* Content */}
                            <h4 className="mb-3 text-xl">{feature.title}</h4>
                            <p className="text-[rgba(255,255,255,0.6)] mb-6 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Learn More Link */}
                            <a
                                href={feature.learnMore}
                                className="inline-flex items-center gap-2 text-[var(--color-accent)] text-sm font-semibold uppercase tracking-wider hover:gap-3 transition-all"
                            >
                                Learn More
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
