"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, TrendingUp, Truck, CheckCircle, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formatDate, getStatusColor, getStatusText } from '@/lib/utils';
import type { DashboardStats } from '@/lib/types';

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await fetch('/api/admin/dashboard');

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Dashboard API error:', response.status, errorText);
                throw new Error(`Failed to fetch dashboard data: ${response.status}`);
            }

            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            toast.error('Failed to load dashboard data. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl h-32"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            {/* Premium Welcome Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1221] to-[#1a2333] rounded-3xl p-8 mb-8 text-white shadow-lg">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                        <p className="text-gray-400">Welcome back, Admin! Here's what's happening today.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/admin/shipments/new"
                            className="flex items-center gap-2 bg-[#E55D2C] text-white px-6 py-3 rounded-xl hover:bg-[#ff4444] transition-all font-semibold shadow-lg shadow-orange-900/20"
                        >
                            <Plus size={20} />
                            New Shipment
                        </Link>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E55D2C] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Package className="text-blue-600" size={24} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-semibold mb-1">
                        Total Shipments
                    </h3>
                    <p className="text-3xl font-bold text-gray-900">
                        {stats?.total_shipments || 0}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-orange-600" size={24} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-semibold mb-1">Pending</h3>
                    <p className="text-3xl font-bold text-gray-900">
                        {stats?.pending || 0}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Truck className="text-purple-600" size={24} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-semibold mb-1">
                        In Transit
                    </h3>
                    <p className="text-3xl font-bold text-gray-900">
                        {stats?.in_transit || 0}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-semibold mb-1">Delivered</h3>
                    <p className="text-3xl font-bold text-gray-900">
                        {stats?.delivered || 0}
                    </p>
                </div>
            </div>

            {/* Recent Shipments */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Recent Shipments</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Tracking Number
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Customer
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Route
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Created
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats?.recent_shipments && stats.recent_shipments.length > 0 ? (
                                stats.recent_shipments.map((shipment) => (
                                    <tr key={shipment.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm font-semibold text-gray-900">
                                                {shipment.tracking_number}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {shipment.customer_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {shipment.origin} → {shipment.destination}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(
                                                    shipment.status
                                                )}`}
                                            >
                                                {getStatusText(shipment.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {formatDate(shipment.created_at)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/admin/shipments/${shipment.id}`}
                                                className="text-[#E55D2C] hover:underline font-semibold text-sm"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No shipments yet.{' '}
                                        <Link
                                            href="/admin/shipments/new"
                                            className="text-[#E55D2C] hover:underline font-semibold"
                                        >
                                            Create your first shipment
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
