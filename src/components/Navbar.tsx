import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { siteConfig } from "@/content/site";

const links = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const home = location.pathname === "/";
  const href = (value: string) => (value.startsWith("#") ? `${home ? "" : "/"}${value}` : value);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 24);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    for (const link of links) {
      const element = link.href.startsWith("#") && document.getElementById(link.href.slice(1));
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [home]);

  const navLink = (link: (typeof links)[number], mobile = false) => {
    const isActive = link.href.startsWith("#")
      ? home && active === link.href
      : location.pathname.startsWith(link.href);
    return (
      <Link
        key={link.href}
        to={href(link.href)}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setOpen(false)}
        className={mobile ? "mobile-nav-link" : "desktop-nav-link"}
      >
        {link.label}
        {mobile && <ArrowUpRight size={20} />}
      </Link>
    );
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <Link to="/" aria-label="Okagua Kenoye home" className="wordmark">
          kenoye<span>.</span>
          <span className="wordmark-note">ARCHITECT & ENGINEER</span>
        </Link>
        <nav aria-label="Primary navigation" className="desktop-navigation">
          {links.map((link) => navLink(link))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link to={href("#contact")} className="header-contact">
            Let’s talk <ArrowUpRight size={15} />
          </Link>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="mobile-menu-trigger" aria-label="Open menu">
              <Menu size={22} />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="mobile-nav-overlay" />
              <Dialog.Content
                className="mobile-nav-dialog"
                aria-describedby="mobile-nav-description"
              >
                <div className="mobile-nav-top">
                  <Dialog.Title>
                    Explore<span>.</span>
                  </Dialog.Title>
                  <Dialog.Close aria-label="Close menu">
                    <X size={24} />
                  </Dialog.Close>
                </div>
                <Dialog.Description id="mobile-nav-description" className="eyebrow">
                  Okagua Kenoye / Portfolio
                </Dialog.Description>
                <nav aria-label="Mobile navigation">
                  {links.map((link) => navLink(link, true))}
                  <Link
                    to={href("#contact")}
                    className="mobile-nav-link"
                    onClick={() => setOpen(false)}
                  >
                    Contact
                    <ArrowUpRight size={20} />
                  </Link>
                </nav>
                <div className="mobile-nav-bottom">
                  <a href={siteConfig.social.resume} target="_blank" rel="noopener noreferrer">
                    View résumé <ArrowUpRight size={16} />
                  </a>
                  <p>
                    Thoughtful software.
                    <br />
                    From concept to production.
                  </p>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
