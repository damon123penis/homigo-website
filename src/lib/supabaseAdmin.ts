import 'server-only'
import { createClient } from '@supabase/supabase-js'

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SECRET_KEY

  if (!url) throw new Error('Missing SUPABASE_URL')
  if (!serviceKey) throw new Error('Missing SUPABASE_SECRET_KEY')

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}