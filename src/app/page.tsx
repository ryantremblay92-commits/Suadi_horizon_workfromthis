"use client";

import { HeroSection } from "@/components/home/premium/HeroSection";
import { BrandStripSection } from "@/components/home/premium/BrandStripSection";
import { FeaturesGridSection } from "@/components/home/premium/FeaturesGridSection";
import { CategoriesSection } from "@/components/home/premium/CategoriesSection";
import { ProductsSection } from "@/components/home/premium/ProductsSection";
import { SplitStorySection } from "@/components/home/premium/SplitStorySection";
import { TestimonialsSection } from "@/components/home/premium/TestimonialsSection";
import { HomeCTASection } from "@/components/home/premium/HomeCTASection";
import { FeaturedArticlesSection } from "@/components/home/premium/FeaturedArticlesSection";
import { FAQSection } from "@/components/home/premium/FAQSection";
import { CTAFooterSection } from "@/components/home/premium/CTAFooterSection";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-navy">
            <HeroSection />
            <BrandStripSection />

            <div className="section-divider" />
            <FeaturesGridSection />
            <CategoriesSection />
            <ProductsSection />
            <SplitStorySection />

            <div className="section-divider" />
            <TestimonialsSection />

            <div className="section-divider" />
            <HomeCTASection />
            <FeaturedArticlesSection />
            <FAQSection />

            <CTAFooterSection />
        </main>
    );
}
