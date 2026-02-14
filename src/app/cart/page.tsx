'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ShoppingCart, ArrowRight, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { getCart, removeFromCart, updateCartItem, clearCart, CartItem } from '@/api/cart';
import { toast } from 'sonner';

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const items = getCart();
        setCartItems(items);
    }, []);

    const handleRemoveItem = (itemId: string) => {
        removeFromCart(itemId);
        setCartItems(getCart());
        toast.success('Item Removed', {
            description: 'Item has been removed from your cart',
        });
    };

    const handleUpdateQuantity = (itemId: string, quantity: number) => {
        if (quantity > 0) {
            updateCartItem(itemId, quantity);
            setCartItems(getCart());
        }
    };

    const handleClearCart = () => {
        clearCart();
        setCartItems([]);
        toast.success('Cart Cleared', {
            description: 'Your cart has been cleared',
        });
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (!mounted) {
        return (
            <div className="min-h-screen bg-background text-white py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-800 rounded w-1/4"></div>
                        <div className="h-64 bg-gray-800 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>My Basket</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <h1 className="text-3xl font-bold mb-8 text-white">My Basket</h1>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item._id} className="overflow-hidden bg-background border-border">
                                    <CardContent className="p-6">
                                        <div className="flex gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded bg-gray-800"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                                                        <p className="text-sm text-gray-400">SKU: {item.sku}</p>
                                                    </div>
                                                    <p className="text-xl font-bold text-white">${item.price.toLocaleString()}</p>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                                            className="h-8 w-8 border-gray-700"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="w-12 text-center font-medium text-white">{item.quantity}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                                            className="h-8 w-8 border-gray-700"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveItem(item._id)}
                                                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <div className="flex justify-between items-center pt-4">
                                <Button
                                    variant="outline"
                                    onClick={handleClearCart}
                                    className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Clear Cart
                                </Button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="bg-background border-border sticky top-8">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-gray-300">
                                            <span>Subtotal ({cartItems.length} items)</span>
                                            <span>${subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-300">
                                            <span>Tax (10%)</span>
                                            <span>${tax.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-border">
                                            <span>Total</span>
                                            <span>${total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                                        onClick={() => router.push('/checkout')}
                                    >
                                        Proceed to Checkout
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-3 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
                                        onClick={() => router.push('/products')}
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Continue Shopping
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    /* Empty Cart */
                    <Card className="bg-background border-border">
                        <CardContent className="p-12 text-center">
                            <ShoppingCart className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                            <h2 className="text-2xl font-bold mb-2 text-white">Your basket is empty</h2>
                            <p className="text-gray-400 mb-6">Looks like you haven't added any items to your basket yet.</p>
                            <Button
                                onClick={() => router.push('/products')}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Browse Spare Parts
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
