'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Package, MapPin, CreditCard, Bell, Settings, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getUserProfile, updateUserProfile } from '@/api/user';

export default function SettingsPage() {
    const router = useRouter();
    const { isAuthenticated, user, isInitialized } = useAuth();
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [profileData, setProfileData] = useState({
        name: user?.name || 'John Doe',
        email: user?.email || 'john@example.com',
        phone: '+1 234 567 8900',
        company: 'Construction Co.',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    React.useEffect(() => {
        if (isInitialized && !isAuthenticated) {
            router.push('/login?redirect=/account/settings');
        }
    }, [isAuthenticated, isInitialized, router]);

    if (!isInitialized || !isAuthenticated) {
        return null;
    }

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Profile updated successfully');
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }
        toast.success('Password updated successfully');
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-6xl mx-auto px-4">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => router.push('/account')}>Account</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>Settings</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="glass-light dark:glass-dark">
                            <CardHeader className="pb-4">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="text-center">{user?.name || 'Customer'}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/account')}>
                                    <User className="w-4 h-4 mr-2" />
                                    Overview
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/account/orders')}>
                                    <Package className="w-4 h-4 mr-2" />
                                    Orders
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/account/addresses')}>
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Addresses
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/account/payment')}>
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Payment Methods
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/account/notifications')}>
                                    <Bell className="w-4 h-4 mr-2" />
                                    Notifications
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/account/settings')}>
                                    <Settings className="w-4 h-4 mr-2" />
                                    Settings
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

                            {/* Tabs */}
                            <div className="flex gap-4 mb-6">
                                <Button
                                    variant={activeTab === 'profile' ? 'default' : 'outline'}
                                    onClick={() => setActiveTab('profile')}
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Profile
                                </Button>
                                <Button
                                    variant={activeTab === 'security' ? 'default' : 'outline'}
                                    onClick={() => setActiveTab('security')}
                                >
                                    <Lock className="w-4 h-4 mr-2" />
                                    Security
                                </Button>
                            </div>

                            {/* Profile Settings */}
                            {activeTab === 'profile' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Profile Information</CardTitle>
                                        <CardDescription>Update your account details</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input
                                                        id="name"
                                                        value={profileData.name}
                                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={profileData.email}
                                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <Input
                                                        id="phone"
                                                        value={profileData.phone}
                                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="company">Company</Label>
                                                    <Input
                                                        id="company"
                                                        value={profileData.company}
                                                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>
                                            <Button type="submit">Save Changes</Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Security Settings */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Change Password</CardTitle>
                                            <CardDescription>Update your password regularly for security</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                                <div>
                                                    <Label htmlFor="currentPassword">Current Password</Label>
                                                    <div className="relative mt-1">
                                                        <Input
                                                            id="currentPassword"
                                                            type={showCurrentPassword ? 'text' : 'password'}
                                                            value={passwordData.currentPassword}
                                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                            className="pr-10"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                                        >
                                                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="newPassword">New Password</Label>
                                                    <div className="relative mt-1">
                                                        <Input
                                                            id="newPassword"
                                                            type={showNewPassword ? 'text' : 'password'}
                                                            value={passwordData.newPassword}
                                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                            className="pr-10"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                                        >
                                                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                                    <Input
                                                        id="confirmPassword"
                                                        type="password"
                                                        value={passwordData.confirmPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <Button type="submit">Update Password</Button>
                                            </form>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Two-Factor Authentication</CardTitle>
                                            <CardDescription>Add an extra layer of security to your account</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Authenticator App</p>
                                                    <p className="text-sm text-muted-foreground">Use an authenticator app to generate codes</p>
                                                </div>
                                                <Button variant="outline">Enable</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
