import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X, FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/content/site";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const navShellClass = !scrolled
    ? "border-b border-border/70 bg-background/90 backdrop-blur-xl"
    : "border-b border-border bg-background/95 shadow-subtle backdrop-blur-xl";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHome) return;
    const sectionIds = navLinks
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const handleHashClick = (e: React.MouseEvent, href: string) => {
    setMobileOpen(false);
    if (!isHome) {
      e.preventDefault();
      navigate("/" + href);
    }
  };

  const getHref = (href: string) => (isHome ? href : `/${href}`);

  const isActive = (href: string) =>
    href.startsWith("#") ? activeSection === href.replace("#", "") : location.pathname === href;

  const renderLink = (link: (typeof navLinks)[0], mobile = false) => {
    const active = isActive(link.href);
    const cls = mobile
      ? `block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors ${
          active
            ? "text-accent bg-accent/10"
            : "text-foreground hover:text-accent hover:bg-accent/5"
        }`
      : `text-sm font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
          active ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-accent"
        }`;

    if (link.href.startsWith("/")) {
      return (
        <Link
          key={link.href + (mobile ? "-m" : "")}
          to={link.href}
          className={cls}
          aria-current={active ? "page" : undefined}
          onClick={() => setMobileOpen(false)}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <a
        key={link.href + (mobile ? "-m" : "")}
        href={getHref(link.href)}
        onClick={(e) => handleHashClick(e, link.href)}
        className={cls}
        aria-current={active ? "page" : undefined}
      >
        {link.label}
      </a>
    );
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${navShellClass}`}
      >
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link
            to="/"
            className="shrink-0 text-base font-semibold tracking-tight text-foreground"
            aria-label="Okagua Kenoye home"
          >
            Okagua<span className="text-accent">.</span>
          </Link>

          {/* Desktop nav links */}
          <div className="mx-3 hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-border/50 bg-card/60 px-1.5 py-1 backdrop-blur-md">
              {navLinks.map((link) => renderLink(link))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            {/* Résumé link (desktop) */}
            <a
              href={siteConfig.social.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent md:inline-flex"
              aria-label="View résumé (opens in new tab)"
            >
              <FileText size={14} aria-hidden="true" />
              Résumé
            </a>
            <Button
              asChild
              size="sm"
              className="hidden rounded-md bg-accent font-semibold text-accent-foreground hover:bg-accent/90 md:inline-flex"
            >
              <a href={getHref("#contact")} onClick={(e) => handleHashClick(e, "#contact")}>
                Contact
              </a>
            </Button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-72 max-w-[85vw] flex-col border-l border-border bg-background shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <span className="font-semibold text-foreground">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
                {navLinks.map((link) => renderLink(link, true))}
                <a
                  href={siteConfig.social.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent/5 hover:text-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  <FileText size={16} aria-hidden="true" />
                  Résumé
                </a>
              </div>
              <div className="border-t border-border px-4 py-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
                >
                  <a href={getHref("#contact")} onClick={(e) => handleHashClick(e, "#contact")}>
                    Contact
                  </a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
