import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, type PortfolioProject } from "@/content/projects";
import { ProjectTechnologyList } from "@/components/projects/ProjectTechnologyList";
import { ProjectStatus } from "@/components/projects/ProjectStatus";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Category = "All" | "HealthTech" | "EdTech" | "Mobile" | "SaaS" | "Product";

const categories: Category[] = ["All", "HealthTech", "EdTech", "Mobile", "SaaS", "Product"];

const getCaseStudyLink = (project: PortfolioProject) =>
  project.links?.find((link) => link.kind === "case-study");

const getLiveLink = (project: PortfolioProject) =>
  project.links?.find((link) => link.kind === "live" || link.kind === "external");

const PortfolioSection = () => {
  const [filter, setFilter] = useState<Category>("All");
  const [active, setActive] = useState<PortfolioProject | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category.includes(filter));

  return (
    <section id="portfolio" className="section-padding bg-background">
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Work</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Selected projects
          </h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-4" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Each one solved a real problem for real users. Click any card for the full case.
          </p>
        </motion.div>

        {/* Filters — horizontal scroll on mobile */}
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-xs uppercase tracking-wider font-medium px-4 py-2.5 rounded-full border transition-all whitespace-nowrap min-h-[44px] ${
                filter === c
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-transparent text-muted-foreground border-border hover:border-accent/50 hover:text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {filtered.map((p, i) => (
              <motion.button
                key={p.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                onClick={() => setActive(p)}
                className="group text-left border border-border rounded-xl bg-card p-5 sm:p-6 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.category.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/60 border border-border"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.shortSummary}</p>

                <ProjectTechnologyList technologies={p.technologies.slice(0, 5)} className="mb-3 sm:mb-4" />

                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-accent font-medium">{p.outcomes?.[0]?.label || p.role}</p>
                  <ProjectStatus status={p.projectStatus} />
                </div>
              </motion.button>
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto mx-4">
          {active && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {active.category.map((c) => (
                    <span key={c} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                      {c}
                    </span>
                  ))}
                </div>
                <DialogTitle className="text-xl sm:text-2xl">{active.title}</DialogTitle>
                <DialogDescription className="font-mono text-xs">
                  {active.technologies.join(" · ")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 sm:space-y-5 mt-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Problem</p>
                  <p className="text-sm text-muted-foreground">{active.problem || active.shortSummary}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Solution</p>
                  <p className="text-sm text-muted-foreground">{active.challenges?.[0]?.solution || active.architecture || active.summary}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">My Role</p>
                  <p className="text-sm text-muted-foreground">{active.role}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Outcome</p>
                  <p className="text-sm text-foreground/90 font-medium">{active.outcomes?.[0]?.label || active.projectStatus}</p>
                </div>

                {getCaseStudyLink(active) ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      asChild
                      className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto h-11"
                    >
                      <Link to={getCaseStudyLink(active)?.href || "#"}>
                        <BookOpen size={14} className="mr-2" /> Read Case Study
                      </Link>
                    </Button>
                    {getLiveLink(active) && (
                      <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
                        <a href={getLiveLink(active)?.href} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} className="mr-2" /> View Live
                        </a>
                      </Button>
                    )}
                  </div>
                ) : getLiveLink(active) ? (
                  <Button
                    asChild
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto h-11"
                  >
                    <a href={getLiveLink(active)?.href} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} className="mr-2" /> View Live
                    </a>
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Private project — case study available on request.</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;
