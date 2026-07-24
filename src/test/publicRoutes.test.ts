import { describe, expect, it } from "vitest";
import { canonicalOrigin, publicRoutes } from "../../scripts/public-route-metadata.mjs";

describe("public route metadata", () => {
  it("uses the canonical production origin", () => {
    expect(canonicalOrigin).toBe("https://www.kenoye.site");
  });

  it("includes required public routes and excludes private routes", () => {
    const paths = publicRoutes.map((route) => route.path);

    expect(paths).toEqual([
      "/",
      "/projects/asele",
      "/projects/teacheasy",
      "/projects/reframe",
      "/blog",
    ]);
    expect(paths).not.toContain("/admin/login");
  });

  it("has route-specific social metadata", () => {
    publicRoutes.forEach((route) => {
      const routeWithLastmod = route as typeof route & { lastmod: string };

      expect(route.title.length).toBeGreaterThan(10);
      expect(route.description.length).toBeGreaterThan(80);
      expect(route.image).toMatch(/^\/og-.+\.svg$/);
      expect(route.priority).toMatch(/^\d\.\d$/);
      expect(routeWithLastmod.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it("keeps public metadata aligned with refined case-study wording", () => {
    const asele = publicRoutes.find((route) => route.path === "/projects/asele");
    const reframe = publicRoutes.find((route) => route.path === "/projects/reframe");

    expect(asele?.description).toContain("women's wellness platform");
    expect(asele?.description).not.toContain("women wellness platform");
    expect(reframe?.description).toContain("Capacitor");
    expect(reframe?.description).not.toContain("fully native");
  });
});
