const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim();
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const FALLBACK_SUPABASE_URL = "https://pciaegxpldyyvxllzexc.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjaWFlZ3hwbGR5eXZ4bGx6ZXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MjIxNjAsImV4cCI6MjA4Njk5ODE2MH0.bKxxGdFFP-GQsOjmduiZYfej3IttNMGnGJLcqqtb5hM";

export const resolvedSupabaseUrl = SUPABASE_URL || FALLBACK_SUPABASE_URL;
export const resolvedSupabasePublishableKey =
  SUPABASE_PUBLISHABLE_KEY || FALLBACK_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(resolvedSupabaseUrl && resolvedSupabasePublishableKey);

if ((!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) && import.meta.env.DEV) {
  console.warn(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Falling back to the configured Supabase project.",
  );
}
