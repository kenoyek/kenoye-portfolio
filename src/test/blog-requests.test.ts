import { createClient } from "@supabase/supabase-js";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/configuration", () => ({
  resolvedSupabaseUrl: "https://portfolio-test.supabase.co",
  resolvedSupabasePublishableKey: "public-test-key",
}));
import { getPublishedPost, getPublishedPosts, runBlogRequest } from "@/lib/blog";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  localStorage.clear();
});

describe("anonymous public blog requests", () => {
  it("reads published articles without using or deleting a saved admin session", async () => {
    const savedSession = JSON.stringify({
      access_token: "expired-admin-token",
      refresh_token: "old-refresh-token",
      expires_at: 1,
    });
    localStorage.setItem("sb-portfolio-test-auth-token", savedSession);
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ id: "post-1", title: "Real article" }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    expect(await getPublishedPosts()).toEqual([{ id: "post-1", title: "Real article" }]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [input, init] = fetchMock.mock.calls[0];
    const url = new URL(String(input));
    expect(url.pathname).toBe("/rest/v1/blog_posts");
    expect(url.searchParams.get("status")).toBe("eq.published");
    expect(url.searchParams.get("published_at")).toMatch(/^lte\./);
    expect(new Headers(init.headers).get("Authorization")).toBe("Bearer public-test-key");
    expect(localStorage.getItem("sb-portfolio-test-auth-token")).toBe(savedSession);
    expect(localStorage.getItem("portfolio-public-content")).toBeNull();
  });

  it("recovers the public read when the shared admin client's saved token is rejected", async () => {
    localStorage.setItem(
      "sb-portfolio-test-auth-token",
      JSON.stringify({
        access_token: "revoked-admin-token",
        refresh_token: "test-refresh-token",
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        user: { id: "test-admin" },
      }),
    );
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((_url, init) => {
        const isAdminToken =
          new Headers(init.headers).get("Authorization") === "Bearer revoked-admin-token";
        return Promise.resolve(
          new Response(
            JSON.stringify(
              isAdminToken ? { code: "PGRST301", message: "JWT is invalid" } : [{ id: "post-1" }],
            ),
            {
              status: isAdminToken ? 401 : 200,
              headers: { "Content-Type": "application/json" },
            },
          ),
        );
      }),
    );
    const admin = createClient("https://portfolio-test.supabase.co", "public-test-key", {
      auth: { autoRefreshToken: false, detectSessionInUrl: false },
    });
    const original = await admin.from("blog_posts").select("id");
    expect(original.error?.code).toBe("PGRST301");
    expect(await getPublishedPosts()).toEqual([{ id: "post-1" }]);
  });

  it("only treats an empty successful post query as not found", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } }),
        ),
    );
    expect(await getPublishedPost("missing-post")).toBeNull();
  });

  it("preserves backend failure codes instead of treating failures as empty content", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: "Invalid API key", code: "PGRST301" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    await expect(getPublishedPost("article")).rejects.toMatchObject({
      name: "BlogRequestError",
      code: "PGRST301",
    });
  });

  it("bounds stalled requests and aborts the underlying fetch", async () => {
    vi.useFakeTimers();
    let signal: AbortSignal | undefined;
    const result = runBlogRequest((current) => {
      signal = current;
      return new Promise<never>(() => {});
    });
    const assertion = expect(result).rejects.toMatchObject({ code: "TIMEOUT" });
    await vi.advanceTimersByTimeAsync(15_000);
    await assertion;
    expect(signal?.aborted).toBe(true);
  });

  it("propagates a rejected request so the page can recover through retry", async () => {
    await expect(
      runBlogRequest(() => Promise.reject(new TypeError("Failed to fetch"))),
    ).rejects.toThrow("Failed to fetch");
  });
});
