import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from 'date-fns';
import type { ShipmentStatus } from './types';

// Utility for className merging
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Generate tracking number: TRK-YYYYMMDD-XXXX
export function generateTrackingNumber(): string {
    const date = new Date();
    const dateStr = format(date, 'yyyyMMdd');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TRK-${dateStr}-${random}`;
}

// Format date for display
export function formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'N/A';
    try {
        return format(new Date(date), 'MMM dd, yyyy');
    } catch {
        return 'Invalid date';
    }
}

// Format datetime with time
export function formatDateTime(date: string | Date | null | undefined): string {
    if (!date) return 'N/A';
    try {
        return format(new Date(date), 'MMM dd, yyyy HH:mm');
    } catch {
        return 'Invalid date';
    }
}

// Get status badge color
export function getStatusColor(status: ShipmentStatus): string {
    const colors: Record<ShipmentStatus, string> = {
        PENDING: 'bg-gray-100 text-gray-800 border-gray-300',
        PICKED_UP: 'bg-blue-100 text-blue-800 border-blue-300',
        IN_TRANSIT: 'bg-purple-100 text-purple-800 border-purple-300',
        OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-800 border-orange-300',
        DELIVERED: 'bg-green-100 text-green-800 border-green-300',
        CANCELLED: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status] || colors.PENDING;
}

// Get status display text
export function getStatusText(status: ShipmentStatus): string {
    const text: Record<ShipmentStatus, string> = {
        PENDING: 'Pending Pickup',
        PICKED_UP: 'Picked Up',
        IN_TRANSIT: 'In Transit',
        OUT_FOR_DELIVERY: 'Out for Delivery',
        DELIVERED: 'Delivered',
        CANCELLED: 'Cancelled',
    };
    return text[status] || status;
}

// Calculate progress percentage for shipment
export function getShipmentProgress(status: ShipmentStatus): number {
    const progress: Record<ShipmentStatus, number> = {
        PENDING: 0,
        PICKED_UP: 25,
        IN_TRANSIT: 50,
        OUT_FOR_DELIVERY: 75,
        DELIVERED: 100,
        CANCELLED: 0,
    };
    return progress[status] || 0;
}
