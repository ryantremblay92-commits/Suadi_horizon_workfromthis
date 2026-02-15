'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, CreditCard, Truck, MapPin, FileText, Shield, Lock, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { getCart, clearCart, CartItem } from '@/api/cart';
import { toast } from 'sonner';

type CheckoutStep = 'information' | 'shipping' | 'payment' | 'review';

interface ShippingAddress {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

const steps: { id: CheckoutStep; title: string; icon: React.ReactNode }[] = [
    { id: 'information', title: 'Information', icon: <MapPin className="w-5 h-5" /> },
    { id: 'shipping', title: 'Shipping', icon: <Truck className="w-5 h-5" /> },
    { id: 'payment', title: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'review', title: 'Review', icon: <FileText className="w-5 h-5" /> },
];

export default function CheckoutPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);

    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Kuwait',
    });

    const [shippingMethod, setShippingMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('card');

    // Promo code state
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
    const [discount, setDiscount] = useState(0);

    React.useEffect(() => {
        const items = getCart();
        if (items.length === 0) {
            router.push('/products');
            return;
        }
        setCartItems(items);
    }, [router]);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = shippingMethod === 'express' ? 15 : shippingMethod === 'overnight' ? 25 : 0;
    const discountAmount = subtotal * discount;
    const tax = (subtotal - discountAmount) * 0.1;
    const total = subtotal - discountAmount + shipping + tax;

    const stepIndex = steps.findIndex(s => s.id === currentStep);

    const handleNextStep = () => {
        const nextIndex = stepIndex + 1;
        if (nextIndex < steps.length) {
            setCurrentStep(steps[nextIndex].id);
        }
    };

    const handlePrevStep = () => {
        const prevIndex = stepIndex - 1;
        if (prevIndex >= 0) {
            setCurrentStep(steps[prevIndex].id);
        }
    };

    const handleApplyPromo = () => {
        // Mock promo code validation
        if (promoCode.toUpperCase() === 'SAVE10') {
            setDiscount(0.1);
            setAppliedPromo('SAVE10');
            toast.success('Promo code applied! 10% off');
        } else if (promoCode.toUpperCase() === 'SAVE20') {
            setDiscount(0.2);
            setAppliedPromo('SAVE20');
            toast.success('Promo code applied! 20% off');
        } else {
            toast.error('Invalid promo code');
        }
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        clearCart();
        toast.success('Order placed successfully!');
        router.push('/checkout/success');
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-8 flex-wrap gap-2">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`flex items-center gap-2 ${index <= stepIndex ? 'text-gold' : 'text-slate-500'
                            }`}
                    >
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${index < stepIndex
                                ? 'bg-gold text-navy'
                                : index === stepIndex
                                    ? 'bg-gold/20 text-gold border-2 border-gold'
                                    : 'bg-white/5 text-slate-500 border border-white/10'
                                }`}
                        >
                            {index < stepIndex ? <Check className="w-5 h-5" /> : step.icon}
                        </div>
                        <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
                    </motion.div>
                    {index < steps.length - 1 && (
                        <ChevronRight className="w-5 h-5 mx-2 text-slate-600" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    const renderInformationStep = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <Card className="glass border-white/5">
                <CardHeader>
                    <CardTitle className="text-white font-display">Contact Information</CardTitle>
                    <CardDescription className="text-slate-400">We'll use this to send your order confirmation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                            <Input
                                id="firstName"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                placeholder="John"
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                            <Input
                                id="lastName"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                placeholder="Doe"
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={shippingAddress.email}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                                placeholder="john@example.com"
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-slate-300">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={shippingAddress.phone}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                                placeholder="+965 12345678"
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>
                    </div>

                    <Separator className="my-6 bg-white/10" />

                    <CardTitle className="text-lg text-white">Shipping Address</CardTitle>

                    <div className="space-y-2">
                        <Label htmlFor="address" className="text-slate-300">Address</Label>
                        <Input
                            id="address"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            placeholder="123 Street Name, Block 4"
                            className="bg-white/5 border-white/10 text-white"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-slate-300">City</Label>
                            <Input
                                id="city"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                placeholder="Kuwait City"
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state" className="text-slate-300">Area</Label>
                            <Input
                                id="state"
                                value={shippingAddress.state}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                                placeholder="Salmiya"
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="zipCode" className="text-slate-300">Block</Label>
                            <Input
                                id="zipCode"
                                value={shippingAddress.zipCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                                placeholder="4"
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country" className="text-slate-300">Country</Label>
                            <Input
                                id="country"
                                value={shippingAddress.country}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                                className="bg-white/5 border-white/10 text-white"
                                disabled
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderShippingStep = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <Card className="glass border-white/5">
                <CardHeader>
                    <CardTitle className="text-white font-display">Shipping Method</CardTitle>
                    <CardDescription className="text-slate-400">Select your preferred shipping option</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="space-y-4">
                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-gold/30'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="standard" id="standard" />
                                    <div>
                                        <Label htmlFor="standard" className="font-semibold text-white">Standard Shipping</Label>
                                        <p className="text-sm text-slate-400">5-7 business days</p>
                                    </div>
                                </div>
                                <span className="text-gold font-bold">FREE</span>
                            </div>

                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-gold/30'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="express" id="express" />
                                    <div>
                                        <Label htmlFor="express" className="font-semibold text-white">Express Shipping</Label>
                                        <p className="text-sm text-slate-400">2-3 business days</p>
                                    </div>
                                </div>
                                <span className="text-white font-bold">KWD 15.00</span>
                            </div>

                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${shippingMethod === 'overnight' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-gold/30'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="overnight" id="overnight" />
                                    <div>
                                        <Label htmlFor="overnight" className="font-semibold text-white">Overnight Shipping</Label>
                                        <p className="text-sm text-slate-400">Next business day</p>
                                    </div>
                                </div>
                                <span className="text-white font-bold">KWD 25.00</span>
                            </div>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderPaymentStep = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <Card className="glass border-white/5">
                <CardHeader>
                    <CardTitle className="text-white font-display">Payment Method</CardTitle>
                    <CardDescription className="text-slate-400">Select your preferred payment option</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="space-y-4">
                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-gold/30'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="card" id="card" />
                                    <div>
                                        <Label htmlFor="card" className="font-semibold text-white">Credit/Debit Card</Label>
                                        <p className="text-sm text-slate-400">Visa, Mastercard, KNET</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">VISA</span>
                                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">MC</span>
                                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">KNET</span>
                                </div>
                            </div>

                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'knet' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-gold/30'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="knet" id="knet" />
                                    <div>
                                        <Label htmlFor="knet" className="font-semibold text-white">KNET</Label>
                                        <p className="text-sm text-slate-400">Pay with KNET debit cards</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-gold/30'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="cod" id="cod" />
                                    <div>
                                        <Label htmlFor="cod" className="font-semibold text-white">Cash on Delivery</Label>
                                        <p className="text-sm text-slate-400">Pay when you receive</p>
                                    </div>
                                </div>
                                <span className="text-sm text-slate-400">+KWD 2.00</span>
                            </div>
                        </div>
                    </RadioGroup>

                    <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 text-sm">
                            <Shield className="w-4 h-4 text-gold" />
                            <span className="font-medium text-white">Secure Payment</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            Your payment information is encrypted and secure. We never store your full card details.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderReviewStep = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card className="glass border-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <MapPin className="w-5 h-5 text-gold" />
                                Shipping Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-300">
                                {shippingAddress.firstName} {shippingAddress.lastName}<br />
                                {shippingAddress.address}<br />
                                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                                {shippingAddress.country}<br />
                                {shippingAddress.email}<br />
                                {shippingAddress.phone}
                            </p>
                            <Button variant="link" size="sm" onClick={() => setCurrentStep('information')} className="mt-2 p-0 text-gold hover:text-white">
                                Edit
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Truck className="w-5 h-5 text-gold" />
                                Shipping Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-300 capitalize">
                                {shippingMethod === 'standard' && 'Standard Shipping (5-7 days)'}
                                {shippingMethod === 'express' && 'Express Shipping (2-3 days)'}
                                {shippingMethod === 'overnight' && 'Overnight Shipping'}
                            </p>
                            <Button variant="link" size="sm" onClick={() => setCurrentStep('shipping')} className="mt-2 p-0 text-gold hover:text-white">
                                Edit
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <CreditCard className="w-5 h-5 text-gold" />
                                Payment Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-300 capitalize">
                                {paymentMethod === 'card' && 'Credit/Debit Card'}
                                {paymentMethod === 'knet' && 'KNET'}
                                {paymentMethod === 'cod' && 'Cash on Delivery'}
                            </p>
                            <Button variant="link" size="sm" onClick={() => setCurrentStep('payment')} className="mt-2 p-0 text-gold hover:text-white">
                                Edit
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div>
                    <Card className="glass border-white/5 sticky top-8">
                        <CardHeader>
                            <CardTitle className="text-white font-display">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Cart Items */}
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-white/5 rounded overflow-hidden">
                                                <img src={item.image || '/placeholder-image.png'} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-white line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="text-white font-medium">KWD {(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <Separator className="bg-white/10" />

                            {/* Promo Code */}
                            <div className="space-y-2">
                                <Label className="text-slate-300">Promo Code</Label>
                                {appliedPromo ? (
                                    <div className="flex items-center justify-between p-2 bg-emerald-500/10 border border-emerald-500/30 rounded">
                                        <span className="text-emerald-400 text-sm">{appliedPromo} applied</span>
                                        <button
                                            onClick={() => { setAppliedPromo(null); setDiscount(0); setPromoCode(''); }}
                                            className="text-emerald-400 hover:text-white text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <Input
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter code"
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                        <Button
                                            variant="outline"
                                            onClick={handleApplyPromo}
                                            className="border-gold text-gold hover:bg-gold hover:text-navy"
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <Separator className="bg-white/10" />

                            {/* Totals */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Subtotal</span>
                                    <span className="text-white">KWD {subtotal.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Discount</span>
                                        <span className="text-emerald-400">-KWD {discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Shipping</span>
                                    <span className="text-white">{shipping === 0 ? 'FREE' : `KWD ${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Tax (10%)</span>
                                    <span className="text-white">KWD {tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <Separator className="bg-white/10" />

                            <div className="flex justify-between text-lg font-bold">
                                <span className="text-white">Total</span>
                                <span className="text-gold">KWD {total.toFixed(2)}</span>
                            </div>

                            <Button
                                className="w-full bg-gold hover:bg-yellow text-navy font-bold"
                                size="lg"
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin">⏳</span> Processing...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        Place Order - KWD {total.toFixed(2)}
                                    </span>
                                )}
                            </Button>

                            <p className="text-xs text-center text-slate-500">
                                By placing this order, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-navy py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 mb-6">
                        <ShoppingCart className="w-10 h-10 text-gold" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
                    <p className="text-slate-400 mb-6">Add some products to your cart to checkout</p>
                    <Button
                        className="bg-gold hover:bg-yellow text-navy font-bold"
                        onClick={() => router.push('/products')}
                    >
                        Browse Products
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy text-white py-8 relative">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList className="text-slate-400">
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')} className="hover:text-gold transition-colors">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-slate-600" />
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/cart')} className="hover:text-gold transition-colors">Cart</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-slate-600" />
                        <BreadcrumbPage className="text-gold font-medium">Checkout</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                <h1 className="text-3xl font-bold text-center mb-8 font-display text-white">Checkout</h1>

                {renderStepIndicator()}

                <AnimatePresence mode="wait">
                    {currentStep === 'information' && renderInformationStep()}
                    {currentStep === 'shipping' && renderShippingStep()}
                    {currentStep === 'payment' && renderPaymentStep()}
                    {currentStep === 'review' && renderReviewStep()}
                </AnimatePresence>

                {currentStep !== 'review' && (
                    <div className="flex justify-between mt-8">
                        <Button
                            variant="outline"
                            onClick={handlePrevStep}
                            disabled={stepIndex === 0}
                            className="border-white/10 text-slate-300 hover:text-white hover:border-gold/30"
                        >
                            Back
                        </Button>
                        <Button className="bg-gold hover:bg-yellow text-navy font-bold" onClick={handleNextStep}>
                            Continue
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
