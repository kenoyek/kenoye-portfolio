import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";

const portraitAssets = import.meta.glob<string>("/src/assets/okagua-kenoye.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const portraitSrc = Object.values(portraitAssets)[0];

export const ProfessionalPositioning = () => (
  <section id="about" className="about-editorial premium-section">
    {portraitSrc ? (
      <figure className="about-portrait">
        <img
          src={portraitSrc}
          alt="Okagua Kenoye seated at his software development workstation"
          width={772}
          height={842}
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <p>
            Thoughtful by nature.
            <br />
            Engineer by practice.
          </p>
          <small>NIGERIA / WORKING GLOBALLY</small>
        </figcaption>
      </figure>
    ) : (
      <div className="about-monogram" aria-hidden="true">
        <span>
          O<span>K</span>
        </span>
        <p>
          Thoughtful by nature.
          <br />
          Engineer by practice.
        </p>
        <small>NIGERIA / WORKING GLOBALLY</small>
      </div>
    )}
    <div>
      <p className="eyebrow">03 / Behind the work</p>
      <h2>
        Engineering with purpose.
        <br />
        <em>Building with intention.</em>
      </h2>
      <p>
        I’m Kenoye, a software architect and product engineer. I work where product decisions meet
        technical systems: turning a complex brief into something useful, secure and maintainable.
      </p>
      <p>
        My work spans health, education, SaaS and community platforms. I take ownership across the
        whole journey, from the first data model to the details of an Android or iOS release.
      </p>
      <p>
        Teaching keeps me grounded. Whether I’m explaining a technical trade-off to a founder or
        helping a learner write their first program, I believe good engineering starts with making
        things clear.
      </p>
      <a
        href={siteConfig.social.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="text-action"
      >
        More about my experience <ArrowUpRight size={17} />
      </a>
    </div>
  </section>
);
