import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/content/site";

export const HomeHero = () => (
  <section className="editorial-hero" aria-labelledby="hero-title" id="home">
    <div className="hero-topline">
      <span>Independent thinking. End-to-end engineering.</span>
      <span>Nigeria · Working globally</span>
    </div>
    <div className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> Software architect / Product engineer
        </p>
        <h1 id="hero-title">
          Complex ideas.
          <br />
          <em>Exceptional</em>
          <br />
          digital products.
        </h1>
        <p className="hero-description">
          I’m Okagua Kenoye. I bring architecture, design thinking and engineering together to build
          web and mobile products that work in the real world.
        </p>
        <div className="hero-actions">
          <a href="#work" className="premium-button">
            Explore my work <ArrowDown size={17} />
          </a>
          <a href="#contact" className="text-action">
            Let’s build something <ArrowUpRight size={17} />
          </a>
        </div>
        {siteConfig.openToWork && (
          <p className="hero-availability">
            <span className="status-dot" /> {siteConfig.availabilityNote}
          </p>
        )}
      </div>
      <Link
        to="/projects/asele"
        className="hero-product"
        aria-label="Explore Asele, a cross-platform wellness product"
      >
        <div className="hero-product-heading">
          <span>PRODUCT ENGINEERING, IN PRACTICE</span>
          <ArrowUpRight size={20} />
        </div>
        <div className="hero-product-art">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <span className="hero-art-word" aria-hidden="true">
            asele
          </span>
          <div className="hero-phone secondary-phone">
            <img
              src="/images/projects/asele/asele-native-cycle-insights.webp"
              alt=""
              width="591"
              height="1280"
              decoding="async"
            />
          </div>
          <div className="hero-phone primary-phone">
            <img
              src="/images/projects/asele/asele-native-cycle-home.webp"
              alt="Asele cycle and wellness app, built for web, Android and iOS"
              width="591"
              height="1280"
              {...{ fetchpriority: "high" }}
            />
          </div>
          <span className="platform-label">WEB / ANDROID / iOS</span>
        </div>
        <div className="hero-product-footer">
          <div>
            <span className="eyebrow">Featured build / 01</span>
            <strong>
              Asele<span>Wellness, thoughtfully engineered.</span>
            </strong>
          </div>
          <span className="round-arrow">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </Link>
    </div>
    <div className="hero-bottom">
      <span>From the first question to the final release.</span>
      <span>
        Architecture <i /> Web <i /> Mobile <i /> Delivery
      </span>
      <a href="#work" aria-label="Scroll to selected work">
        <ArrowDown size={18} />
      </a>
    </div>
  </section>
);
