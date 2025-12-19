"use client";

import { motion } from 'framer-motion';
import { Package, MapPin, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { formatDate, getStatusColor, getStatusText } from '@/lib/utils';
import TrackingTimeline from './TrackingTimeline';
import type { TrackingResponse } from '@/lib/types';

interface TrackingResultsProps {
    result: TrackingResponse;
}

export default function TrackingResults({ result }: TrackingResultsProps) {
    if (!result.success || !result.shipment) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-3xl mx-auto"
            >
                <div className="text-center">
                    <XCircle className="mx-auto text-red-500 mb-4" size={64} />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Shipment Not Found
                    </h3>
                    <p className="text-gray-600">
                        {result.error || 'Please check your tracking number and try again.'}
                    </p>
                </div>
            </motion.div>
        );
    }

    const { shipment } = result;
    const statusColor = getStatusColor(shipment.status);
    const statusText = getStatusText(shipment.status);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-6"
        >
            {/* Shipment Overview */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#E55D2C] rounded-2xl flex items-center justify-center">
                            <Package className="text-white" size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {shipment.tracking_number}
                            </h2>
                            <p className="text-gray-500">Tracking Number</p>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl border ${statusColor} font-semibold`}>
                        {statusText}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                        <MapPin className="text-gray-400 mt-1" size={20} />
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Origin</p>
                            <p className="text-lg font-bold text-gray-800">{shipment.origin}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MapPin className="text-gray-400 mt-1" size={20} />
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Destination</p>
                            <p className="text-lg font-bold text-gray-800">{shipment.destination}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Calendar className="text-gray-400 mt-1" size={20} />
                        <div>
                            <p className="text-sm font-semibold text-gray-500">
                                Estimated Delivery
                            </p>
                            <p className="text-lg font-bold text-gray-800">
                                {formatDate(shipment.estimated_delivery)}
                            </p>
                        </div>
                    </div>
                </div>

                {shipment.current_location && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-3">
                            <MapPin className="text-blue-600" size={20} />
                            <div>
                                <p className="text-sm font-semibold text-blue-600">
                                    Current Location
                                </p>
                                <p className="text-lg font-bold text-blue-900">
                                    {shipment.current_location}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {shipment.status === 'DELIVERED' && shipment.actual_delivery && (
                    <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-green-600" size={20} />
                            <div>
                                <p className="text-sm font-semibold text-green-600">
                                    Delivered on
                                </p>
                                <p className="text-lg font-bold text-green-900">
                                    {formatDate(shipment.actual_delivery)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Tracking Timeline */}
            <TrackingTimeline events={shipment.tracking_events} />
        </motion.div>
    );
}
