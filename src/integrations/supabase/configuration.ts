// Supabase publishable keys are intentionally browser-safe. Never place a
// secret/service-role key here or in a VITE_* environment variable.
const DEFAULT_SUPABASE_URL = "https://koymddmxehwrpvvyhafh.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_drYtCcKGKViI2tmZiAS7iQ_PO07lrGu";

type SupabaseEnvironment = {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  VITE_SUPABASE_ANON_KEY?: string;
};

export const resolveSupabaseConfiguration = (environment: SupabaseEnvironment) => {
  const url = environment.VITE_SUPABASE_URL?.trim();
  const key =
    environment.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || environment.VITE_SUPABASE_ANON_KEY?.trim();
  // An incomplete override must never pair a different project's URL with the
  // default project's key (or vice versa).
  // This portfolio has explicitly migrated away from the inaccessible project.
  // Stale deployment variables must not send readers back to that old backend.
  const isRetiredProject =
    url?.replace(/\/+$/, "").toLowerCase() === "https://pciaegxpldyyvxllzexc.supabase.co";
  if (url && key && !isRetiredProject) return { url, key };
  return { url: DEFAULT_SUPABASE_URL, key: DEFAULT_SUPABASE_PUBLISHABLE_KEY };
};

const configuration = resolveSupabaseConfiguration({
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
});
export const resolvedSupabaseUrl = configuration.url;
export const resolvedSupabasePublishableKey = configuration.key;
export const isSupabaseConfigured = Boolean(configuration.url && configuration.key);
