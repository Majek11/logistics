import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Validate that we have the required environment variables at runtime
function validateEnvVars() {
    if (typeof window !== 'undefined' || process.env.NODE_ENV !== 'production') {
        // Only validate in browser or non-production builds
        if (!supabaseUrl || !supabaseAnonKey) {
            console.warn('Missing Supabase environment variables. Please configure them in your environment.');
        }
    }
}

// Client for browser/frontend use
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        }
    }
);

// Admin client for server-side operations (uses service role key)
export const supabaseAdmin = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseServiceRoleKey || supabaseAnonKey || 'placeholder-key',
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

// Run validation
validateEnvVars();
