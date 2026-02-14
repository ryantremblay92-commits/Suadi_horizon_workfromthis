"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function SplitStorySection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={containerRef} className="relative min-h-[650px] flex pt-12">
            {/* Left - Image with Parallax */}
            <div className="w-1/2 relative overflow-hidden hidden lg:block">
                <motion.div
                    className="absolute inset-0"
                    style={{ y }}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/images/home/excellence.png')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-bg-primary)]" />
                </motion.div>

                {/* Gold Accent Line */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-[var(--color-accent)]" />
            </div>

            {/* Right - Content */}
            <div className="w-full lg:w-1/2 flex items-center bg-[var(--color-bg-primary)]">
                <div className="container-premium pt-0 pb-16">
                    <div className="max-w-xl ml-auto">
                        {/* Micro Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="micro-label mb-6"
                        >
                            OUR STORY
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="heading-md mb-10"
                        >
                            Decades of <span className="text-gradient-gold">excellence</span> in heavy equipment
                        </motion.h2>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="space-y-7"
                        >
                            <p className="text-body-lg text-white/70">
                                Since 2009, Saudi Horizon has been the trusted name in heavy equipment
                                parts across the Middle East. What started as a small warehouse in Riyadh
                                has grown into a regional leader.
                            </p>
                            <p className="text-body-lg text-white/70">
                                We understand that downtime costs thousands per hour. That's why we've
                                built our entire operation around speed, reliability, and technical expertise.
                            </p>
                            <p className="text-body-lg text-white/70">
                                Every team member—from our parts specialists to our logistics coordinators—
                                is committed to one goal: keeping your equipment running.
                            </p>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="grid grid-cols-3 gap-8 mt-14 pt-10 border-t border-white/10"
                        >
                            <div>
                                <div className="text-4xl font-bold text-gradient-gold mb-2">500+</div>
                                <div className="text-sm text-white/50 font-medium">OEM Parts</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-gradient-gold mb-2">24/7</div>
                                <div className="text-sm text-white/50 font-medium">Support</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-gradient-gold mb-2">98%</div>
                                <div className="text-sm text-white/50 font-medium">On-Time</div>
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mt-12"
                        >
                            <a href="/about" className="btn-primary inline-flex">
                                Learn Our Story
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
