import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import User from '@/lib/db/models/User';
import bcrypt from 'bcrypt';

export async function GET() {
    try {
        await connectDB();

        const adminEmail = 'admin@example.com';
        const adminPassword = 'admin'; // Simple password for development

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            // Update role to admin just in case
            existingAdmin.role = 'admin';
            await existingAdmin.save();
            return NextResponse.json({ message: 'Admin user updated', email: adminEmail });
        }

        // Create new admin user
        // Note: The pre-save hook in User model handles password hashing
        const newAdmin = new User({
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
        });

        await newAdmin.save();

        return NextResponse.json({
            message: 'Admin user created successfully',
            email: adminEmail,
            password: adminPassword
        });

    } catch (error: any) {
        console.error('Error creating admin user:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create admin user' },
            { status: 500 }
        );
    }
}
