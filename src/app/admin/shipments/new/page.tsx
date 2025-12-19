"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { shipmentSchema } from '@/lib/validations';
import type { ShipmentFormData } from '@/lib/types';

export default function NewShipmentPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShipmentFormData>({
        resolver: zodResolver(shipmentSchema),
    });

    const onSubmit = async (data: ShipmentFormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/admin/shipments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const shipment = await response.json();
                toast.success('Shipment created successfully!');
                router.push(`/admin/shipments/${shipment.id}`);
            } else {
                toast.error('Failed to create shipment');
            }
        } catch (error) {
            console.error('Error creating shipment:', error);
            toast.error('An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/shipments"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">New Shipment</h1>
                    <p className="text-gray-500 mt-1">Create a new shipment</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Customer Information */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Customer Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Customer Name *
                                </label>
                                <input
                                    type="text"
                                    {...register('customer_name')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all text-gray-900"
                                    placeholder="John Doe"
                                />
                                {errors.customer_name && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.customer_name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    {...register('customer_email')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all text-gray-900"
                                    placeholder="john@example.com"
                                />
                                {errors.customer_email && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.customer_email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone (Optional)
                                </label>
                                <input
                                    type="tel"
                                    {...register('customer_phone')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all text-gray-900"
                                    placeholder="+234 123 456 7890"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shipment Details */}
                    <div className="pt-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Shipment Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Origin *
                                </label>
                                <select
                                    {...register('origin')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all appearance-none cursor-pointer text-gray-900"
                                >
                                    <option value="">Select origin</option>
                                    <option>Nigeria</option>
                                    <option>UK</option>
                                    <option>USA</option>
                                    <option>Ghana</option>
                                    <option>Kenya</option>
                                </select>
                                {errors.origin && (
                                    <p className="mt-2 text-sm text-red-600">{errors.origin.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Destination *
                                </label>
                                <select
                                    {...register('destination')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all appearance-none cursor-pointer text-gray-900"
                                >
                                    <option value="">Select destination</option>
                                    <option>Nigeria</option>
                                    <option>UK</option>
                                    <option>USA</option>
                                    <option>Ghana</option>
                                    <option>Kenya</option>
                                </select>
                                {errors.destination && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.destination.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Current Location (Optional)
                                </label>
                                <input
                                    type="text"
                                    {...register('current_location')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all text-gray-900"
                                    placeholder="Lagos, Nigeria"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Estimated Delivery (Optional)
                                </label>
                                <input
                                    type="date"
                                    {...register('estimated_delivery')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all text-gray-900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-6 border-t border-gray-200 flex gap-4">
                        <Link
                            href="/admin/shipments"
                            className="px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all font-semibold"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-[#E55D2C] text-white px-6 py-3 rounded-xl hover:bg-[#ff4444] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save size={20} />
                            {isSubmitting ? 'Creating...' : 'Create Shipment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
