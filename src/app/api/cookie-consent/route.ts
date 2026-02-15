import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo (in production, use a database)
interface CookieConsentSettings {
    enabled: boolean;
    necessaryOnly: boolean;
    analytics: boolean;
    marketing: boolean;
    position: 'bottom' | 'top' | 'bottom-left' | 'bottom-right';
    expiration: number;
    lastUpdated: number;
}

interface ConsentRecord {
    id: string;
    timestamp: number;
    categories: {
        necessary: boolean;
        analytics: boolean;
        marketing: boolean;
        preferences: boolean;
    };
    userAgent?: string;
}

// In-memory storage
let consentSettings: CookieConsentSettings = {
    enabled: true,
    necessaryOnly: false,
    analytics: true,
    marketing: false,
    position: 'bottom',
    expiration: 365,
    lastUpdated: Date.now(),
};

let consentRecords: ConsentRecord[] = [];

// GET - Retrieve cookie consent settings
export async function GET() {
    try {
        // Calculate statistics
        const totalConsents = consentRecords.length;
        const analyticsOptIns = consentRecords.filter(c => c.categories.analytics).length;
        const marketingOptIns = consentRecords.filter(c => c.categories.marketing).length;
        const acceptanceRate = totalConsents > 0
            ? Math.round((consentRecords.filter(c => c.categories.analytics || c.categories.marketing).length / totalConsents) * 100)
            : 0;

        return NextResponse.json({
            settings: consentSettings,
            statistics: {
                totalConsents,
                analyticsOptIns,
                marketingOptIns,
                acceptanceRate,
            }
        });
    } catch (error) {
        console.error('Error getting cookie consent settings:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve settings' },
            { status: 500 }
        );
    }
}

// POST - Update cookie consent settings (admin)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        consentSettings = {
            ...consentSettings,
            ...body,
            lastUpdated: Date.now(),
        };

        return NextResponse.json({
            success: true,
            settings: consentSettings
        });
    } catch (error) {
        console.error('Error saving cookie consent settings:', error);
        return NextResponse.json(
            { error: 'Failed to save settings' },
            { status: 500 }
        );
    }
}

// PUT - Record a new consent (from frontend)
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        const record: ConsentRecord = {
            id: `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            categories: {
                necessary: body.necessary ?? true,
                analytics: body.analytics ?? false,
                marketing: body.marketing ?? false,
                preferences: body.preferences ?? false,
            },
            userAgent: request.headers.get('user-agent') || undefined,
        };

        consentRecords.push(record);

        return NextResponse.json({
            success: true,
            record
        });
    } catch (error) {
        console.error('Error recording consent:', error);
        return NextResponse.json(
            { error: 'Failed to record consent' },
            { status: 500 }
        );
    }
}

// DELETE - Reset all consent data (admin)
export async function DELETE() {
    try {
        consentRecords = [];

        return NextResponse.json({
            success: true,
            message: 'All consent records have been reset'
        });
    } catch (error) {
        console.error('Error resetting consent data:', error);
        return NextResponse.json(
            { error: 'Failed to reset data' },
            { status: 500 }
        );
    }
}
