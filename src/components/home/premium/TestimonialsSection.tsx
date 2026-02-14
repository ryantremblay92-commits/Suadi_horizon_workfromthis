"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Saudi Horizon provided exceptional service in sourcing hard-to-find parts for our heavy machinery fleet. Their delivery speed minimized our downtime significantly.",
        author: "Fahad Al-Otaibi",
        role: "Operations Director",
        company: "Al-Otaibi Construction",
        image: null,
        initials: "FA",
    },
    {
        quote: "The quality of the refurbished equipment we purchased was outstanding. It performs like new but at a fraction of the cost. Highly recommended partner.",
        author: "John Smith",
        role: "Fleet Manager",
        company: "Global Logistics Co.",
        image: null,
        initials: "JS",
    },
    {
        quote: "Their technical support team went above and beyond to help us identify the correct components for our vintage Caterpillar generators.",
        author: "Mohammed Asghar",
        role: "Chief Engineer",
        company: "Power Systems Ltd.",
        image: null,
        initials: "MA",
    },
];

export function TestimonialsSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/testimonial_portrait.jpg')",
                    }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[var(--color-bg-primary)]/85" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-[var(--color-bg-primary)]" />
            </div>

            <div className="container-premium relative z-10 py-24">
                {/* Quote Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-12"
                >
                    <div className="w-20 h-20 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
                        <Quote className="w-10 h-10 text-[var(--color-accent)]" />
                    </div>
                </motion.div>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center mb-16"
                >
                    <span className="micro-label mb-4 block">CLIENT SUCCESS STORIES</span>
                    <h2>Trusted by Industry Leaders</h2>
                </motion.div>

                {/* Testimonials */}
                <div ref={containerRef} className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.author}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                        >
                            <div className="glass-premium rounded-[var(--radius-lg)] p-8 h-full">
                                {/* Quote */}
                                <Quote className="w-8 h-8 text-[var(--color-accent)] mb-4 opacity-50" />
                                <p className="text-lg text-[rgba(255,255,255,0.8)] mb-8 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg-primary)] font-bold">
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-sm text-[rgba(255,255,255,0.5)]">
                                            {testimonial.role}, {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
