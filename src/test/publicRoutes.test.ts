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
      expect(route.title.length).toBeGreaterThan(10);
      expect(route.description.length).toBeGreaterThan(80);
      expect(route.image).toMatch(/^\/og-.+\.svg$/);
      expect(route.priority).toMatch(/^\d\.\d$/);
    });
  });
});
