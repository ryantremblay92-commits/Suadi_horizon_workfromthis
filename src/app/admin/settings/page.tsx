"use client";

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    Palette
} from 'lucide-react';

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        toast.success('Settings saved successfully');
    };

    return (
        <AdminLayout title="Settings" description="Configure your application">
            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-gray-800 border-gray-700">
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
                    <TabsTrigger value="email" className="data-[state=active]:bg-primary">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white">General Settings</CardTitle>
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
                                        defaultValue="MachineHub"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="appUrl" className="text-gray-300">Application URL</Label>
                                    <Input
                                        id="appUrl"
                                        defaultValue="https://machinehub.com"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail" className="text-gray-300">Support Email</Label>
                                    <Input
                                        id="supportEmail"
                                        type="email"
                                        defaultValue="support@machinehub.com"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency" className="text-gray-300">Default Currency</Label>
                                    <Input
                                        id="currency"
                                        defaultValue="USD"
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
                            <CardTitle className="text-white">Notification Settings</CardTitle>
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
                            <CardTitle className="text-white">Security Settings</CardTitle>
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

                {/* Email Settings */}
                <TabsContent value="email">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white">Email Configuration</CardTitle>
                            <CardDescription className="text-gray-400">
                                Configure SMTP and email settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="smtpHost" className="text-gray-300">SMTP Host</Label>
                                    <Input
                                        id="smtpHost"
                                        defaultValue="smtp.example.com"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpPort" className="text-gray-300">SMTP Port</Label>
                                    <Input
                                        id="smtpPort"
                                        type="number"
                                        defaultValue="587"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpUser" className="text-gray-300">SMTP Username</Label>
                                    <Input
                                        id="smtpUser"
                                        defaultValue="noreply@machinehub.com"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpPass" className="text-gray-300">SMTP Password</Label>
                                    <Input
                                        id="smtpPass"
                                        type="password"
                                        defaultValue="********"
                                        className="bg-gray-700 border-gray-600 text-white"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button className="bg-primary hover:bg-primary/90">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Test Email
                                </Button>
                                <Button onClick={handleSave} disabled={loading} variant="outline" className="border-gray-700 text-gray-300">
                                    <Save className="h-4 w-4 mr-2" />
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}
