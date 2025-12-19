import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import { trackingEventSchema } from '@/lib/validations';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

// POST - Add tracking event to shipment
export async function POST(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        // Check authentication
        const supabase = await createServerSupabaseClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Validate input
        const validatedData = trackingEventSchema.parse(body);

        // Create tracking event
        const { data, error } = await supabaseAdmin
            .from('tracking_events')
            .insert({
                shipment_id: id,
                location: validatedData.location,
                status: validatedData.status,
                description: validatedData.description,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating tracking event:', error);
            return NextResponse.json(
                { error: 'Failed to create tracking event' },
                { status: 500 }
            );
        }

        // Update shipment's current location and status
        await supabaseAdmin
            .from('shipments')
            .update({
                current_location: validatedData.location,
                status: validatedData.status,
            })
            .eq('id', id);

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Tracking event creation error:', error);

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Invalid input data' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
