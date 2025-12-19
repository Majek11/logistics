import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import { shipmentSchema } from '@/lib/validations';
import { generateTrackingNumber } from '@/lib/utils';
import type { Shipment } from '@/lib/types';

// GET - List all shipments
export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const supabase = await createServerSupabaseClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = (page - 1) * limit;

        let query = supabaseAdmin
            .from('shipments')
            .select('*, tracking_events(*)', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        // Filter by status if provided
        if (status && status !== 'all') {
            query = query.eq('status', status.toUpperCase());
        }

        const { data, error, count } = await query;

        if (error) {
            console.error('Error fetching shipments:', error);
            return NextResponse.json(
                { error: 'Failed to fetch shipments' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            shipments: data,
            total: count,
            page,
            limit,
            totalPages: Math.ceil((count || 0) / limit),
        });
    } catch (error) {
        console.error('Shipments GET error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST - Create new shipment
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const supabase = await createServerSupabaseClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Validate input
        const validatedData = shipmentSchema.parse(body);

        // Generate tracking number
        const tracking_number = generateTrackingNumber();

        // Create shipment
        const { data, error } = await supabaseAdmin
            .from('shipments')
            .insert({
                tracking_number,
                origin: validatedData.origin,
                destination: validatedData.destination,
                customer_name: validatedData.customer_name,
                customer_email: validatedData.customer_email || null,
                customer_phone: validatedData.customer_phone || null,
                current_location: validatedData.current_location || validatedData.origin,
                estimated_delivery: validatedData.estimated_delivery || null,
                status: 'PENDING',
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating shipment:', error);
            return NextResponse.json(
                { error: 'Failed to create shipment' },
                { status: 500 }
            );
        }

        // Create initial tracking event
        await supabaseAdmin.from('tracking_events').insert({
            shipment_id: data.id,
            location: validatedData.origin,
            status: 'PENDING',
            description: 'Shipment created and awaiting pickup',
        });

        return NextResponse.json(data as Shipment, { status: 201 });
    } catch (error) {
        console.error('Shipment creation error:', error);

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
