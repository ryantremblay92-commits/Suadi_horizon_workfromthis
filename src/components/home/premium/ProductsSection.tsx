"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Star } from "lucide-react";
import Link from "next/link";
import { getProducts, Product } from "@/api/products";

export function ProductsSection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts({ limit: 8 });
                setProducts(data.products);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / 4));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? Math.ceil(products.length / 4) - 1 : prev - 1
        );
    };

    return (
        <section className="section-padding bg-[var(--color-bg-primary)] overflow-hidden">
            <div className="container-premium">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
                >
                    <div className="max-w-2xl">
                        <span className="micro-label mb-4 block">FEATURED PRODUCTS</span>
                        <h2>Recent Arrivals</h2>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            ←
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            →
                        </button>
                    </div>
                </motion.div>

                {/* Products Carousel */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div ref={containerRef} className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {products
                                    .slice(currentIndex * 4, currentIndex * 4 + 4)
                                    .map((product, index) => (
                                        <motion.div
                                            key={product._id}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="group"
                                        >
                                            <Link href={`/products/${product._id}`}>
                                                <div className="card-premium p-0 overflow-hidden h-full flex flex-col">
                                                    {/* Image */}
                                                    <div className="relative aspect-square overflow-hidden bg-[var(--color-bg-tertiary)]">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        {/* Badges */}
                                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                            {index === 0 && (
                                                                <span className="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-bg-primary)] text-xs font-bold uppercase tracking-wider rounded-full">
                                                                    New
                                                                </span>
                                                            )}
                                                            {product.rating >= 4.5 && (
                                                                <span className="px-3 py-1 bg-white/90 text-[var(--color-bg-primary)] text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                                                                    <Star className="w-3 h-3 fill-current" />
                                                                    Popular
                                                                </span>
                                                            )}
                                                        </div>
                                                        {/* Quick Add */}
                                                        <button className="absolute bottom-3 right-3 w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                                            <Plus className="w-5 h-5 text-[var(--color-bg-primary)]" />
                                                        </button>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-5 flex-1 flex flex-col">
                                                        <div className="text-xs text-[var(--color-accent)] uppercase tracking-wider mb-2">
                                                            {product.brand || "OEM"}
                                                        </div>
                                                        <h4 className="text-lg mb-2 line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
                                                            {product.name}
                                                        </h4>
                                                        <div className="mt-auto pt-4 flex items-center justify-between">
                                                            <div>
                                                                <span className="text-2xl font-bold text-white">
                                                                    ${product.price}
                                                                </span>
                                                            </div>
                                                            <ArrowRight className="w-5 h-5 text-[rgba(255,255,255,0.3)] group-hover:text-[var(--color-accent)] transition-colors" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link href="/products" className="btn-secondary inline-flex">
                        View Complete Catalog
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
