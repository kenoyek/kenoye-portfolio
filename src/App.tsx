import { MotionConfig } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./hooks/use-theme";

const queryClient = new QueryClient();

const AdminRoute = lazy(() => import("./components/AdminRoute"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CaseStudyPage = lazy(() => import("./pages/projects/CaseStudyPage"));

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
    Loading...
  </div>
);

const RouteScroll = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
    // Route content is lazy-loaded; observe until the requested anchor exists.
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const scroll = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      return true;
    };
    if (scroll()) return;
    const observer = new MutationObserver(() => {
      if (scroll()) observer.disconnect();
    });
    observer.observe(document.getElementById("root")!, { childList: true, subtree: true });
    const timer = window.setTimeout(() => observer.disconnect(), 5000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [pathname, hash]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteScroll />
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <div id="main-content" tabIndex={-1}>
              <ErrorBoundary>
                <Suspense fallback={<RouteFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                      path="/admin/blog"
                      element={
                        <AdminRoute>
                          <AdminBlog />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/blog/new"
                      element={
                        <AdminRoute>
                          <AdminBlogEditor />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/blog/edit/:id"
                      element={
                        <AdminRoute>
                          <AdminBlogEditor />
                        </AdminRoute>
                      }
                    />
                    <Route path="/projects/:slug" element={<CaseStudyPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
