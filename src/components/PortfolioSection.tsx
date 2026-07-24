import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Category = "All" | "Frontend" | "Fullstack" | "EdTech" | "AI" | "Mobile";

interface Project {
  title: string;
  category: Exclude<Category, "All">[];
  stack: string[];
  problem: string;
  solution: string;
  role: string;
  impact: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Reframe Mobile App",
    category: ["Mobile", "Fullstack"],
    stack: ["React", "TypeScript", "Next.js", "Capacitor"],
    problem: "A CMS-driven web platform needed production-ready iOS and Android apps without duplicating the codebase or re-publishing for every editorial update.",
    solution: "Designed a Capacitor architecture that wraps the existing Next.js platform, shares backend APIs, and adds native features — push, deep links, safe-area, lifecycle, splash — for a truly native feel.",
    role: "Lead Mobile Engineer / Full Stack Engineer.",
    impact: "One codebase across Web, iOS, and Android. CMS publishes appear instantly on mobile with no app resubmission.",
    caseStudyUrl: "/projects/reframe",
    featured: true,
  },
  {
    title: "Asele",
    category: ["Fullstack"],
    stack: ["Flutter", "Firebase", "Dart"],
    problem: "Women lacked a private, intuitive way to track health metrics and cycles.",
    solution: "Cross-platform mobile app with on-device privacy controls and personalized insights.",
    role: "Lead engineer — architecture, mobile, backend.",
    impact: "Empowered 500+ users with data-driven health insights.",
    liveUrl: "https://www.asele.health",
  },
  {
    title: "TeachEasy LMS",
    category: ["Fullstack", "EdTech"],
    stack: ["React", "TypeScript", "Supabase"],
    problem: "Schools and independent educators needed an all-in-one platform to run classes, assignments, and student progress without stitching tools together.",
    solution: "Full-featured LMS with course management, assignments, grading, and role-based dashboards for teachers, students, and admins.",
    role: "Lead engineer — architecture and delivery.",
    impact: "Streamlined end-to-end class operations for educators in a single platform.",
    liveUrl: "https://teacheasylms.com/",
  },
  {
    title: "TogaCode LMS",
    category: ["Fullstack", "EdTech"],
    stack: ["React", "TypeScript", "Supabase"],
    problem: "Coding tutors had no unified system to manage classes, courses, and live code.",
    solution: "Multi-tenant LMS with invite-code enrollment, embedded code runner, and RLS-backed isolation.",
    role: "Founder & lead engineer — full system design and delivery.",
    impact: "Cut tutor course-creation time by ~70%; live student progress tracking.",
    liveUrl: "https://code-buddy-lms.vercel.app/",
  },
  {
    title: "1Vet Online Pet Store",
    category: ["Fullstack"],
    stack: ["React", "Supabase", "Tailwind"],
    problem: "Pet owners and vet shops lacked a focused e-commerce platform for pet supplies.",
    solution: "Full e-commerce experience with cart, checkout, and inventory tooling.",
    role: "Lead developer — frontend, backend, deployment.",
    impact: "Live store serving pet owners across multiple regions.",
    liveUrl: "https://1vet.store",
  },
  {
    title: "Python Playground",
    category: ["Frontend", "EdTech"],
    stack: ["React", "TypeScript", "Tailwind"],
    problem: "Young learners needed a friendly browser-based Python editor with live output.",
    solution: "Interactive editor with real-time execution and variable inspection.",
    role: "Sole engineer — design, build, ship.",
    impact: "Lowered entry bar for beginner coders aged 8–14.",
    liveUrl: "https://python-playground-pals.vercel.app/",
  },
  {
    title: "CodeQuest Adventures",
    category: ["Frontend", "EdTech"],
    stack: ["React", "TypeScript", "Tailwind"],
    problem: "Students lacked motivation to practice coding without game-like feedback loops.",
    solution: "Gamified learning with XP, levels, badges, and structured challenges.",
    role: "Sole engineer — product and engineering.",
    impact: "Boosted engagement and consistency in practice sessions.",
    liveUrl: "https://codequest-adventures.vercel.app/",
  },
  {
    title: "Block-to-Code Bridge",
    category: ["Frontend", "EdTech"],
    stack: ["React", "TypeScript", "Tailwind"],
    problem: "Going from Scratch to Python was a steep jump for many beginners.",
    solution: "Drag blocks, see equivalent Python code generated in real time.",
    role: "Sole engineer — concept to launch.",
    impact: "Bridged the visual-to-text programming gap for new learners.",
    liveUrl: "https://block-to-code-bridge.vercel.app/",
  },
  {
    title: "Queeneth Uti Portfolio",
    category: ["Frontend"],
    stack: ["React", "TypeScript", "Tailwind"],
    problem: "A community manager needed a polished portfolio showcasing 50+ events.",
    solution: "Custom design system with measurable impact metrics throughout.",
    role: "Designer & developer — end-to-end delivery.",
    impact: "Highlighted measurable community growth and professional milestones.",
    liveUrl: "https://queeneth-portfolio.vercel.app/",
  },
  {
    title: "Agricultural Data Dashboard",
    category: ["Fullstack", "AI"],
    stack: ["Python", "Flask", "Chart.js"],
    problem: "Farmers needed real-time insights into crop yield and market pricing.",
    solution: "Web dashboard with data ingestion, visualizations, and trend analysis.",
    role: "Engineer — backend, data, frontend.",
    impact: "Reduced decision-making time by 40% for local cooperatives.",
  },
];

const categories: Category[] = ["All", "Frontend", "Fullstack", "Mobile", "EdTech", "AI"];

const PortfolioSection = () => {
  const [filter, setFilter] = useState<Category>("All");
  const [active, setActive] = useState<Project | null>(null);

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
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.problem}</p>

                <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                  {p.stack.map((t, idx) => (
                    <span key={t} className="contents">
                      {idx > 0 && <span className="text-foreground/20 text-[11px]">·</span>}
                      <span className="text-[11px] font-mono text-foreground/60">{t}</span>
                    </span>
                  ))}
                </div>

                <p className="text-xs text-accent font-medium">{p.impact}</p>
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
                  {active.stack.join(" · ")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 sm:space-y-5 mt-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Problem</p>
                  <p className="text-sm text-muted-foreground">{active.problem}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Solution</p>
                  <p className="text-sm text-muted-foreground">{active.solution}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">My Role</p>
                  <p className="text-sm text-muted-foreground">{active.role}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Impact</p>
                  <p className="text-sm text-foreground/90 font-medium">{active.impact}</p>
                </div>

                {active.caseStudyUrl ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      asChild
                      className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto h-11"
                    >
                      <Link to={active.caseStudyUrl}>
                        <BookOpen size={14} className="mr-2" /> Read Case Study
                      </Link>
                    </Button>
                    {active.liveUrl && (
                      <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
                        <a href={active.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} className="mr-2" /> View Live
                        </a>
                      </Button>
                    )}
                  </div>
                ) : active.liveUrl ? (
                  <Button
                    asChild
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto h-11"
                  >
                    <a href={active.liveUrl} target="_blank" rel="noopener noreferrer">
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
