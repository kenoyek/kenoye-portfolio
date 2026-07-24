import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AdditionalProjects } from "@/components/home/AdditionalProjects";
import { additionalProjects, getProjectBySlug, primaryProjects, projects } from "@/content/projects";
import type { ProjectLink } from "@/content/projects";

const restoredSlugs = [
  "togacode-lms",
  "onevet-online-pet-store",
  "python-playground",
  "codequest-adventures",
  "block-to-code-bridge",
  "queeneth-uti-portfolio",
  "agricultural-data-dashboard",
];

describe("portfolio project content", () => {
  it("keeps the flagship project order unchanged", () => {
    expect(primaryProjects.map((project) => project.slug)).toEqual([
      "asele",
      "teacheasy",
      "reframe",
      "learneasy-academy",
    ]);
  });

  it("restores all valid legacy projects into typed content", () => {
    expect(additionalProjects.map((project) => project.slug)).toEqual(restoredSlugs);

    restoredSlugs.forEach((slug) => {
      const project = getProjectBySlug(slug);

      expect(project).toBeDefined();
      expect(project?.title).toBeTruthy();
      expect(project?.shortSummary.length).toBeGreaterThan(40);
      expect(project?.role).toBeTruthy();
      expect(project?.technologies.length).toBeGreaterThan(0);
    });
  });

  it("does not fabricate case-study or repository links for restored projects", () => {
    additionalProjects.forEach((project) => {
      const links: ProjectLink[] = project.links ?? [];

      expect(links.some((link) => link.kind === "case-study")).toBe(false);
      expect(links.some((link) => link.kind === "repository")).toBe(false);
    });
  });

  it("keeps project slugs unique", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("renders secondary projects without requiring optional images", () => {
    render(
      <MemoryRouter>
        <AdditionalProjects />
      </MemoryRouter>,
    );

    expect(screen.getByText("More engineering work")).toBeInTheDocument();
    expect(screen.getByText("TogaCode LMS")).toBeInTheDocument();
    expect(screen.getByText("1Vet Online Pet Store")).toBeInTheDocument();
    expect(screen.getByText("Agricultural Data Dashboard")).toBeInTheDocument();
    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });
});
