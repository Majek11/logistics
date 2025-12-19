import { z } from 'zod';

// Tracking form validation
export const trackingSchema = z.object({
    tracking_number: z.string()
        .min(1, 'Tracking number is required')
        .regex(/^TRK-\d{8}-\d{4}$/, 'Invalid tracking number format (TRK-YYYYMMDD-XXXX)'),
    origin: z.string().min(1, 'Origin is required'),
    date: z.string().min(1, 'Date is required'),
});

// Shipment creation/update validation
export const shipmentSchema = z.object({
    customer_name: z.string().min(1, 'Customer name is required'),
    customer_email: z.string().email('Invalid email').optional().or(z.literal('')),
    customer_phone: z.string().optional(),
    origin: z.string().min(1, 'Origin is required'),
    destination: z.string().min(1, 'Destination is required'),
    estimated_delivery: z.string().optional(),
    current_location: z.string().optional(),
});

// Tracking event validation
export const trackingEventSchema = z.object({
    location: z.string().min(1, 'Location is required'),
    status: z.string().min(1, 'Status is required'),
    description: z.string().min(1, 'Description is required'),
});

// Login validation
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
