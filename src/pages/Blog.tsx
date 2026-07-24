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
    const prevTitle = document.title;
    const title = "Blog | Okagua Kenoye";
    const description =
      "Read software architecture, product engineering, education technology, health technology, and full-stack development notes from Okagua Kenoye.";
    const url = `${siteConfig.canonicalOrigin}/blog`;
    const image = `${siteConfig.canonicalOrigin}/og-blog.svg`;

    document.title = title;

    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const prevDesc = desc?.content;
    if (!desc) {
      desc = document.createElement("meta");
      desc.name = "description";
      document.head.appendChild(desc);
    }
    desc.content = description;

    const setMeta = (selector: string, attrs: Record<string, string>) => {
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        document.head.appendChild(meta);
      }
      Object.entries(attrs).forEach(([key, value]) => meta?.setAttribute(key, value));
    };

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = canonical?.href;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setMeta('meta[property="og:url"]', { property: "og:url", content: url });
    setMeta('meta[property="og:image"]', { property: "og:image", content: image });
    setMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
    setMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    return () => {
      document.title = prevTitle;
      if (desc && prevDesc !== undefined) desc.content = prevDesc;
      if (canonical && prevCanonical) canonical.href = prevCanonical;
    };
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
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Blog</h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">Insights, tutorials, and updates from Okagua</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No posts yet. Check back soon!</p>
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
                    <div className="h-44 sm:h-48 md:h-56 overflow-hidden">
                      <img
                        src={getOptimizedImageUrl(post.cover_image_url, 900)}
                        alt={post.title}
                        width={1200}
                        height={630}
                        sizes="(min-width: 768px) 896px, calc(100vw - 40px)"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
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
                    <h2 className="mb-2 font-heading text-xl sm:text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
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
