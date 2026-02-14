"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMachinery, Machinery } from "@/api/machinery";
import { MachineryCard } from "@/components/MachineryCard";

export function FeaturedMachinery() {
    const [machinery, setMachinery] = useState<Machinery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMachinery({ limit: 4 });
                setMachinery(data.machinery);
            } catch (error) {
                console.error("Failed to fetch machinery", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleQuickInquiry = (item: Machinery) => {
        // Placeholder for quick inquiry logic
        console.log("Quick inquiry for:", item.name);
    };

    return (
        <section className="py-32 bg-surface relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 block font-display">Heavy Equipment</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-display">Featured Machinery</h2>
                    </div>
                    <Link href="/products" className="group flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest hover:text-gold transition-colors">
                        View All Inventory
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
                        {machinery.slice(0, 4).map((item, index) => (
                            <MachineryCard
                                key={item._id}
                                machinery={item}
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
