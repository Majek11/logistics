"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserSupabaseClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useState } from 'react';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Shipments', href: '/admin/shipments', icon: Package },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const supabase = createBrowserSupabaseClient();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                toast.error('Failed to log out');
                return;
            }
            toast.success('Logged out successfully');
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('An unexpected error occurred');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-[#0B1221] text-white">
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-2xl font-bold">Kenny Logistics</h1>
                    <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname?.startsWith(item.href);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                                    isActive
                                        ? 'bg-[#E55D2C] text-white'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                )}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
