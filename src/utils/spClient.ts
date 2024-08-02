
import { SUPABASE_URL_CLIENT, SUPABASE_NON_KEY_URL } from '@/constants'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabaseClient = createClient(SUPABASE_URL_CLIENT, SUPABASE_NON_KEY_URL)