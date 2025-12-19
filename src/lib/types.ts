// Database Types

export type UserRole = 'ADMIN' | 'USER';

export type ShipmentStatus =
    | 'PENDING'
    | 'PICKED_UP'
    | 'IN_TRANSIT'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'CANCELLED';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
}

export interface Shipment {
    id: string;
    tracking_number: string;
    origin: string;
    destination: string;
    customer_name: string;
    customer_email?: string | null;
    customer_phone?: string | null;
    status: ShipmentStatus;
    current_location?: string | null;
    estimated_delivery?: string | null;
    actual_delivery?: string | null;
    created_at: string;
    updated_at: string;
}

export interface TrackingEvent {
    id: string;
    shipment_id: string;
    location: string;
    status: string;
    description: string;
    timestamp: string;
}

export interface SiteSetting {
    id: string;
    key: string;
    value: string;
    category: string;
    updated_at: string;
    updated_by?: string | null;
}

// API Response Types

export interface TrackingResponse {
    success: boolean;
    shipment?: Shipment & {
        tracking_events: TrackingEvent[];
    };
    error?: string;
}

export interface DashboardStats {
    total_shipments: number;
    pending: number;
    in_transit: number;
    delivered: number;
    recent_shipments: Shipment[];
}

// Form Types

export interface TrackingFormData {
    tracking_number: string;
    origin: string;
    date: string;
}

export interface ShipmentFormData {
    customer_name: string;
    customer_email?: string;
    customer_phone?: string;
    origin: string;
    destination: string;
    estimated_delivery?: string;
    current_location?: string;
}

export interface TrackingEventFormData {
    location: string;
    status: string;
    description: string;
}
