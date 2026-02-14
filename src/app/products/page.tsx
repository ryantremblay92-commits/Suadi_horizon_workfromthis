import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import ProductsPageClient from './ProductsPageClient';

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background text-white py-8 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                    <p>Loading products...</p>
                </div>
            </div>
        }>
            <ProductsPageClient />
        </Suspense>
    );
}
