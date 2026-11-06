import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { getOptimizedImageUrl } from "@/lib/images";
import { buildBlogIndexJsonLd, setPageMetadata } from "@/lib/seo";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  author_name: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const title = "Blog | Okagua Kenoye";
    const description =
      "Read software architecture, product engineering, education technology, health technology, and full-stack development notes from Okagua Kenoye.";
    const url = `${siteConfig.canonicalOrigin}/blog`;

    setPageMetadata({
      title,
      description,
      canonicalUrl: url,
      imageUrl: "/og-blog.svg",
      type: "website",
      jsonLd: buildBlogIndexJsonLd(),
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setLoadError(false);
    let cancelled = false;
    getPublishedPosts()
      .then((data) => {
        if (!cancelled) setPosts(data || []);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="px-5 pb-20 pt-36 sm:px-6 md:pt-44">
        <div className="mx-auto mb-8 max-w-4xl text-center sm:mb-10 md:mb-12">
          <p className="eyebrow mb-6">Field notes / Writing</p>
          <h1 className="mb-6 text-4xl font-normal tracking-tight sm:text-6xl">
            Ideas behind <em className="font-serif text-accent">the engineering.</em>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            Notes on building products, making technical decisions, and teaching what I learn.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12" role="status" aria-label="Loading articles">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-accent" />
          </div>
        ) : loadError ? (
          <div className="py-16 text-center" role="status">
            <p className="text-muted-foreground">Articles couldn’t be loaded right now.</p>
            <button
              className="text-action mt-4 text-accent"
              onClick={() => setAttempt((value) => value + 1)}
            >
              Try again
            </button>
            <p className="mt-2 text-sm text-muted-foreground">
              You can still{" "}
              <Link to="/#work" className="underline underline-offset-4">
                explore my work
              </Link>
              .
            </p>
          </div>
        ) : posts.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">No posts yet. Check back soon!</p>
        ) : (
          <div className="mx-auto grid max-w-4xl gap-5 sm:gap-6 md:gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {post.cover_image_url && (
                    <div className="h-44 overflow-hidden sm:h-48 md:h-56">
                      <img
                        src={getOptimizedImageUrl(post.cover_image_url, 900)}
                        alt={post.title}
                        width={1200}
                        height={630}
                        sizes="(min-width: 768px) 896px, calc(100vw - 40px)"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      <time dateTime={post.published_at || undefined}>
                        {post.published_at
                          ? format(new Date(post.published_at), "MMMM d, yyyy")
                          : "Published article"}
                      </time>
                      <span>·</span>
                      <span>{post.author_name}</span>
                    </div>
                    <h2 className="mb-2 font-heading text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {!loading && <Footer />}
    </main>
  );
};

export default Blog;
