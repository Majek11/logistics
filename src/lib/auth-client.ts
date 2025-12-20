import { createBrowserClient } from '@supabase/ssr';

/**
 * Create a Supabase client for browser-side operations
 * Use in Client Components
 */
export function createBrowserSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Only validate in browser context to avoid build-time errors
    if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
        throw new Error(
            'Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
        );
    }

    return createBrowserClient(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseAnonKey || 'placeholder-key'
    );
}
