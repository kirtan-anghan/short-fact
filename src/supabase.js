
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ynqmownzhgfpnffdwhjc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlucW1vd256aGdmcG5mZmR3aGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMjM5MjcsImV4cCI6MTk5NjU5OTkyN30.c5k0kt8MxC8BQrB6kb1YaDsh6aUNh3u_Lw8hfUtGXLQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;