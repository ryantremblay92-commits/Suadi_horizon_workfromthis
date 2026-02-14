"use client";

import { motion } from "framer-motion";

const brands = [
    { name: 'CATERPILLAR', logo: 'https://www.vectorlogo.zone/logos/caterpillar/caterpillar-ar21.svg' },
    { name: 'JCB', logo: 'https://www.vectorlogo.zone/logos/jcb/jcb-ar21.svg' },
    { name: 'PERKINS', logo: 'https://www.vectorlogo.zone/logos/perkins/perkins-ar21.svg' },
    { name: 'CUMMINS', logo: 'https://www.vectorlogo.zone/logos/cummins/cummins-ar21.svg' },
    { name: 'KMP', logo: 'https://www.vectorlogo.zone/logos/kmparts/kmparts-ar21.svg' },
    { name: 'KOMATSU', logo: 'https://www.vectorlogo.zone/logos/komatsu/komatsu-ar21.svg' },
    { name: 'VOLVO', logo: 'https://www.vectorlogo.zone/logos/volvo/volvo-ar21.svg' },
];

export function BrandMarqueeSection() {
    return (
        <section className="py-24 bg-surface border-y border-white/5 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-10">
                <p className="text-center text-gold/50 text-xs font-bold uppercase tracking-[0.3em] font-display">
                    Trusted by Industry Leaders
                </p>
            </div>

            <div className="relative flex items-center">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10"></div>

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-16 md:gap-24 pr-16 md:pr-24"
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {/* Duplicate the array 4 times to ensure smooth looping on large screens */}
                        {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                            <div key={index} className="flex-shrink-0 group relative">
                                <div className="absolute inset-0 bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="h-10 md:h-12 w-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 relative z-10 brightness-150 group-hover:brightness-100"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
