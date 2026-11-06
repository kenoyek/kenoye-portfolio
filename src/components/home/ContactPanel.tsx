import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/content/site";

export const ContactPanel = () => (
  <section id="contact" className="contact-editorial premium-section">
    <div className="contact-top">
      <p className="eyebrow">Next / A conversation</p>
      <span>
        <span className="status-dot" />{" "}
        {siteConfig.openToWork ? "Open to the right collaboration" : "Let’s connect"}
      </span>
    </div>
    <h2>
      Have an ambitious idea?
      <br />
      <em>Let’s build it properly.</em>
    </h2>
    <div className="contact-bottom">
      <div>
        <p>
          From an early product idea to a complex platform, I help turn ambitious concepts into
          reliable, thoughtfully engineered software.
        </p>
        <a className="contact-email" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="contact-links">
        <a href={`mailto:${siteConfig.email}`} className="premium-button">
          Start a conversation <ArrowUpRight size={18} />
        </a>
        <div>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
            <Github size={16} /> GitHub
          </a>
          <a href={siteConfig.social.resume} target="_blank" rel="noopener noreferrer">
            Résumé <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </div>
  </section>
);
