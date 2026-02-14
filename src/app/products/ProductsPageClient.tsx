'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Grid3x3, List, Loader2, SlidersHorizontal, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { getProducts, Product } from '@/api/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductTableRow } from '@/components/ProductTableRow';
import { FilterSidebar, FilterState } from '@/components/FilterSidebar';
import { QuickInquiryDialog } from '@/components/QuickInquiryDialog';
import { ShimmerGrid } from '@/components/ui/shimmer';
import { addToCart } from '@/api/cart';
import { toast } from 'sonner';
// Product Discovery System imports
import { ConfiguratorModal } from '@/components/configurator';
import { ComparisonBar, ComparisonModal } from '@/components/comparison';
import { useComparison } from '@/contexts/ComparisonContext';
import { Equipment, matchProductsToEquipment } from '@/lib/equipment';
import equipmentDatabase from '../../../equipment-database.json';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPageClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('relevance');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        brands: [],
        categories: [],
        priceRange: [0, 5000],
        search: '',
    });
    const [inquiryDialog, setInquiryDialog] = useState({
        open: false,
        productName: '',
        productId: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const gridRef = useRef<HTMLDivElement>(null);

    // Product Discovery System state
    const { comparisonProducts } = useComparison();
    const [configuratorOpen, setConfiguratorOpen] = useState(false);
    const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const [compatibleOnly, setCompatibleOnly] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            console.log('🛍️ [DEBUG] Products: Starting to load products');
            try {
                console.log('🔗 [DEBUG] Products: Making API call to getProducts()');
                const res = await getProducts();
                console.log('✅ [DEBUG] Products: API call successful', {
                    totalProducts: res.products?.length || 0,
                    totalCount: res.total,
                });
                setProducts(res.products);
                setFilteredProducts(res.products);
                console.log('🎆 [DEBUG] Products: State updated successfully');
            } catch (error) {
                console.error('🚫 [DEBUG] Products: API call failed', error);
                toast.error('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, [toast]);

    useEffect(() => {
        // Apply search param filters if present
        const category = searchParams.get('category');
        if (category) {
            setFilters(prev => ({
                ...prev,
                categories: [category],
            }));
        }
    }, [searchParams]);

    useEffect(() => {
        let filtered = [...products];

        // Apply brand filter
        if (filters.brands.length > 0) {
            filtered = filtered.filter((p) => filters.brands.includes(p.brand));
        }

        // Apply category filter
        if (filters.categories.length > 0) {
            filtered = filtered.filter((p) => filters.categories.includes(p.category));
        }

        filtered = filtered.filter(
            (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        if (filters.search) {
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                    p.sku.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.reverse();
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [filters, sortBy, products]);

    // GSAP Scroll Animation for Product Cards
    useEffect(() => {
        if (!gridRef.current || isLoading || filteredProducts.length === 0) return;

        const cards = gridRef.current.querySelectorAll<HTMLElement>('.product-card-animated');

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cards,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }, gridRef);

        return () => ctx.revert();
    }, [filteredProducts, isLoading]);

    const handleAddToCart = (product: Product) => {
        addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            sku: product.sku,
            type: 'product',
        });

        toast.success(`${product.name} has been added to your cart`);
    };

    const handleQuickInquiry = (product: Product) => {
        setInquiryDialog({
            open: true,
            productName: product.name,
            productId: product._id,
        });
    };

    const handleClearFilters = () => {
        setFilters({
            brands: [],
            categories: [],
            priceRange: [0, 5000],
            search: '',
        });
        setMobileFilterOpen(false);
    };

    return (
        <div className="min-h-screen bg-navy text-white py-8 relative">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-6">
                    <BreadcrumbList className="text-slate-400">
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')} className="hover:text-gold transition-colors">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-slate-600" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-gold font-medium">Spare Parts</BreadcrumbPage>
                        </BreadcrumbItem>
                        {filters.categories.length > 0 && (
                            <>
                                <BreadcrumbSeparator className="text-slate-600" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-gold font-medium">{filters.categories[0]}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-4">
                    <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <SlidersHorizontal className="w-4 h-4 mr-2" />
                                Filters
                                {(filters.brands.length > 0 || filters.categories.length > 0) && (
                                    <span className="ml-2 bg-yellow-500 text-gray-900 text-xs px-2 py-0.5 rounded-full">
                                        {filters.brands.length + filters.categories.length}
                                    </span>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-80 bg-gray-800 text-white overflow-y-auto">
                            <div className="mt-6">
                                <FilterSidebar onFilterChange={setFilters} />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar - Hidden on Mobile */}
                    <div className="hidden lg:block lg:w-64 flex-shrink-0">
                        <FilterSidebar onFilterChange={setFilters} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="mb-6 space-y-4">
                            <h1 className="text-2xl lg:text-4xl font-bold text-white font-display tracking-tight">Spare Parts</h1>
                            <p className="text-slate-400 text-sm lg:text-base">
                                Showing <span className="text-gold font-bold">{filteredProducts.length}</span> of {products.length} products
                            </p>

                            {/* Controls */}
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="flex gap-2">
                                    <ToggleGroup type="single" value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'list')}>
                                        <ToggleGroupItem value="grid" aria-label="Grid view">
                                            <Grid3x3 className="w-4 h-4" />
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="list" aria-label="List view">
                                            <List className="w-4 h-4" />
                                        </ToggleGroupItem>
                                    </ToggleGroup>

                                    {/* Configure Equipment Button */}
                                    <Button
                                        onClick={() => setConfiguratorOpen(true)}
                                        variant="outline"
                                        className="glass border-gold/30 text-gold hover:bg-gold/10 hover:border-gold transition-all"
                                    >
                                        <Settings className="w-4 h-4 mr-2" />
                                        Configure Equipment
                                    </Button>
                                </div>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-full sm:w-48 glass border-white/10 text-white focus:ring-gold/50">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-navy/95 backdrop-blur-xl border-white/10 text-white">
                                        <SelectItem value="relevance" className="focus:bg-white/10 focus:text-gold">Relevance</SelectItem>
                                        <SelectItem value="price-low" className="focus:bg-white/10 focus:text-gold">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high" className="focus:bg-white/10 focus:text-gold">Price: High to Low</SelectItem>
                                        <SelectItem value="newest" className="focus:bg-white/10 focus:text-gold">Newest</SelectItem>
                                        <SelectItem value="rating" className="focus:bg-white/10 focus:text-gold">Top Rated</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Active Filters Summary - Mobile */}
                        {(filters.brands.length > 0 || filters.categories.length > 0) && (
                            <div className="lg:hidden mb-4 flex flex-wrap gap-2">
                                {filters.brands.map(brand => (
                                    <span key={brand} className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                        {brand}
                                        <button onClick={() => setFilters({ ...filters, brands: filters.brands.filter(b => b !== brand) })}>×</button>
                                    </span>
                                ))}
                                {filters.categories.map(cat => (
                                    <span key={cat} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                        {cat}
                                        <button onClick={() => setFilters({ ...filters, categories: filters.categories.filter(c => c !== cat) })}>×</button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Loading State */}
                        {isLoading ? (
                            <ShimmerGrid count={6} />
                        ) : (
                            <>
                                {/* Products Grid/List */}
                                {filteredProducts.length > 0 ? (
                                    viewMode === 'grid' ? (
                                        <div
                                            ref={gridRef}
                                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                                        >
                                            {filteredProducts.map((product, index) => (
                                                <div key={product._id} className="product-card-animated">
                                                    <ProductCard
                                                        product={product}
                                                        onAddToCart={handleAddToCart}
                                                        onQuickInquiry={handleQuickInquiry}
                                                        index={index}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div
                                            className="space-y-4"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {filteredProducts.map((product) => (
                                                <ProductTableRow
                                                    key={product._id}
                                                    product={product}
                                                    onAddToCart={handleAddToCart}
                                                    onQuickInquiry={handleQuickInquiry}
                                                />
                                            ))}
                                        </motion.div>
                                    )
                                ) : (
                                    <motion.div
                                        className="text-center py-12"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <p className="text-lg text-gray-300">No products found matching your filters</p>
                                        <Button
                                            variant="outline"
                                            className="mt-4 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                                            onClick={handleClearFilters}
                                        >
                                            Clear Filters
                                        </Button>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Quick Inquiry Dialog */}
                <QuickInquiryDialog
                    open={inquiryDialog.open}
                    onOpenChange={(open) =>
                        setInquiryDialog({ ...inquiryDialog, open })
                    }
                    productName={inquiryDialog.productName}
                    productId={inquiryDialog.productId}
                />

                {/* Equipment Configurator Modal */}
                <ConfiguratorModal
                    isOpen={configuratorOpen}
                    onClose={() => setConfiguratorOpen(false)}
                    onEquipmentSelect={setSelectedEquipment}
                    selectedEquipment={selectedEquipment}
                    equipmentData={equipmentDatabase}
                />

                {/* Comparison Bar - Shows when products are selected */}
                <ComparisonBar
                    products={products}
                    onCompare={() => setComparisonModalOpen(true)}
                />

                {/* Comparison Modal */}
                <ComparisonModal
                    products={products.filter(p => comparisonProducts.includes(p._id))}
                    isOpen={comparisonModalOpen}
                    onClose={() => setComparisonModalOpen(false)}
                />
            </div>
        </div>
    );
}
