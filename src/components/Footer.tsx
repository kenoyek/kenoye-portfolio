import { Linkedin, Github, Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/content/site";

const footerLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-primary-foreground/10 bg-primary px-5 py-12 text-primary-foreground sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-10 grid gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-3">
          <div>
            <p className="mb-2 text-base font-semibold">
              Okagua<span className="text-accent">.</span>
            </p>
            <p className="text-sm leading-relaxed text-primary-foreground/50">
              Senior full-stack and product engineer building production systems across web, mobile,
              health, and education.
            </p>
            {siteConfig.openToWork && (
              <div className="mt-4 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-xs text-accent">{siteConfig.availabilityNote}</span>
              </div>
            )}
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
              Navigate
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/50 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.social.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/50 transition-colors hover:text-accent"
                >
                  <FileText size={13} aria-hidden="true" />
                  Résumé
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
              Connect
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label={`Email ${siteConfig.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-primary-foreground/15 text-primary-foreground/60 transition-all hover:border-accent/40 hover:text-accent"
              >
                <Mail size={16} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in new tab)"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-primary-foreground/15 text-primary-foreground/60 transition-all hover:border-accent/40 hover:text-accent"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in new tab)"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-primary-foreground/15 text-primary-foreground/60 transition-all hover:border-accent/40 hover:text-accent"
              >
                <Github size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-primary-foreground/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Okagua Kenoye. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/30">
            Built with React, TypeScript, and Supabase.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
