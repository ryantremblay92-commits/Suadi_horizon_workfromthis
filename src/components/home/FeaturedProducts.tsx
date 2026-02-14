"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts, Product } from "@/api/products";
import { ProductCard } from "@/components/ProductCard";

export function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts({ limit: 4 });
                setProducts(data.products);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = (product: Product) => {
        console.log("Add to cart:", product.name);
    };

    const handleQuickInquiry = (product: Product) => {
        console.log("Quick inquiry:", product.name);
    };

    return (
        <section className="py-32 bg-navy relative border-t border-white/5">
            {/* Background Gradient */}
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block font-display">Genuine Parts</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-display">Recent Arrivals</h2>
                    </div>
                    <Link href="/products" className="group flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest hover:text-gold transition-colors">
                        View Complete Catalog
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-sm" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.slice(0, 4).map((product, index) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onAddToCart={handleAddToCart}
                                onQuickInquiry={handleQuickInquiry}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
