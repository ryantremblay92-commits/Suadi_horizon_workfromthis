"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Cookie, Save, Eye, EyeOff, RefreshCw, BarChart3 } from 'lucide-react';

interface CookieConsentSettings {
    enabled: boolean;
    necessaryOnly: boolean;
    analytics: boolean;
    marketing: boolean;
    position: string;
    expiration: number;
}

interface CookieStatistics {
    totalConsents: number;
    analyticsOptIns: number;
    marketingOptIns: number;
    acceptanceRate: number;
}

export default function AdminCookieConsentPage() {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<CookieConsentSettings>({
        enabled: true,
        necessaryOnly: false,
        analytics: true,
        marketing: false,
        position: 'bottom',
        expiration: 365
    });
    const [statistics, setStatistics] = useState<CookieStatistics>({
        totalConsents: 0,
        analyticsOptIns: 0,
        marketingOptIns: 0,
        acceptanceRate: 0
    });

    // Load settings and statistics on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/cookie-consent');
            if (response.ok) {
                const data = await response.json();
                if (data.settings) {
                    setSettings(prev => ({
                        ...prev,
                        ...data.settings
                    }));
                }
                if (data.statistics) {
                    setStatistics(data.statistics);
                }
            }
        } catch (error) {
            console.error('Error loading cookie consent data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch('/api/cookie-consent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                toast.success('Cookie consent settings saved successfully');
                loadData(); // Reload to get updated statistics
            } else {
                toast.error('Failed to save settings');
            }
        } catch (error) {
            console.error('Error saving cookie consent settings:', error);
            toast.error('Error saving settings');
        } finally {
            setSaving(false);
        }
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
                        <Button onClick={handleSave} disabled={saving} className="w-full bg-primary hover:bg-primary/90">
                            <Save className="h-4 w-4 mr-2" />
                            {saving ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center justify-between">
                            <span className="flex items-center">
                                <BarChart3 className="h-5 w-5 mr-2" />
                                Cookie Statistics
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={loadData}
                                disabled={loading}
                                className="text-gray-400 hover:text-white"
                            >
                                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            </Button>
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Cookie consent analytics from your visitors
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-background/50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-white">{statistics.totalConsents}</p>
                                <p className="text-sm text-gray-400">Total Consents</p>
                            </div>
                            <div className="bg-background/50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-white">{statistics.acceptanceRate}%</p>
                                <p className="text-sm text-gray-400">Acceptance Rate</p>
                            </div>
                            <div className="bg-background/50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-white">{statistics.analyticsOptIns}</p>
                                <p className="text-sm text-gray-400">Analytics Opt-ins</p>
                            </div>
                            <div className="bg-background/50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-white">{statistics.marketingOptIns}</p>
                                <p className="text-sm text-gray-400">Marketing Opt-ins</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 pt-6">
                            <h4 className="text-white font-medium mb-4">Live Preview</h4>
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-lg border border-gray-600">
                                {/* Banner Preview */}
                                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Cookie className="w-4 h-4 text-amber-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium mb-1">We value your privacy</p>
                                            <p className="text-gray-400 text-xs mb-2">
                                                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                <Button
                                                    size="sm"
                                                    className="bg-amber-500 hover:bg-amber-600 text-gray-900 text-xs h-7"
                                                >
                                                    Accept All
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-gray-600 text-gray-300 text-xs h-7"
                                                >
                                                    Reject Non-Essential
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-gray-600 text-gray-300 text-xs h-7"
                                                >
                                                    Customize
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 text-center">
                                    This is how your cookie banner appears on the site
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 pt-6">
                            <h4 className="text-white font-medium mb-2">Quick Links</h4>
                            <div className="flex flex-wrap gap-2">
                                <a
                                    href="/cookie-policy"
                                    target="_blank"
                                    className="text-amber-500 hover:text-amber-400 text-sm underline"
                                >
                                    View Cookie Policy Page
                                </a>
                                <span className="text-gray-600">|</span>
                                <a
                                    href="/"
                                    target="_blank"
                                    className="text-amber-500 hover:text-amber-400 text-sm underline"
                                >
                                    View Live Site
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
