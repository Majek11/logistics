import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configure runtime for Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        // Get the secret key from request body
        const body = await request.json();
        const { secret } = body;

        // Simple protection - you should use a strong secret
        if (secret !== 'create-admin-user-2024') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceRoleKey) {
            return NextResponse.json(
                { error: 'Missing Supabase environment variables' },
                { status: 500 }
            );
        }

        // Create Supabase admin client
        const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        const email = 'admin@kennylogisticsservices.com';
        const password = 'password123';

        // Create the user with the admin client
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm the email
        });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Admin user created successfully',
            userId: data.user?.id,
            email,
            note: 'Remember to change the password after first login!'
        });
    } catch (error) {
        console.error('Error creating admin user:', error);
        return NextResponse.json(
            { error: 'Failed to create admin user' },
            { status: 500 }
        );
    }
}
