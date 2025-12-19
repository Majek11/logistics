"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { shipmentSchema, trackingEventSchema } from '@/lib/validations';
import { formatDate } from '@/lib/utils';
import TrackingTimeline from '@/components/TrackingTimeline';
import type { Shipment, TrackingEventFormData } from '@/lib/types';

export default function EditShipmentPage() {
    const params = useParams();
    const router = useRouter();
    const [shipment, setShipment] = useState<Shipment & { tracking_events?: any[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showEventForm, setShowEventForm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(shipmentSchema),
    });

    const {
        register: registerEvent,
        handleSubmit: handleEventSubmit,
        formState: { errors: eventErrors },
        reset: resetEventForm,
    } = useForm<TrackingEventFormData>({
        resolver: zodResolver(trackingEventSchema),
    });

    useEffect(() => {
        fetchShipment();
    }, [params.id]);

    const fetchShipment = async () => {
        try {
            const response = await fetch(`/api/admin/shipments/${params.id}`);
            const data = await response.json();
            setShipment(data);
            reset(data);
        } catch (error) {
            console.error('Error fetching shipment:', error);
            toast.error('Failed to load shipment');
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/admin/shipments/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success('Shipment updated successfully!');
                fetchShipment();
            } else {
                toast.error('Failed to update shipment');
            }
        } catch (error) {
            console.error('Error updating shipment:', error);
            toast.error('An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const onAddEvent = async (data: TrackingEventFormData) => {
        try {
            const response = await fetch(`/api/admin/shipments/${params.id}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success('Tracking event added!');
                setShowEventForm(false);
                resetEventForm();
                fetchShipment();
            } else {
                toast.error('Failed to add tracking event');
            }
        } catch (error) {
            console.error('Error adding event:', error);
            toast.error('An error occurred');
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this shipment?')) return;

        try {
            const response = await fetch(`/api/admin/shipments/${params.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Shipment deleted');
                router.push('/admin/shipments');
            } else {
                toast.error('Failed to delete shipment');
            }
        } catch (error) {
            console.error('Error deleting shipment:', error);
            toast.error('An error occurred');
        }
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!shipment) {
        return <div className="p-8">Shipment not found</div>;
    }

    return (
        <div>
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/shipments"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {shipment.tracking_number}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Created {formatDate(shipment.created_at)}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all font-semibold"
                >
                    <Trash2 size={20} />
                    Delete
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Shipment Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Shipment Details
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                {...register('customer_name')}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 text-gray-900"
                            />
                            {errors.customer_name && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.customer_name.message?.toString()}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Origin
                                </label>
                                <select
                                    {...register('origin')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
                                >
                                    <option>Nigeria</option>
                                    <option>UK</option>
                                    <option>USA</option>
                                    <option>Ghana</option>
                                    <option>Kenya</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Destination
                                </label>
                                <select
                                    {...register('destination')}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
                                >
                                    <option>Nigeria</option>
                                    <option>UK</option>
                                    <option>USA</option>
                                    <option>Ghana</option>
                                    <option>Kenya</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Current Location
                            </label>
                            <input
                                type="text"
                                {...register('current_location')}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Estimated Delivery
                            </label>
                            <input
                                type="date"
                                {...register('estimated_delivery')}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-[#E55D2C] text-white px-6 py-3 rounded-xl hover:bg-[#ff4444] transition-all font-semibold w-full justify-center disabled:opacity-50"
                        >
                            <Save size={20} />
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>

                {/* Tracking Events */}
                <div className="space-y-6">
                    {/* Add Event */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Tracking Events</h2>
                            <button
                                onClick={() => setShowEventForm(!showEventForm)}
                                className="flex items-center gap-2 bg-[#E55D2C] text-white px-4 py-2 rounded-xl hover:bg-[#ff4444] transition-all font-semibold"
                            >
                                <Plus size={18} />
                                Add Event
                            </button>
                        </div>

                        {showEventForm && (
                            <form onSubmit={handleEventSubmit(onAddEvent)} className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        {...registerEvent('location')}
                                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900"
                                        placeholder="Lagos, Nigeria"
                                    />
                                    {eventErrors.location && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {eventErrors.location.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        {...registerEvent('status')}
                                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900"
                                    >
                                        <option value="">Select status</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="PICKED_UP">Picked Up</option>
                                        <option value="IN_TRANSIT">In Transit</option>
                                        <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                                        <option value="DELIVERED">Delivered</option>
                                    </select>
                                    {eventErrors.status && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {eventErrors.status.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        {...registerEvent('description')}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900"
                                        placeholder="Package arrived at sorting facility"
                                    />
                                    {eventErrors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {eventErrors.description.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowEventForm(false)}
                                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 font-semibold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 rounded-xl bg-[#E55D2C] hover:bg-[#ff4444] text-white font-semibold"
                                    >
                                        Add Event
                                    </button>
                                </div>
                            </form>
                        )}

                        {shipment.tracking_events && shipment.tracking_events.length > 0 ? (
                            <TrackingTimeline events={shipment.tracking_events} />
                        ) : (
                            <p className="text-gray-500 text-center py-8">
                                No tracking events yet
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
