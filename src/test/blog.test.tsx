import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

const { load } = vi.hoisted(() => ({ load: vi.fn() }));
vi.mock("@/lib/blog", () => ({ getPublishedPosts: load }));
vi.mock("@/components/Navbar", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));
vi.mock("@/lib/seo", () => ({
  setPageMetadata: vi.fn(),
  buildBlogIndexJsonLd: () => [],
}));
import Blog from "@/pages/Blog";

const article = {
  id: "article-1",
  slug: "architecture-notes",
  title: "Architecture notes",
  excerpt: "How a product becomes a maintainable system.",
  cover_image_url: null,
  published_at: "2026-07-01T12:00:00Z",
  author_name: "Okagua Kenoye",
};
const renderBlog = () =>
  render(
    <MemoryRouter>
      <Blog />
    </MemoryRouter>,
  );
afterEach(() => {
  cleanup();
  load.mockReset();
});

describe("published blog loading", () => {
  it("renders returned articles and links to the full post", async () => {
    load.mockResolvedValue([article]);
    renderBlog();
    expect(await screen.findByRole("heading", { name: article.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Architecture notes/ })).toHaveAttribute(
      "href",
      "/blog/architecture-notes",
    );
    expect(screen.queryByLabelText("Loading articles")).not.toBeInTheDocument();
  });

  it("distinguishes a failed backend request from a successful empty result", async () => {
    load.mockRejectedValue(new Error("Network request failed"));
    renderBlog();
    expect(await screen.findByText("Articles couldn’t be loaded right now.")).toBeInTheDocument();
    expect(screen.queryByText("No posts yet. Check back soon!")).not.toBeInTheDocument();
  });

  it("recovers on retry when the backend becomes available", async () => {
    load.mockRejectedValueOnce(new Error("Service unavailable")).mockResolvedValueOnce([article]);
    renderBlog();
    fireEvent.click(await screen.findByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("heading", { name: article.title })).toBeInTheDocument();
    expect(screen.queryByText("Articles couldn’t be loaded right now.")).not.toBeInTheDocument();
  });
});
