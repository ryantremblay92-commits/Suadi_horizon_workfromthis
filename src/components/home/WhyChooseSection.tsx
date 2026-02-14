"use client";

import { ShieldCheck, Atom, Globe, Truck, Award, Clock, Wrench, Headphones } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Reliability",
        description: "Uncompromising quality control for components that withstand the most extreme operational stresses.",
    },
    {
        icon: Atom,
        title: "Innovation",
        description: "Utilizing advanced engineering data to source parts that optimize fuel efficiency and machine longevity.",
    },
    {
        icon: Globe,
        title: 'OEM-Certified Parts',
        description: 'Genuine components from authorized distributors with full certification',
    },
    {
        icon: Truck,
        title: 'Regional Distribution',
        description: 'Express delivery network across the Middle East with tracking',
    },
    // Adding more features inline to match the grid layout if needed visually, 
    // or keeping the existing 6-8 items.
    {
        icon: Award,
        title: '15+ Years Expertise',
        description: 'Industry-leading experience in heavy equipment supply chain',
    },
    {
        icon: Clock,
        title: '24/7 Technical Support',
        description: 'Round-the-clock assistance for urgent part identification',
    },
    {
        icon: Wrench,
        title: 'Specification Guidance',
        description: 'Expert technical consultation for compatibility verification',
    },
    {
        icon: Headphones,
        title: 'Account Management',
        description: 'Dedicated support for bulk orders and fleet maintenance',
    },
];

export function WhyChooseSection() {
    return (
        <section className="py-32 bg-charcoal relative border-t border-white/5 overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Image / Visual */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-charcoal rounded-sm blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative aspect-square rounded-sm overflow-hidden bg-surface border border-white/5 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                                alt="Industrial Excellence"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent"></div>

                            {/* Floating Stats Card */}
                            <div className="absolute bottom-6 left-6 right-6 glass p-6 border-l-4 border-gold">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gold/10 p-3 rounded-full backdrop-blur-md">
                                        <Award className="w-8 h-8 text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-white font-display">1000+</p>
                                        <p className="text-xs text-slate-300 uppercase tracking-widest font-medium">Satisfied Clients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div>
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block font-display">Why Choose Us</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-display mb-8 leading-tight">
                            Engineering Excellence & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">Unmatched Reliability</span>
                        </h2>
                        <p className="text-slate-300 text-lg mb-12 leading-relaxed">
                            We don't just supply parts; we deliver peace of mind. Our rigorous quality standards and deep technical expertise ensure that your machinery operates at peak performance, minimizing downtime and maximizing ROI.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                            {features.map((feature, index) => (
                                <div key={index} className="group">
                                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-white/5 rounded-lg group-hover:bg-gold/20 transition-colors duration-300 border border-white/10 group-hover:border-gold/30">
                                        <feature.icon className="w-6 h-6 text-gold transition-transform group-hover:scale-110" />
                                    </div>
                                    <h4 className="text-white font-bold mb-2 font-display text-lg group-hover:text-gold transition-colors">{feature.title}</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
