"use client";

import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CategoriesSection } from '@/components/home/premium/CategoriesSection';
import { CTAFooterSection } from '@/components/home/premium/CTAFooterSection';

export default function Home() {
    return (
        <main className="min-h-screen bg-navy text-white selection:bg-gold selection:text-charcoal relative">
            {/* Grain Overlay */}
            <div className="grain-overlay" />

            <HeroSection />

            {/* Categories - with images */}
            <CategoriesSection />

            <FeaturedProducts />
            <TestimonialsSection />

            {/* CTA + Footer */}
            <CTAFooterSection />
        </main>
    );
}
