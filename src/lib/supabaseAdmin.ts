import 'server-only'
import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client using the Service Role key.
 *
 * IMPORTANT:
 * - Never expose the service role key to the browser.
 * - Keep initialization lazy (inside a function) so builds don't fail when env vars
 *   are not present in certain environments.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SECRET_KEY

  if (!url) throw new Error('Missing SUPABASE_URL')
  if (!serviceKey) throw new Error('Missing SUPABASE_SECRET_KEY')

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}