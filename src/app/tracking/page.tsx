"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TrackingResults from "@/components/TrackingResults";
import type { TrackingResponse } from '@/lib/types';

const trackingFormSchema = z.object({
    tracking_number: z.string().min(1, 'Tracking number is required'),
    origin: z.string().min(1, 'Origin is required'),
    date: z.string().min(1, 'Date is required'),
});

type TrackingFormData = z.infer<typeof trackingFormSchema>;

export default function TrackingPage() {
    const [trackingResult, setTrackingResult] = useState<TrackingResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TrackingFormData>({
        resolver: zodResolver(trackingFormSchema),
    });

    const onSubmit = async (data: TrackingFormData) => {
        setIsLoading(true);
        setTrackingResult(null);

        try {
            const response = await fetch('/api/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result: TrackingResponse = await response.json();

            if (result.success) {
                setTrackingResult(result);
                toast.success('Shipment found!');
            } else {
                toast.error(result.error || 'Shipment not found');
                setTrackingResult(result);
            }
        } catch (error) {
            console.error('Tracking error:', error);
            toast.error('Failed to track shipment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Toaster position="top-right" />
            <Navbar />
            <PageHeader
                title="Track Shipment"
                description="Real-time visibility for your cargo. Enter your tracking number to get the latest status updates."
            />

            <div className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    {/* Tracking Form */}
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-3xl mx-auto -mt-32 relative z-30">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group text-left">
                                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                                        Origin
                                    </label>
                                    <div className="relative">
                                        <MapPin
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                            size={20}
                                        />
                                        <select
                                            {...register('origin')}
                                            className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all appearance-none cursor-pointer font-medium"
                                        >
                                            <option value="">Select origin</option>
                                            <option>Nigeria</option>
                                            <option>UK</option>
                                            <option>USA</option>
                                        </select>
                                    </div>
                                    {errors.origin && (
                                        <p className="mt-2 text-sm text-red-600">{errors.origin.message}</p>
                                    )}
                                </div>

                                <div className="relative group text-left">
                                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                                        Date
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            type="date"
                                            {...register('date')}
                                            className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all font-medium"
                                        />
                                    </div>
                                    {errors.date && (
                                        <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="relative group text-left">
                                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                                    Tracking Number
                                </label>
                                <input
                                    type="text"
                                    {...register('tracking_number')}
                                    placeholder="e.g. TRK-20231219-1234"
                                    className="w-full h-14 pl-6 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all font-medium text-lg"
                                />
                                {errors.tracking_number && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.tracking_number.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-16 bg-[#E55D2C] hover:bg-[#ff4444] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Tracking...' : 'Track Shipment'}
                                {!isLoading && <ArrowRight size={24} />}
                            </button>
                        </form>
                    </div>

                    {/* Tracking Results */}
                    {trackingResult && <TrackingResults result={trackingResult} />}

                    {/* Additional Info */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                <MapPin size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">
                                Real-time Tracking
                            </h3>
                            <p className="text-gray-500">
                                Monitor your shipment's location 24/7 with our advanced GPS systems.
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <Calendar size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">
                                Estimated Delivery
                            </h3>
                            <p className="text-gray-500">
                                Get accurate delivery estimates and delay notifications instantly.
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                                <ArrowRight size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">
                                Proof of Delivery
                            </h3>
                            <p className="text-gray-500">
                                Digital signatures and photo proof upon successful delivery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
