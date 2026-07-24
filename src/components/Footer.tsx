import { Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Work", href: "#portfolio" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "Teaching", href: "#tutoring" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 sm:py-16 px-5 sm:px-6 border-t border-primary-foreground/10">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 mb-10">
          <div>
            <p className="font-semibold text-base mb-2">
              Okagua<span className="text-accent">.</span>
            </p>
            <p className="text-sm text-primary-foreground/50 leading-relaxed">
              Scalable systems. Future engineers. Products that matter.
            </p>
          </div>

          <div>
            <p className="font-semibold text-xs mb-3 text-primary-foreground/70 uppercase tracking-wider">
              Navigate
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/blog" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-xs mb-3 text-primary-foreground/70 uppercase tracking-wider">
              Connect
            </p>
            <div className="flex items-center gap-3">
              <a href="mailto:okagua.kenny@gmail.com" aria-label="Email" className="w-10 h-10 rounded-xl border border-primary-foreground/15 flex items-center justify-center text-primary-foreground/60 hover:text-accent hover:border-accent/40 transition-all">
                <Mail size={16} />
              </a>
              <a href="https://www.linkedin.com/in/okagua/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-xl border border-primary-foreground/15 flex items-center justify-center text-primary-foreground/60 hover:text-accent hover:border-accent/40 transition-all">
                <Linkedin size={16} />
              </a>
              <a href="https://github.com/kenoyek" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-xl border border-primary-foreground/15 flex items-center justify-center text-primary-foreground/60 hover:text-accent hover:border-accent/40 transition-all">
                <Github size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-primary-foreground/10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Okagua Kenoye. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/30">
            Built by Kasel Consults.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
