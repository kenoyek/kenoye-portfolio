import { describe, expect, it } from "vitest";
import { resolveSupabaseConfiguration } from "@/integrations/supabase/configuration";

describe("Supabase project selection", () => {
  it("defaults to the newly selected project", () => {
    const result = resolveSupabaseConfiguration({});
    expect(result.url).toBe("https://koymddmxehwrpvvyhafh.supabase.co");
    expect(result.key.startsWith("sb_publishable_")).toBe(true);
  });
  it("never mixes a partial override with a different project's default", () => {
    const defaults = resolveSupabaseConfiguration({});
    expect(
      resolveSupabaseConfiguration({ VITE_SUPABASE_URL: "https://old-project.supabase.co" }),
    ).toEqual(defaults);
    expect(
      resolveSupabaseConfiguration({ VITE_SUPABASE_PUBLISHABLE_KEY: "another-project-public-key" }),
    ).toEqual(defaults);
  });
  it("does not reconnect to the retired project through stale deployment variables", () => {
    expect(
      resolveSupabaseConfiguration({
        VITE_SUPABASE_URL: "https://pciaegxpldyyvxllzexc.supabase.co/",
        VITE_SUPABASE_PUBLISHABLE_KEY: "old-project-public-key",
      }),
    ).toEqual(resolveSupabaseConfiguration({}));
  });
  it("honors complete overrides and trims surrounding whitespace", () => {
    expect(
      resolveSupabaseConfiguration({
        VITE_SUPABASE_URL: " https://custom-project.supabase.co ",
        VITE_SUPABASE_PUBLISHABLE_KEY: " public-test-key ",
      }),
    ).toEqual({ url: "https://custom-project.supabase.co", key: "public-test-key" });
  });
  it("supports the legacy anon variable and prefers a publishable key when both are provided", () => {
    const environment = {
      VITE_SUPABASE_URL: "https://custom-project.supabase.co",
      VITE_SUPABASE_ANON_KEY: "legacy-public-test-key",
    };
    expect(resolveSupabaseConfiguration(environment).key).toBe("legacy-public-test-key");
    expect(
      resolveSupabaseConfiguration({
        ...environment,
        VITE_SUPABASE_PUBLISHABLE_KEY: "new-public-test-key",
      }).key,
    ).toBe("new-public-test-key");
  });
});
