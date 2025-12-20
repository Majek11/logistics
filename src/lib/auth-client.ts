import { createBrowserClient } from '@supabase/ssr';

/**
 * Create a Supabase client for browser-side operations
 * Use in Client Components
 */
export function createBrowserSupabaseClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    );
}
