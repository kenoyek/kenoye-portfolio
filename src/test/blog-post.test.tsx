import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

const { load } = vi.hoisted(() => ({ load: vi.fn() }));
vi.mock("@/lib/blog", () => ({ getPublishedPost: load }));
vi.mock("@/components/Navbar", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));
vi.mock("@/components/BlogComments", () => ({ default: () => null }));
vi.mock("@/components/BlogLikeButton", () => ({ default: () => null }));
vi.mock("@/lib/seo", () => ({ setPageMetadata: vi.fn(), buildBlogPostJsonLd: () => [] }));
import BlogPost from "@/pages/BlogPost";

const article = {
  id: "post-1",
  slug: "architecture-notes",
  title: "Architecture notes",
  content: "<p>A published article.</p>",
  excerpt: "Product architecture",
  cover_image_url: null,
  published_at: "2026-07-01T12:00:00Z",
  updated_at: "2026-07-01T12:00:00Z",
  author_name: "Okagua Kenoye",
};
const renderPost = () =>
  render(
    <MemoryRouter initialEntries={["/blog/architecture-notes"]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>,
  );
afterEach(() => {
  cleanup();
  load.mockReset();
});

describe("public article loading", () => {
  it("shows a recoverable error instead of claiming a failed request is a missing article", async () => {
    load.mockRejectedValue(new Error("Backend unavailable"));
    renderPost();
    expect(
      await screen.findByRole("heading", { name: "This article couldn’t be loaded." }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Post not found")).not.toBeInTheDocument();
  });
  it("only renders not found for a successful query with no article", async () => {
    load.mockResolvedValue(null);
    renderPost();
    expect(await screen.findByRole("heading", { name: "Post not found" })).toBeInTheDocument();
  });
  it("loads the real article when a failed request is retried", async () => {
    load.mockRejectedValueOnce(new Error("Temporary failure")).mockResolvedValueOnce(article);
    renderPost();
    fireEvent.click(await screen.findByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("heading", { name: article.title })).toBeInTheDocument();
    expect(screen.getByText("A published article.")).toBeInTheDocument();
  });
});
