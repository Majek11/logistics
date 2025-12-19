import type { ReactNode } from 'react';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata = {
    title: 'Admin Panel - Kenny Logistics',
    description: 'Admin dashboard for managing shipments',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar />
            <main className="flex-1 ml-64">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
