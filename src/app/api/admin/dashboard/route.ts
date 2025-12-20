import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import type { DashboardStats } from '@/lib/types';

// Configure runtime for Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Check authentication
        const supabase = await createServerSupabaseClient();
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
            console.error('Session error:', sessionError);
            return NextResponse.json({ error: 'Authentication error' }, { status: 401 });
        }

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get total shipments count
        const { count: totalCount } = await supabaseAdmin
            .from('shipments')
            .select('*', { count: 'exact', head: true });

        // Get counts by status
        const { count: pendingCount } = await supabaseAdmin
            .from('shipments')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'PENDING');

        const { count: inTransitCount } = await supabaseAdmin
            .from('shipments')
            .select('*', { count: 'exact', head: true })
            .in('status', ['PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY']);

        const { count: deliveredCount } = await supabaseAdmin
            .from('shipments')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'DELIVERED');

        // Get recent shipments
        const { data: recentShipments } = await supabaseAdmin
            .from('shipments')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        const stats: DashboardStats = {
            total_shipments: totalCount || 0,
            pending: pendingCount || 0,
            in_transit: inTransitCount || 0,
            delivered: deliveredCount || 0,
            recent_shipments: recentShipments || [],
        };

        return NextResponse.json(stats, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats' },
            { status: 500 }
        );
    }
}
