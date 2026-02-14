"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <header className="relative min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden bg-navy border-b border-white/10">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2070&auto=format&fit=crop"
                    alt="Industrial Background"
                    className="w-full h-full object-cover opacity-40"
                />
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gold/20 mb-8 animate-fade-in backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                        <span className="text-gold text-xs font-bold tracking-widest uppercase font-display">Premium Industrial Solutions</span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] animate-slide-up" style={{ animationDelay: "0.1s" }}>
                        Engineering the Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">Global Industry</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl leading-relaxed animate-slide-up font-light" style={{ animationDelay: "0.2s" }}>
                        Optimize your operations with world-class machinery, OEM-certified parts, and 24/7 technical support.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                        <Link
                            href="/products"
                            className="bg-gold text-navy px-8 sm:px-10 py-4 sm:py-5 rounded-sm font-display text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-navy transition-all duration-300 flex items-center gap-2 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        >
                            Explore Catalog
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/contact"
                            className="px-8 sm:px-10 py-4 sm:py-5 border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all text-sm font-bold uppercase tracking-[0.2em] text-white rounded-sm font-display cursor-pointer min-h-[48px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy backdrop-blur-sm"
                            aria-label="View our technical catalog"
                        >
                            Technical Support
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats card with improved glass effect and accessibility */}
            <div className="absolute bottom-12 right-12 hidden lg:block animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="glass p-8 rounded-sm border-l-4 border-l-gold backdrop-blur-xl bg-surface/30">
                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <p className="text-4xl font-bold text-white mb-2 font-display">500+</p>
                            <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold font-display">OEM Parts In Stock</p>
                        </div>
                        <div className="w-px h-12 bg-white/10" aria-hidden="true"></div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-white mb-2 font-display">24/7</p>
                            <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold font-display">Mission Critical Support</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex flex-col items-center gap-2 text-slate-400">
                <span className="text-[10px] uppercase tracking-widest font-display font-medium">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent"></div>
            </div>
        </header>
    );
}
