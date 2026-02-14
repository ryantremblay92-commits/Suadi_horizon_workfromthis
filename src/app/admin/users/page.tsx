"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Search,
    Filter,
    Plus,
    Eye,
    Edit,
    Shield,
    Mail,
    Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
    _id: string;
    email: string;
    name?: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    lastLoginAt?: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('accessToken');
            const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};

            const response = await fetch('/api/users', { headers });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || errorData.message || 'Failed to load users');
            }
            const data = await response.json();
            setUsers(data.users || []);
        } catch (err: any) {
            console.error('Failed to load users:', err);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const updateUserRole = async (userId: string, newRole: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            };

            const response = await fetch(`/api/users/${userId}/role`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ role: newRole })
            });

            if (!response.ok) {
                throw new Error('Failed to update user role');
            }

            toast.success('User role updated');
            loadUsers();
        } catch (err: any) {
            toast.error(err.message || 'Failed to update user role');
        }
    };

    const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
        try {
            const token = localStorage.getItem('accessToken');
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            };

            const response = await fetch(`/api/users/${userId}/status`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ isActive: !currentStatus })
            });

            if (!response.ok) {
                throw new Error('Failed to update user status');
            }

            toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
            loadUsers();
        } catch (err: any) {
            toast.error(err.message || 'Failed to update user status');
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout
            title="Users"
            description="Manage user accounts"
            onRefresh={loadUsers}
        >
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-gray-700 text-gray-300">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Users Table */}
            <div className="glass rounded-xl border border-white/10 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-slate-400">Loading users...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        User
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        Joined
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider font-display">
                                        Last Login
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider font-display">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center mr-3 border border-gold/20">
                                                        <span className="text-gold font-bold font-display">
                                                            {user.email.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium group-hover:text-gold transition-colors font-display">
                                                            {user.name || 'No name'}
                                                        </p>
                                                        <p className="text-slate-400 text-sm">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => updateUserRole(user._id, e.target.value)}
                                                    className="bg-navy border border-white/10 text-white text-sm rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="manager">Manager</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge className={user.isActive ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}>
                                                    {user.isActive ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-slate-400">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    <span className="text-sm">{formatDate(user.createdAt)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-slate-400 text-sm">
                                                    {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Never'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
                                                        <Shield className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={user.isActive ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-green-400 hover:text-green-300 hover:bg-green-500/10'}
                                                        onClick={() => toggleUserStatus(user._id, user.isActive)}
                                                    >
                                                        {user.isActive ? 'Disable' : 'Enable'}
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
