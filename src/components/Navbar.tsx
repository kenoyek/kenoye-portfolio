import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#portfolio" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "Teaching", href: "#tutoring" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isOverlayNav = isHome && !scrolled;

  const textClass = isOverlayNav ? "text-primary-foreground" : "text-foreground";
  const mutedTextClass = isOverlayNav ? "text-primary-foreground/70" : "text-muted-foreground";
  const navShellClass = isOverlayNav
    ? "bg-transparent"
    : "border-b border-border bg-background/95 backdrop-blur-xl";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
      { rootMargin: "-40% 0px -55% 0px" }
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

  const renderLink = (link: typeof navLinks[0], mobile = false) => {
    const active = isActive(link.href);
    const cls = mobile
      ? `block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors ${
          active ? "text-accent bg-accent/10" : "text-foreground hover:text-accent hover:bg-accent/5"
        }`
      : `text-sm font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
          active
            ? "text-accent bg-accent/10"
            : `${mutedTextClass} hover:text-accent`
        }`;

    if (link.href.startsWith("/")) {
      return (
        <Link
          key={link.href + (mobile ? "-m" : "")}
          to={link.href}
          className={cls}
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
      >
        {link.label}
      </a>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navShellClass}`}
      >
        <div className="max-w-[1120px] mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link
            to="/"
            className={`font-semibold tracking-tight text-base shrink-0 ${textClass}`}
          >
            Okagua<span className="text-accent">.</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 mx-3 min-w-0 flex-1 justify-center">
            <div className="flex items-center gap-1 rounded-full px-1.5 py-1 backdrop-blur-md bg-card/60 border border-border/50">
              {navLinks.map((link) => renderLink(link))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle
              className={isOverlayNav ? "border-primary-foreground/20 text-primary-foreground/70 hover:text-accent" : ""}
            />
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-full"
            >
              <a href={getHref("#contact")} onClick={(e) => handleHashClick(e, "#contact")}>
                Hire Me
              </a>
            </Button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                isOverlayNav
                  ? "text-primary-foreground hover:bg-primary-foreground/10"
                  : "text-foreground hover:bg-muted"
              }`}
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
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[85vw] bg-background border-l border-border shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                <span className="font-semibold text-foreground">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                {navLinks.map((link) => renderLink(link, true))}
              </div>
              <div className="px-4 py-4 border-t border-border">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl"
                >
                  <a
                    href={getHref("#contact")}
                    onClick={(e) => handleHashClick(e, "#contact")}
                  >
                    Hire Me
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
