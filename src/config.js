export const config = {
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api', // for EC2 reverse proxy later
    }