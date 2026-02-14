"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const brands = [
    { name: "CATERPILLAR", logo: "🐱" },
    { name: "JCB", logo: "🚜" },
    { name: "PERKINS", logo: "⚙️" },
    { name: "CUMMINS", logo: "🔧" },
    { name: "KMP", logo: "🔩" },
    { name: "KOMATSU", logo: "🏗️" },
    { name: "VOLVO", logo: "🚧" },
    { name: "HITACHI", logo: "🏭" },
    { name: "KUBOTA", logo: "🌾" },
    { name: "MITSUBISHI", logo: "🔶" },
];

export function BrandStripSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="py-12 bg-[var(--color-bg-secondary)] border-y border-white/5 overflow-hidden">
            {/* Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[var(--color-bg-secondary)] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[var(--color-bg-secondary)] to-transparent pointer-events-none" />

            {/* Brand Marquee */}
            <div ref={containerRef} className="flex overflow-hidden">
                <motion.div
                    className="flex items-center gap-16 whitespace-nowrap"
                    animate={{
                        x: [0, -50 * brands.length * 4],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {/* Double the brands for seamless loop */}
                    {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                        <motion.div
                            key={`${brand.name}-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: (index % brands.length) * 0.05 }}
                            className="group flex items-center gap-3 cursor-pointer"
                        >
                            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100">
                                {brand.logo}
                            </span>
                            <span className="text-lg font-semibold text-[rgba(255,255,255,0.4)] group-hover:text-white transition-colors duration-300 tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                                {brand.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
