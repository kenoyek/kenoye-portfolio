import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  published_at: string;
  author_name: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
    supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_image_url, published_at, author_name")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="px-5 pb-14 pt-24 sm:px-6 md:pb-16 md:pt-28">
        <div className="mx-auto mb-8 max-w-4xl text-center sm:mb-10 md:mb-12">
          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Blog
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            Insights, tutorials, and updates from Okagua
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-accent" />
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
                      <time>{format(new Date(post.published_at), "MMMM d, yyyy")}</time>
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
    </div>
  );
};

export default Blog;
