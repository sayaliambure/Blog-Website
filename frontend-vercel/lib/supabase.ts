import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wwsengotyokllxuzhgul.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3c2VuZ290eW9rbGx4dXpoZ3VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTEzNjUsImV4cCI6MjA2NTI4NzM2NX0.-uNNuAAugzQDVWcBpTihAqH05o0HeWKvcgEp4ND30Ic"

export const supabase = createClient(supabaseUrl, supabaseKey)
