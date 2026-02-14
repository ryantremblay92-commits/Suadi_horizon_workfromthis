'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, CreditCard, Truck, MapPin, FileText, Shield, Lock } from 'lucide-react';
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
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

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

    const handlePlaceOrder = async () => {
        setLoading(true);
        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        clearCart();
        toast.success('Order placed successfully!');
        router.push('/checkout/success');
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`flex items-center gap-2 ${index <= stepIndex ? 'text-primary' : 'text-muted-foreground'
                            }`}
                    >
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${index < stepIndex
                                    ? 'bg-primary text-white'
                                    : index === stepIndex
                                        ? 'bg-primary/20 text-primary border-2 border-primary'
                                        : 'bg-muted text-muted-foreground'
                                }`}
                        >
                            {index < stepIndex ? <Check className="w-5 h-5" /> : step.icon}
                        </div>
                        <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
                    </motion.div>
                    {index < steps.length - 1 && (
                        <ChevronRight className="w-5 h-5 mx-2 text-muted-foreground" />
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
            <Card className="glass-light dark:glass-dark">
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>We'll use this to send your order confirmation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                placeholder="John"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={shippingAddress.email}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={shippingAddress.phone}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                                placeholder="+965 12345678"
                                required
                            />
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <CardTitle className="text-lg">Shipping Address</CardTitle>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            placeholder="123 Street Name, Block 4"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                placeholder="Kuwait City"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State/Governorate</Label>
                            <Input
                                id="state"
                                value={shippingAddress.state}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                                placeholder="Capital"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                                id="zipCode"
                                value={shippingAddress.zipCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                                placeholder="13001"
                                required
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
            <Card className="glass-light dark:glass-dark">
                <CardHeader>
                    <CardTitle>Shipping Method</CardTitle>
                    <CardDescription>Choose how you want to receive your order</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="space-y-4">
                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="standard" id="standard" />
                                    <div>
                                        <Label htmlFor="standard" className="font-semibold">Standard Shipping</Label>
                                        <p className="text-sm text-muted-foreground">5-7 business days</p>
                                    </div>
                                </div>
                                <span className="font-bold text-primary">FREE</span>
                            </div>

                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="express" id="express" />
                                    <div>
                                        <Label htmlFor="express" className="font-semibold">Express Shipping</Label>
                                        <p className="text-sm text-muted-foreground">2-3 business days</p>
                                    </div>
                                </div>
                                <span className="font-bold text-primary">KWD 15.00</span>
                            </div>

                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${shippingMethod === 'overnight' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="overnight" id="overnight" />
                                    <div>
                                        <Label htmlFor="overnight" className="font-semibold">Overnight Shipping</Label>
                                        <p className="text-sm text-muted-foreground">Next business day</p>
                                    </div>
                                </div>
                                <span className="font-bold text-primary">KWD 25.00</span>
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
            <Card className="glass-light dark:glass-dark">
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Select your preferred payment option</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="space-y-4">
                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="card" id="card" />
                                    <div>
                                        <Label htmlFor="card" className="font-semibold">Credit/Debit Card</Label>
                                        <p className="text-sm text-muted-foreground">Visa, Mastercard, KNET</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-xs bg-muted px-2 py-1 rounded">VISA</span>
                                    <span className="text-xs bg-muted px-2 py-1 rounded">MC</span>
                                    <span className="text-xs bg-muted px-2 py-1 rounded">KNET</span>
                                </div>
                            </div>

                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'knet' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="knet" id="knet" />
                                    <div>
                                        <Label htmlFor="knet" className="font-semibold">KNET</Label>
                                        <p className="text-sm text-muted-foreground">Pay with KNET debit cards</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="cod" id="cod" />
                                    <div>
                                        <Label htmlFor="cod" className="font-semibold">Cash on Delivery</Label>
                                        <p className="text-sm text-muted-foreground">Pay when you receive</p>
                                    </div>
                                </div>
                                <span className="text-sm text-muted-foreground">+KWD 2.00</span>
                            </div>
                        </div>
                    </RadioGroup>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm">
                            <Shield className="w-4 h-4 text-primary" />
                            <span className="font-medium">Secure Payment</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
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
                    <Card className="glass-light dark:glass-dark">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary" />
                                Shipping Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">
                                {shippingAddress.firstName} {shippingAddress.lastName}<br />
                                {shippingAddress.address}<br />
                                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                                {shippingAddress.country}<br />
                                {shippingAddress.email}<br />
                                {shippingAddress.phone}
                            </p>
                            <Button variant="link" size="sm" onClick={() => setCurrentStep('information')} className="mt-2 p-0">
                                Edit
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="glass-light dark:glass-dark">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="w-5 h-5 text-primary" />
                                Shipping Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm capitalize">{shippingMethod} Shipping</p>
                            <Button variant="link" size="sm" onClick={() => setCurrentStep('shipping')} className="mt-2 p-0">
                                Edit
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="glass-light dark:glass-dark">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-primary" />
                                Payment Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}</p>
                            <Button variant="link" size="sm" onClick={() => setCurrentStep('payment')} className="mt-2 p-0">
                                Edit
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="glass-strong">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded bg-muted"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">KWD {(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}

                            <Separator />

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>KWD {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `KWD ${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax (10%)</span>
                                    <span>KWD {tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary">KWD {total.toFixed(2)}</span>
                            </div>

                            <Button
                                className="w-full btn-industrial-glow"
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

                            <p className="text-xs text-center text-muted-foreground">
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
            <div className="min-h-screen bg-background py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p>Loading cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-6xl mx-auto px-4">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/cart')}>Cart</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>Checkout</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

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
                        >
                            Back
                        </Button>
                        <Button className="btn-industrial-glow" onClick={handleNextStep}>
                            Continue
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
