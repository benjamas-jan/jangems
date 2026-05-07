import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Server-side Supabase client. Uses the service_role key, which bypasses RLS.
// Never call this from a Client Component or expose the result to the browser —
// the file is marked `server-only` and will throw if imported in client code.

let cached: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  if (!key) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');

  cached = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return cached;
}
