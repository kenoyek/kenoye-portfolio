import Navbar from "@/components/Navbar";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | Okagua Kenoye";

    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previousRobots = robots?.content;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex, nofollow";

    return () => {
      if (!robots) return;
      if (previousRobots) {
        robots.content = previousRobots;
      } else {
        robots.remove();
      }
    };
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center bg-background px-6 py-32">
      <Navbar />
      <div className="mx-auto w-full max-w-4xl">
        <p className="eyebrow">404 / A small detour</p>
        <h1 className="mt-6 text-5xl font-normal tracking-tight sm:text-7xl">
          Good ideas.
          <br />A different address.
        </h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          The page you’re looking for isn’t here. Let’s get you back to the work.
        </p>
        <a href="/#work" className="premium-button mt-8">
          Explore the work <ArrowUpRight size={18} />
        </a>
      </div>
    </main>
  );
};

export default NotFound;
