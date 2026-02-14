"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        content: "Saudi Horizon provided exceptional service in sourcing hard-to-find parts for our heavy machinery fleet. Their delivery speed minimized our downtime significantly.",
        author: "Fahad Al-Otaibi",
        role: "Operations Director",
        company: "Al-Otaibi Construction",
        rating: 5
    },
    {
        id: 2,
        content: "The quality of the refurbished equipment we purchased was outstanding. It performes like new but at a fraction of the cost. Highly recommended partner.",
        author: "John Smith",
        role: "Fleet Manager",
        company: "Global Logistics Co.",
        rating: 5
    },
    {
        id: 3,
        content: "Their technical support team went above and beyond to help us identify the correct components for our vintage Caterpillar generators.",
        author: "Mohammed Asghar",
        role: "Chief Engineer",
        company: "Power Systems Ltd.",
        rating: 5
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-32 bg-charcoal relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block font-display">Client Success Stories</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-display">Trusted by Industry Leaders</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="glass p-8 rounded-xl relative group"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-8 right-8 text-gold/10 group-hover:text-gold/20 transition-colors">
                                <Quote size={48} />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6 text-gold">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" className="text-gold" />
                                ))}
                            </div>

                            <p className="text-slate-300 mb-8 leading-relaxed relative z-10">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center text-navy font-bold text-lg">
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div className="text-sm">
                                    <div className="text-white font-bold">{testimonial.author}</div>
                                    <div className="text-gold/80">{testimonial.role}, {testimonial.company}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
