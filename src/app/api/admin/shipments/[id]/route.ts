import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import { shipmentSchema } from '@/lib/validations';
import type { Shipment } from '@/lib/types';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

// GET - Get single shipment
export async function GET(
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

        const { data, error } = await supabaseAdmin
            .from('shipments')
            .select('*, tracking_events(*)')
            .eq('id', id)
            .single();

        if (error || !data) {
            return NextResponse.json(
                { error: 'Shipment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Shipment GET error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update shipment
export async function PUT(
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

        // Validate input (partial update)
        const validatedData = shipmentSchema.partial().parse(body);

        // Update shipment
        const { data, error } = await supabaseAdmin
            .from('shipments')
            .update({
                ...validatedData,
                ...(body.status && { status: body.status }),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating shipment:', error);
            return NextResponse.json(
                { error: 'Failed to update shipment' },
                { status: 500 }
            );
        }

        return NextResponse.json(data as Shipment);
    } catch (error) {
        console.error('Shipment update error:', error);

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

// DELETE - Delete shipment
export async function DELETE(
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

        const { error } = await supabaseAdmin
            .from('shipments')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting shipment:', error);
            return NextResponse.json(
                { error: 'Failed to delete shipment' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Shipment delete error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
