import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { resolvedSupabaseUrl, resolvedSupabasePublishableKey } from "./configuration";

// Public content must not inherit expired admin sessions, refresh-token locks,
// or OAuth tokens from the current URL. Admin authentication keeps its own client.
export const publicSupabase = createClient<Database>(
  resolvedSupabaseUrl,
  resolvedSupabasePublishableKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storageKey: "portfolio-public-content",
    },
  },
);
