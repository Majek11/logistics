"use client";

import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import type { TrackingEvent } from '@/lib/types';

interface TrackingTimelineProps {
    events: TrackingEvent[];
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
    if (!events || events.length === 0) {
        return (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Tracking History</h3>
                <p className="text-gray-500">No tracking events available yet.</p>
            </div>
        );
    }

    // Reverse to show newest first
    const sortedEvents = [...events].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Tracking History</h3>

            <div className="space-y-6">
                {sortedEvents.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex gap-4"
                    >
                        {/* Timeline line */}
                        {index < sortedEvents.length - 1 && (
                            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                        )}

                        {/* Icon */}
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${index === 0
                                    ? 'bg-[#E55D2C] text-white'
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                        >
                            <MapPin size={20} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-8">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800">
                                        {event.status}
                                    </h4>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                        <MapPin size={14} />
                                        {event.location}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock size={14} />
                                    {formatDateTime(event.timestamp)}
                                </div>
                            </div>
                            <p className="text-gray-600">{event.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
