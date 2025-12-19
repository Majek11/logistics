"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';
import { formatDate, getStatusColor, getStatusText } from '@/lib/utils';
import type { Shipment } from '@/lib/types';

export default function ShipmentsPage() {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchShipments();
    }, [statusFilter]);

    const fetchShipments = async () => {
        try {
            const url = `/api/admin/shipments?status=${statusFilter}`;
            const response = await fetch(url);
            const data = await response.json();
            setShipments(data.shipments || []);
        } catch (error) {
            console.error('Error fetching shipments:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredShipments = shipments.filter((shipment) =>
        shipment.tracking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Shipments</h1>
                    <p className="text-gray-500 mt-1">Manage all your shipments</p>
                </div>
                <Link
                    href="/admin/shipments/new"
                    className="flex items-center gap-2 bg-[#E55D2C] text-white px-6 py-3 rounded-xl hover:bg-[#ff4444] transition-all font-semibold"
                >
                    <Plus size={20} />
                    New Shipment
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search by tracking number or customer name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-12 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all appearance-none cursor-pointer font-medium"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="picked_up">Picked Up</option>
                            <option value="in_transit">In Transit</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Shipments Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
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
                                    Current Location
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
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <div className="animate-pulse">Loading shipments...</div>
                                    </td>
                                </tr>
                            ) : filteredShipments.length > 0 ? (
                                filteredShipments.map((shipment) => (
                                    <tr key={shipment.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm font-semibold text-gray-900">
                                                {shipment.tracking_number}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {shipment.customer_name}
                                                </p>
                                                {shipment.customer_email && (
                                                    <p className="text-xs text-gray-500">
                                                        {shipment.customer_email}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {shipment.origin} → {shipment.destination}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {shipment.current_location || 'N/A'}
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
                                                View / Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No shipments found.{' '}
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
