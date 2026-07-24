import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogComments from "@/components/BlogComments";
import BlogLikeButton from "@/components/BlogLikeButton";
import { format } from "date-fns";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getOptimizedImageUrl } from "@/lib/images";
import { buildBlogPostJsonLd, setPageMetadata } from "@/lib/seo";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string;
  author_name: string;
  slug: string;
  updated_at: string;
}

const SITE_URL = siteConfig.canonicalOrigin;

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("blog_posts")
      .select("id, title, content, excerpt, cover_image_url, published_at, author_name, slug, updated_at")
      .eq("slug", slug)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .single()
      .then(({ data }) => {
        setPost(data);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (loading || post) return;

    setPageMetadata({
      title: "Post Not Found | Okagua Kenoye",
      description: "The requested blog post could not be found.",
      canonicalUrl: `${SITE_URL}/blog${slug ? `/${slug}` : ""}`,
      imageUrl: "/og-blog.svg",
      robots: "noindex, nofollow",
    });
  }, [loading, post, slug]);

  // Dynamic meta tags & JSON-LD
  useEffect(() => {
    if (!post) return;
    const description = post.excerpt || post.title;
    const url = `${SITE_URL}/blog/${post.slug}`;

    setPageMetadata({
      title: `${post.title} | Okagua Blog`,
      description,
      canonicalUrl: url,
      imageUrl: post.cover_image_url ?? "/og-blog.svg",
      type: "article",
      ogTitle: post.title,
      ogDescription: description,
      jsonLd: buildBlogPostJsonLd({
        title: post.title,
        description,
        url,
        image: post.cover_image_url,
        publishedAt: post.published_at,
        updatedAt: post.updated_at,
        authorName: post.author_name,
      }),
    });
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center py-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="text-center py-32 px-5">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/blog" className="text-accent hover:underline inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Back to blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="px-5 pb-14 pt-24 sm:px-6 md:pb-16 md:pt-28">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-accent hover:underline md:mb-8">
            <ArrowLeft size={14} /> Back to blog
          </Link>

          {post.cover_image_url && (
            <div className="mb-6 overflow-hidden rounded-xl sm:mb-8 sm:rounded-2xl">
              <img
                src={getOptimizedImageUrl(post.cover_image_url, 900)}
                alt={post.title}
                width={1200}
                height={630}
                sizes="(min-width: 1024px) 768px, calc(100vw - 40px)"
                className="h-48 w-full object-cover sm:h-56 md:h-72 lg:h-80"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Calendar size={14} />{format(new Date(post.published_at), "MMMM d, yyyy")}</span>
            <span className="inline-flex items-center gap-1"><User size={14} />{post.author_name}</span>
          </div>

          <h1 className="mb-8 font-heading text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-foreground">{post.title}</h1>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Like button */}
          <div className="mt-8 flex items-center">
            <BlogLikeButton postId={post.id} />
          </div>

          {/* Comments */}
          <BlogComments postId={post.id} />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
