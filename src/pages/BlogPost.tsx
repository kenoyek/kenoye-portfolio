import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublishedPost } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogComments from "@/components/BlogComments";
import BlogLikeButton from "@/components/BlogLikeButton";
import { format } from "date-fns";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getOptimizedImageUrl } from "@/lib/images";
import { buildBlogPostJsonLd, setPageMetadata } from "@/lib/seo";

type Post = NonNullable<Awaited<ReturnType<typeof getPublishedPost>>>;

const SITE_URL = siteConfig.canonicalOrigin;

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    setPost(null);
    getPublishedPost(slug)
      .then((data) => {
        if (!cancelled) setPost(data);
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
  }, [slug, attempt]);

  useEffect(() => {
    if (loading || post || loadError) return;

    setPageMetadata({
      title: "Post Not Found | Okagua Kenoye",
      description: "The requested blog post could not be found.",
      canonicalUrl: `${SITE_URL}/blog${slug ? `/${slug}` : ""}`,
      imageUrl: "/og-blog.svg",
      robots: "noindex, nofollow",
    });
  }, [loading, post, slug, loadError]);

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
        publishedAt: post.published_at || post.updated_at,
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
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-accent" />
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="px-5 py-36 text-center">
          <h1 className="text-3xl">This article couldn’t be loaded.</h1>
          <p className="mt-4 text-muted-foreground">Please try again in a moment.</p>
          <button className="premium-button mt-6" onClick={() => setAttempt((value) => value + 1)}>
            Try again
          </button>
          <Link to="/blog" className="text-action mx-auto mt-4 flex w-fit">
            Back to writing
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="px-5 py-32 text-center">
          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">Post not found</h1>
          <Link to="/blog" className="inline-flex items-center gap-1 text-accent hover:underline">
            <ArrowLeft size={14} /> Back to blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="px-5 pb-14 pt-24 sm:px-6 md:pb-16 md:pt-28">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="mb-6 inline-flex items-center gap-1 text-sm text-accent hover:underline md:mb-8"
          >
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
                decoding="async"
              />
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} />
              {post.published_at
                ? format(new Date(post.published_at), "MMMM d, yyyy")
                : "Published article"}
            </span>
            <span className="inline-flex items-center gap-1">
              <User size={14} />
              {post.author_name}
            </span>
          </div>

          <h1 className="mb-8 font-heading text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
            {post.title}
          </h1>

          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

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
