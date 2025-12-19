import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { trackingSchema } from '@/lib/validations';
import type { TrackingResponse, Shipment, TrackingEvent } from '@/lib/types';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = trackingSchema.parse(body);

        // Query shipment by tracking number
        const { data: shipment, error: shipmentError } = await supabase
            .from('shipments')
            .select('*')
            .eq('tracking_number', validatedData.tracking_number)
            .single();

        if (shipmentError || !shipment) {
            return NextResponse.json<TrackingResponse>(
                { success: false, error: 'Shipment not found. Please check your tracking number.' },
                { status: 404 }
            );
        }

        // Verify origin matches (additional security check)
        if (shipment.origin.toLowerCase() !== validatedData.origin.toLowerCase()) {
            return NextResponse.json<TrackingResponse>(
                { success: false, error: 'Origin does not match our records.' },
                { status: 400 }
            );
        }

        // Fetch tracking events
        const { data: events, error: eventsError } = await supabase
            .from('tracking_events')
            .select('*')
            .eq('shipment_id', shipment.id)
            .order('timestamp', { ascending: false });

        if (eventsError) {
            console.error('Error fetching tracking events:', eventsError);
        }

        const response: TrackingResponse = {
            success: true,
            shipment: {
                ...shipment as Shipment,
                tracking_events: (events as TrackingEvent[]) || [],
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Tracking error:', error);

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json<TrackingResponse>(
                { success: false, error: 'Invalid input data' },
                { status: 400 }
            );
        }

        return NextResponse.json<TrackingResponse>(
            { success: false, error: 'An error occurred while tracking your shipment' },
            { status: 500 }
        );
    }
}
