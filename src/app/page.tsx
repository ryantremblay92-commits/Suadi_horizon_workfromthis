"use client";

import { FooterSection } from '@/components/home/FooterSection';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandMarqueeSection } from '@/components/home/BrandMarqueeSection';
import { WhyChooseSection } from '@/components/home/WhyChooseSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { FeaturedMachinery } from '@/components/home/FeaturedMachinery';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

export default function Home() {
    return (
        <main className="min-h-screen bg-navy text-white selection:bg-gold selection:text-charcoal relative">
            {/* Grain Overlay */}
            <div className="grain-overlay" />

            <HeroSection />
            <BrandMarqueeSection />
            <WhyChooseSection />
            <ProcessSection />
            <FeaturedMachinery />
            <FeaturedProducts />
            <TestimonialsSection />
            <FooterSection />
        </main>
    );
}
