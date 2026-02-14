"use client";

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Cookie, Save, Eye, EyeOff } from 'lucide-react';

export default function AdminCookieConsentPage() {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        enabled: true,
        necessaryOnly: false,
        analytics: true,
        marketing: false,
        position: 'bottom',
        expiration: 365
    });

    const handleSave = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        toast.success('Cookie consent settings saved');
    };

    return (
        <AdminLayout title="Cookie Consent" description="Configure cookie consent settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center">
                            <Cookie className="h-5 w-5 mr-2" />
                            Cookie Settings
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Configure which cookies are used on your site
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-medium">Enable Cookie Consent</p>
                                <p className="text-sm text-gray-400">Show cookie consent banner</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.enabled}
                                onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                                className="h-4 w-4 text-primary"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-medium">Necessary Cookies Only</p>
                                <p className="text-sm text-gray-400">Only use essential cookies</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.necessaryOnly}
                                onChange={(e) => setSettings({ ...settings, necessaryOnly: e.target.checked })}
                                className="h-4 w-4 text-primary"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-medium">Analytics Cookies</p>
                                <p className="text-sm text-gray-400">Track visitor behavior</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.analytics}
                                onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                                className="h-4 w-4 text-primary"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-medium">Marketing Cookies</p>
                                <p className="text-sm text-gray-400">Personalized advertisements</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.marketing}
                                onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                                className="h-4 w-4 text-primary"
                            />
                        </div>
                        <Button onClick={handleSave} disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                            <Save className="h-4 w-4 mr-2" />
                            {loading ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Cookie Statistics</CardTitle>
                        <CardDescription className="text-gray-400">
                            Cookie consent analytics
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-background/50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-white">0</p>
                                <p className="text-sm text-gray-400">Total Consents</p>
                            </div>
                            <div className="bg-background/50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-white">0%</p>
                                <p className="text-sm text-gray-400">Acceptance Rate</p>
                            </div>
                            <div className="bg-background/50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-white">0</p>
                                <p className="text-sm text-gray-400">Analytics Opt-ins</p>
                            </div>
                            <div className="bg-background/50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-white">0</p>
                                <p className="text-sm text-gray-400">Marketing Opt-ins</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 pt-6">
                            <h4 className="text-white font-medium mb-4">Preview</h4>
                            <div className="bg-background/50 p-4 rounded-lg border border-gray-700">
                                <p className="text-sm text-gray-400 mb-3">
                                    We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.
                                </p>
                                <div className="flex gap-2">
                                    <Button size="sm" className="bg-primary">Accept All</Button>
                                    <Button size="sm" variant="outline" className="border-gray-600">Reject</Button>
                                    <Button size="sm" variant="outline" className="border-gray-600">Settings</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
