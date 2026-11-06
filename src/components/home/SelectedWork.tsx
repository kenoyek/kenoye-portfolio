import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { primaryProjects } from "@/content/projects";
import { ProjectFeatureTabs } from "@/components/projects/ProjectFeatureTabs";

export const SelectedWork = () => (
  <section id="work" className="selected-work premium-section">
    <div className="editorial-section-heading">
      <div>
        <p className="eyebrow">01 / Selected work</p>
        <h2>
          Real problems.
          <br />
          <em>Considered solutions.</em>
        </h2>
      </div>
      <p>
        A closer look at the products I’ve helped shape, architect and deliver. From sensitive
        health data to connected learning and community.
      </p>
    </div>
    {primaryProjects.map((project, index) => {
      const live = project.links?.find((link) => link.kind === "live");
      return (
        <article className={`project-showcase showcase-${project.slug}`} key={project.slug}>
          <header className="project-heading">
            <div className="project-identity">
              <span className="project-number">0{index + 1}</span>
              <div>
                <p className="eyebrow">{project.category.join(" / ")}</p>
                <h3>{project.title}</h3>
              </div>
            </div>
            <div className="project-heading-detail">
              <p>{project.shortSummary}</p>
              <span>{project.role}</span>
            </div>
          </header>
          <ProjectFeatureTabs slug={project.slug} />
          <footer className="project-bottom">
            <ul aria-label={`${project.title} technologies`}>
              {project.technologies.slice(0, 5).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div>
              <Link to={`/projects/${project.slug}`} className="text-action">
                Read the case study <ArrowUpRight size={17} />
              </Link>
              {live && (
                <a href={live.href} target="_blank" rel="noopener noreferrer" className="live-link">
                  Visit product <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </footer>
        </article>
      );
    })}
  </section>
);
