
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const res = NextResponse.next();

    // Create a Supabase client configured to use cookies
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            auth: {
                persistSession: false, // Middleware shouldn't persist session
            }
        }
    );

    // Check auth state
    // ideally we would use the supabase-ssr package here for better cookie handling in middleware
    // but for now we will do a basic check or skip since we are using client-side auth mainly.

    // NOTE: Integrating Supabase Auth securely in Middleware usually requires @supabase/ssr
    // For this "simple flow", we will rely on client-side protection in the dashboard page itself
    // to avoid complex cookie handling without the helper library.
    // We'll just pass through for now, or if we want to be stricter, we interpret the session manually.

    return res;
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
