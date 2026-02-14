"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FileSearch, Globe, ShieldCheck, Truck } from "lucide-react";
import { useRef } from "react";

const steps = [
    {
        id: 1,
        title: "Requirement Analysis",
        description: "We analyze your technical specifications and operational needs to identify the exact parts required.",
        icon: FileSearch,
    },
    {
        id: 2,
        title: "Global Sourcing",
        description: "Leveraging our network of certified OEMs and distributors to find the best components worldwide.",
        icon: Globe,
    },
    {
        id: 3,
        title: "Quality Verification",
        description: "A rigorous inspection process ensuring every part meets OEM standards and durability requirements.",
        icon: ShieldCheck,
    },
    {
        id: 4,
        title: "Express Delivery",
        description: "Rapid logistics and customs clearance to get critical parts to your site without delay.",
        icon: Truck,
    },
];

export function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Smooth progress for the timeline line
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="py-32 bg-navy relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-navy)_0%,_#000000_100%)] opacity-80" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

            {/* Animated Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "2s" }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block font-display"
                    >
                        Precision Workflow
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white font-display mb-8"
                    >
                        Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer bg-[length:200%_auto]">Flow</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-300 text-lg md:text-xl font-light leading-relaxed"
                    >
                        A synchronized sequence of precision operations ensuring verifying quality and accelerating delivery.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Central Spine Line (Desktop) */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-1/2">
                        <motion.div
                            style={{ scaleY, transformOrigin: "top" }}
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gold via-yellow-200 to-transparent shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                        />
                    </div>

                    <div className="space-y-24">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    className={`flex flex-col md:flex-row items-center gap-12 relative ${isEven ? 'md:flex-row-reverse text-right' : 'text-left'}`}
                                >
                                    {/* Content Side */}
                                    <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'} group`}>
                                        <div className="relative p-8 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden">
                                            {/* Hover Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-transparent to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-700" />

                                            {/* Watermark Number */}
                                            <span className="absolute -top-6 -right-4 text-[120px] font-bold text-white/[0.02] font-display pointer-events-none select-none transition-transform duration-700 group-hover:scale-110">
                                                0{step.id}
                                            </span>

                                            <h3 className="text-2xl font-bold text-white mb-4 font-display relative z-10 group-hover:text-gold transition-colors">
                                                {step.title}
                                            </h3>
                                            <p className="text-slate-300 leading-relaxed relative z-10">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Node */}
                                    <div className="relative z-10 shrink-0">
                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-navy border border-gold/30 flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.2)] relative group cursor-pointer transition-transform duration-300 hover:scale-110">
                                            <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-20" />
                                            <step.icon className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                                        </div>
                                    </div>

                                    {/* Spacer Side */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
