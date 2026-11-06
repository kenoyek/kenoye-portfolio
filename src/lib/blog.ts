import { publicSupabase } from "@/integrations/supabase/public-client";

export class BlogRequestError extends Error {
  constructor(
    message: string,
    readonly code: string,
  ) {
    super(message);
    this.name = "BlogRequestError";
  }
}

type QueryResult<T> = { data: T; error: { message: string; code?: string } | null };

// Bound the entire operation, including any SDK initialization, rather than
// leaving a reader on a spinner when a request never settles.
export const runBlogRequest = async <T>(
  query: (signal: AbortSignal) => PromiseLike<QueryResult<T>>,
  timeoutMs = 15_000,
): Promise<T> => {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      Promise.resolve(query(controller.signal)).then(({ data, error }) => {
        if (error) throw new BlogRequestError(error.message, error.code || "REQUEST_FAILED");
        return data;
      }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          reject(new BlogRequestError("The article request timed out.", "TIMEOUT"));
          controller.abort();
        }, timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
};

export const getPublishedPosts = () =>
  runBlogRequest((signal) =>
    publicSupabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_image_url, published_at, author_name")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .abortSignal(signal),
  );

export const getPublishedPost = (slug: string) =>
  runBlogRequest((signal) =>
    publicSupabase
      .from("blog_posts")
      .select(
        "id, title, content, excerpt, cover_image_url, published_at, author_name, slug, updated_at",
      )
      .eq("slug", slug)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .abortSignal(signal)
      .maybeSingle(),
  );
