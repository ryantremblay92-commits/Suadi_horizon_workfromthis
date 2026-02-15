'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Grid3x3, List, Loader2, SlidersHorizontal, Settings, Search, X, ChevronLeft, ChevronRight, Package, Quote, Zap, Battery, Cpu, Gauge, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
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
import { Equipment } from '@/lib/equipment';
import equipmentDatabase from '../../../equipment-database.json';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPageClient() {
    const router = useRouter();
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

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 50;

    // Debounced search state
    const [searchInput, setSearchInput] = useState(filters.search);
    const [isSearching, setIsSearching] = useState(false);

    // Reduced motion preference
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Product Discovery System state
    const { comparisonProducts } = useComparison();
    const [configuratorOpen, setConfiguratorOpen] = useState(false);
    const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

    // Load products
    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                const res = await getProducts();
                setProducts(res.products);
                setFilteredProducts(res.products);
            } catch (error) {
                toast.error('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Apply search param filters if present
    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setFilters(prev => ({
                ...prev,
                categories: [category],
            }));
        }
    }, [searchParams]);

    // Debounced search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== filters.search) {
                setFilters(prev => ({ ...prev, search: searchInput }));
            }
            setIsSearching(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchInput, filters.search]);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setIsSearching(true);
    };

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters.brands, filters.categories, filters.priceRange, filters.search, sortBy]);

    // Computed filtered and sorted products
    const processedProducts = useMemo(() => {
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

        return filtered;
    }, [filters, sortBy, products]);

    // Paginated products
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        return processedProducts.slice(startIndex, startIndex + productsPerPage);
    }, [processedProducts, currentPage, productsPerPage]);

    const totalPages = Math.ceil(processedProducts.length / productsPerPage);

    // Set filtered products for display
    useEffect(() => {
        setFilteredProducts(processedProducts);
    }, [processedProducts]);

    // GSAP Scroll Animation for Product Cards
    useEffect(() => {
        if (!gridRef.current || isLoading || paginatedProducts.length === 0 || prefersReducedMotion) return;

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
    }, [paginatedProducts, isLoading, prefersReducedMotion]);

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
        setSearchInput('');
        setMobileFilterOpen(false);
    };

    const removeFilter = (type: 'brand' | 'category', value: string) => {
        if (type === 'brand') {
            setFilters({ ...filters, brands: filters.brands.filter(b => b !== value) });
        } else {
            setFilters({ ...filters, categories: filters.categories.filter(c => c !== value) });
        }
    };

    const hasActiveFilters = filters.brands.length > 0 || filters.categories.length > 0 || filters.search;

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

                {/* Quick Category Links - Common in E-commerce */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-semibold text-white">Shop by Category</h2>
                        <Button
                            variant="link"
                            className="text-gold ml-auto"
                            onClick={() => router.push('/categories')}
                        >
                            View All Categories
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {[
                            { name: 'Engine', icon: Zap, color: 'from-orange-500/20 to-red-500/20 border-orange-500/30' },
                            { name: 'Hydraulics', icon: Battery, color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
                            { name: 'Electrical', icon: Cpu, color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30' },
                            { name: 'Transmission', icon: Gauge, color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30' },
                            { name: 'Undercarriage', icon: Wrench, color: 'from-green-500/20 to-emerald-500/20 border-green-500/30' },
                            { name: 'Attachments', icon: Package, color: 'from-slate-500/20 to-zinc-500/20 border-slate-500/30' },
                        ].map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setFilters(prev => ({ ...prev, categories: [cat.name] }))}
                                className={`p-4 rounded-xl bg-gradient-to-br ${cat.color} border hover:border-gold/50 transition-all duration-300 group text-left`}
                            >
                                <cat.icon className="w-6 h-6 text-gold mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-white">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bulk Quote Banner */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-gold/10 via-yellow-500/10 to-gold/10 border border-gold/20">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gold/20">
                                <Quote className="w-5 h-5 text-gold" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Need a Bulk Quote?</h3>
                                <p className="text-sm text-slate-400">Get special pricing for large orders, fleet purchases, or recurring orders</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="border-gold text-gold hover:bg-gold hover:text-navy whitespace-nowrap"
                            onClick={() => router.push('/bulk-quote')}
                        >
                            Request Bulk Quote
                        </Button>
                    </div>
                </div>

                {/* Page Header with Search */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div>
                            <h1 className="text-2xl lg:text-4xl font-bold text-white font-display tracking-tight">Spare Parts</h1>
                            <p className="text-slate-400 text-sm lg:text-base mt-1">
                                Showing <span className="text-gold font-bold">{processedProducts.length}</span> of {products.length} products
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Search parts by name or SKU..."
                                value={searchInput}
                                onChange={handleSearchChange}
                                className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-gold/50 focus:ring-gold/20"
                            />
                            {searchInput && (
                                <button
                                    onClick={() => {
                                        setSearchInput('');
                                        setFilters(prev => ({ ...prev, search: '' }));
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

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
                        {/* Active Filters Summary */}
                        {hasActiveFilters && (
                            <div className="mb-6 flex flex-wrap gap-2 items-center">
                                <span className="text-sm text-slate-400">Active filters:</span>
                                {filters.search && (
                                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                        Search: "{filters.search}"
                                        <button onClick={() => {
                                            setSearchInput('');
                                            setFilters(prev => ({ ...prev, search: '' }));
                                        }} className="hover:text-white">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {filters.brands.map(brand => (
                                    <span key={brand} className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                        {brand}
                                        <button onClick={() => removeFilter('brand', brand)} className="hover:text-white">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                                {filters.categories.map(cat => (
                                    <span key={cat} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                        {cat}
                                        <button onClick={() => removeFilter('category', cat)} className="hover:text-white">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                                <button
                                    onClick={handleClearFilters}
                                    className="text-sm text-red-400 hover:text-red-300 ml-2 underline"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                            <div className="flex gap-2 flex-wrap">
                                <ToggleGroup type="single" value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'list')}>
                                    <ToggleGroupItem value="grid" aria-label="Grid view" className="px-3">
                                        <Grid3x3 className="w-4 h-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="list" aria-label="List view" className="px-3">
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

                            <div className="flex items-center gap-3 w-full sm:w-auto">
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

                        {/* Loading State */}
                        {isLoading ? (
                            <ShimmerGrid count={6} />
                        ) : (
                            <>
                                {/* Products Grid/List */}
                                {paginatedProducts.length > 0 ? (
                                    viewMode === 'grid' ? (
                                        <div
                                            ref={gridRef}
                                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                                        >
                                            {paginatedProducts.map((product, index) => (
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
                                            {paginatedProducts.map((product) => (
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
                                        className="text-center py-16"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                                            <Package className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <p className="text-lg text-gray-300 mb-2">No products found matching your filters</p>
                                        <p className="text-sm text-slate-500 mb-6">Try adjusting your search or filter criteria</p>
                                        <Button
                                            variant="outline"
                                            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                                            onClick={handleClearFilters}
                                        >
                                            Clear Filters
                                        </Button>
                                    </motion.div>
                                )}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <p className="text-sm text-slate-400">
                                            Showing {((currentPage - 1) * productsPerPage) + 1} to {Math.min(currentPage * productsPerPage, processedProducts.length)} of {processedProducts.length} products
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                className="border-white/10 hover:border-gold/30"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </Button>

                                            {/* Page Numbers */}
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                    let pageNum: number;
                                                    if (totalPages <= 5) {
                                                        pageNum = i + 1;
                                                    } else if (currentPage <= 3) {
                                                        pageNum = i + 1;
                                                    } else if (currentPage >= totalPages - 2) {
                                                        pageNum = totalPages - 4 + i;
                                                    } else {
                                                        pageNum = currentPage - 2 + i;
                                                    }

                                                    return (
                                                        <Button
                                                            key={pageNum}
                                                            variant={currentPage === pageNum ? 'default' : 'ghost'}
                                                            size="icon"
                                                            onClick={() => setCurrentPage(pageNum)}
                                                            className={currentPage === pageNum ? 'bg-gold text-navy hover:bg-gold/90' : 'border-white/10 hover:border-gold/30'}
                                                        >
                                                            {pageNum}
                                                        </Button>
                                                    );
                                                })}
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                className="border-white/10 hover:border-gold/30"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
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
