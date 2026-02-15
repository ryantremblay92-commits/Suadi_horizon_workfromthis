"use client";

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
    Save,
    Globe,
    Bell,
    Shield,
    Database,
    Mail,
    Key,
    Palette,
    Store,
    Search,
    FileText,
    Clock,
    MapPin,
    Phone
} from 'lucide-react';

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);

    // Store Information State
    const [storeInfo, setStoreInfo] = useState({
        name: 'Saudi Horizon',
        tagline: 'Premium Heavy Equipment Parts Supplier',
        email: 'info@saudihorizon.com',
        phone: '+966 11 123 4567',
        whatsapp: '+966 50 123 4567',
        address: 'Riyadh, Saudi Arabia',
        businessHours: 'Sun-Thu: 8:00 AM - 6:00 PM',
        description: 'Leading supplier of genuine heavy equipment parts for Caterpillar, Komatsu, Volvo, and more.'
    });

    // SEO State
    const [seo, setSeo] = useState({
        metaTitle: 'Saudi Horizon - Heavy Equipment Parts Supplier',
        metaDescription: 'Genuine heavy equipment parts for Caterpillar, Komatsu, Volvo, and more. Fast delivery across Saudi Arabia.',
        keywords: 'heavy equipment parts, caterpillar parts, komatsu, volvo, excavator parts, dozer parts',
        ogImage: '/images/og-image.jpg'
    });

    // Content Management State
    const [content, setContent] = useState({
        heroTitle: 'Premium Heavy Equipment Parts',
        heroSubtitle: 'Genuine parts for Caterpillar, Komatsu, Volvo & more',
        heroCta: 'Request a Quote',
        featuresTitle: 'Why Choose Us',
        feature1Title: 'Genuine Parts',
        feature1Desc: '100% authentic OEM parts',
        feature2Title: 'Fast Delivery',
        feature2Desc: 'Across Saudi Arabia',
        feature3Title: 'Expert Support',
        feature3Desc: 'Technical expertise',
        footerAbout: 'Saudi Horizon is a leading supplier of heavy equipment parts in the Middle East.',
        footerContact: 'Contact us: info@saudihorizon.com'
    });

    const handleSave = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        toast.success('Settings saved successfully');
    };

    return (
        <AdminLayout title="Settings" description="Configure your application">
            <Tabs defaultValue="store" className="space-y-6">
                <TabsList className="bg-gray-800 border-gray-700 flex flex-wrap h-auto">
                    <TabsTrigger value="store" className="data-[state=active]:bg-primary">
                        <Store className="h-4 w-4 mr-2" />
                        Store
                    </TabsTrigger>
                    <TabsTrigger value="seo" className="data-[state=active]:bg-primary">
                        <Search className="h-4 w-4 mr-2" />
                        SEO
                    </TabsTrigger>
                    <TabsTrigger value="content" className="data-[state=active]:bg-primary">
                        <FileText className="h-4 w-4 mr-2" />
                        Content
                    </TabsTrigger>
                    <TabsTrigger value="general" className="data-[state=active]:bg-primary">
                        <Globe className="h-4 w-4 mr-2" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-primary">
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-primary">
                        <Shield className="h-4 w-4 mr-2" />
                        Security
                    </TabsTrigger>
                </TabsList>

                {/* Store Information */}
                <TabsContent value="store">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <Store className="h-5 w-5 mr-2" />
                                Store Information
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Manage your business information displayed to customers
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="storeName" className="text-gray-300">Store Name</Label>
                                    <Input
                                        id="storeName"
                                        value={storeInfo.name}
                                        onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tagline" className="text-gray-300">Tagline</Label>
                                    <Input
                                        id="tagline"
                                        value={storeInfo.tagline}
                                        onChange={(e) => setStoreInfo({ ...storeInfo, tagline: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="storeEmail" className="text-gray-300">Email</Label>
                                    <Input
                                        id="storeEmail"
                                        type="email"
                                        value={storeInfo.email}
                                        onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="storePhone" className="text-gray-300">Phone</Label>
                                    <Input
                                        id="storePhone"
                                        value={storeInfo.phone}
                                        onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp" className="text-gray-300">WhatsApp</Label>
                                    <Input
                                        id="whatsapp"
                                        value={storeInfo.whatsapp}
                                        onChange={(e) => setStoreInfo({ ...storeInfo, whatsapp: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="businessHours" className="text-gray-300">Business Hours</Label>
                                    <Input
                                        id="businessHours"
                                        value={storeInfo.businessHours}
                                        onChange={(e) => setStoreInfo({ ...storeInfo, businessHours: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address" className="text-gray-300">
                                        <MapPin className="h-4 w-4 inline mr-1" />
                                        Address
                                    </Label>
                                    <Input
                                        id="address"
                                        value={storeInfo.address}
                                        onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="storeDescription" className="text-gray-300">Description</Label>
                                    <Textarea
                                        id="storeDescription"
                                        value={storeInfo.description}
                                        onChange={(e) => setStoreInfo({ ...storeInfo, description: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? 'Saving...' : 'Save Store Info'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SEO Settings */}
                <TabsContent value="seo">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <Search className="h-5 w-5 mr-2" />
                                SEO Settings
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Optimize your site for search engines
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="metaTitle" className="text-gray-300">Meta Title</Label>
                                    <Input
                                        id="metaTitle"
                                        value={seo.metaTitle}
                                        onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                    <p className="text-xs text-gray-500">{seo.metaTitle.length}/60 characters</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="metaDescription" className="text-gray-300">Meta Description</Label>
                                    <Textarea
                                        id="metaDescription"
                                        value={seo.metaDescription}
                                        onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                        rows={3}
                                    />
                                    <p className="text-xs text-gray-500">{seo.metaDescription.length}/160 characters</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="keywords" className="text-gray-300">Keywords</Label>
                                    <Input
                                        id="keywords"
                                        value={seo.keywords}
                                        onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                        placeholder="Separate keywords with commas"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ogImage" className="text-gray-300">OG Image URL</Label>
                                    <Input
                                        id="ogImage"
                                        value={seo.ogImage}
                                        onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                            </div>
                            <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? 'Saving...' : 'Save SEO Settings'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Content Management */}
                <TabsContent value="content">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <FileText className="h-5 w-5 mr-2" />
                                Content Management
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Manage homepage and website content
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Hero Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Hero Section</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="heroTitle" className="text-gray-300">Hero Title</Label>
                                        <Input
                                            id="heroTitle"
                                            value={content.heroTitle}
                                            onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                                            className="bg-gray-700 border-gray-600 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="heroCta" className="text-gray-300">CTA Button Text</Label>
                                        <Input
                                            id="heroCta"
                                            value={content.heroCta}
                                            onChange={(e) => setContent({ ...content, heroCta: e.target.value })}
                                            className="bg-gray-700 border-gray-600 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="heroSubtitle" className="text-gray-300">Hero Subtitle</Label>
                                        <Textarea
                                            id="heroSubtitle"
                                            value={content.heroSubtitle}
                                            onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                                            className="bg-gray-700 border-gray-600 text-white"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Features Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Features Section</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2 p-4 bg-gray-700/50 rounded-lg">
                                        <Label className="text-gray-300">Feature 1</Label>
                                        <Input
                                            value={content.feature1Title}
                                            onChange={(e) => setContent({ ...content, feature1Title: e.target.value })}
                                            className="bg-gray-600 border-gray-500 text-white mb-2"
                                            placeholder="Title"
                                        />
                                        <Textarea
                                            value={content.feature1Desc}
                                            onChange={(e) => setContent({ ...content, feature1Desc: e.target.value })}
                                            className="bg-gray-600 border-gray-500 text-white"
                                            rows={2}
                                            placeholder="Description"
                                        />
                                    </div>
                                    <div className="space-y-2 p-4 bg-gray-700/50 rounded-lg">
                                        <Label className="text-gray-300">Feature 2</Label>
                                        <Input
                                            value={content.feature2Title}
                                            onChange={(e) => setContent({ ...content, feature2Title: e.target.value })}
                                            className="bg-gray-600 border-gray-500 text-white mb-2"
                                            placeholder="Title"
                                        />
                                        <Textarea
                                            value={content.feature2Desc}
                                            onChange={(e) => setContent({ ...content, feature2Desc: e.target.value })}
                                            className="bg-gray-600 border-gray-500 text-white"
                                            rows={2}
                                            placeholder="Description"
                                        />
                                    </div>
                                    <div className="space-y-2 p-4 bg-gray-700/50 rounded-lg">
                                        <Label className="text-gray-300">Feature 3</Label>
                                        <Input
                                            value={content.feature3Title}
                                            onChange={(e) => setContent({ ...content, feature3Title: e.target.value })}
                                            className="bg-gray-600 border-gray-500 text-white mb-2"
                                            placeholder="Title"
                                        />
                                        <Textarea
                                            value={content.feature3Desc}
                                            onChange={(e) => setContent({ ...content, feature3Desc: e.target.value })}
                                            className="bg-gray-600 border-gray-500 text-white"
                                            rows={2}
                                            placeholder="Description"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Footer Content</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="footerAbout" className="text-gray-300">About Text</Label>
                                        <Textarea
                                            id="footerAbout"
                                            value={content.footerAbout}
                                            onChange={(e) => setContent({ ...content, footerAbout: e.target.value })}
                                            className="bg-gray-700 border-gray-600 text-white"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="footerContact" className="text-gray-300">Contact Info</Label>
                                        <Input
                                            id="footerContact"
                                            value={content.footerContact}
                                            onChange={(e) => setContent({ ...content, footerContact: e.target.value })}
                                            className="bg-gray-700 border-gray-600 text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? 'Saving...' : 'Save Content'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* General Settings */}
                <TabsContent value="general">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <Globe className="h-5 w-5 mr-2" />
                                General Settings
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Configure basic application settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="appName" className="text-gray-300">Application Name</Label>
                                    <Input
                                        id="appName"
                                        defaultValue="Saudi Horizon"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="appUrl" className="text-gray-300">Application URL</Label>
                                    <Input
                                        id="appUrl"
                                        defaultValue="https://saudihorizon.com"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail" className="text-gray-300">Support Email</Label>
                                    <Input
                                        id="supportEmail"
                                        type="email"
                                        defaultValue="support@saudihorizon.com"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency" className="text-gray-300">Default Currency</Label>
                                    <Input
                                        id="currency"
                                        defaultValue="SAR"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
                                    <Input
                                        id="timezone"
                                        defaultValue="Asia/Riyadh"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="language" className="text-gray-300">Default Language</Label>
                                    <Input
                                        id="language"
                                        defaultValue="en"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                            </div>
                            <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <Bell className="h-5 w-5 mr-2" />
                                Notification Settings
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Configure email and push notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-medium">Order Notifications</p>
                                        <p className="text-sm text-gray-400">Receive email when new orders are placed</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-medium">Low Stock Alerts</p>
                                        <p className="text-sm text-gray-400">Get notified when products are running low</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-medium">New User Registrations</p>
                                        <p className="text-sm text-gray-400">Receive email for new user signups</p>
                                    </div>
                                    <input type="checkbox" className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-medium">Quote Requests</p>
                                        <p className="text-sm text-gray-400">Get notified for new quote requests</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="text-white font-medium">Marketing Emails</p>
                                        <p className="text-sm text-gray-400">Receive promotional offers and updates</p>
                                    </div>
                                    <input type="checkbox" className="h-4 w-4 text-primary" />
                                </div>
                            </div>
                            <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <Shield className="h-5 w-5 mr-2" />
                                Security Settings
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Configure security and authentication
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-medium">Two-Factor Authentication</p>
                                        <p className="text-sm text-gray-400">Require 2FA for admin accounts</p>
                                    </div>
                                    <input type="checkbox" className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-medium">Session Timeout</p>
                                        <p className="text-sm text-gray-400">Auto logout after inactivity</p>
                                    </div>
                                    <select className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2">
                                        <option>15 minutes</option>
                                        <option>30 minutes</option>
                                        <option>1 hour</option>
                                        <option>4 hours</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-medium">Password Policy</p>
                                        <p className="text-sm text-gray-400">Enforce strong password requirements</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="text-white font-medium">Login Attempts Lockout</p>
                                        <p className="text-sm text-gray-400">Lock account after failed login attempts</p>
                                    </div>
                                    <select className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2">
                                        <option>3 attempts</option>
                                        <option>5 attempts</option>
                                        <option>10 attempts</option>
                                    </select>
                                </div>
                            </div>
                            <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </AdminLayout>
    );
}
