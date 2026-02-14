import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Product from '@/lib/db/models/Product';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await context.params;
        const currentProduct = await Product.findById(id);

        if (!currentProduct) {
            return NextResponse.json(
                { error: 'Current product not found' },
                { status: 404 }
            );
        }

        const similarProducts = await Product.find({
            category: currentProduct.category,
            _id: { $ne: id }, // Exclude the current product
        }).limit(4); // Limit to 4 similar products

        return NextResponse.json(similarProducts);
    } catch (error: unknown) {
        console.error('Error fetching similar products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch similar products' },
            { status: 500 }
        );
    }
}
